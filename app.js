let btns = ["red", "yellow", "purple", "green"];
let gameSeq = [];
let userSeq = [];

let started = false;
let highScore = 0;
let level = 0;

let h2 = document.querySelector("h2");

// Start the game when anyone key is pressed
document.addEventListener("keypress", function () {
  if (!started) {
    // console.log("Game is started");
    started = true;
    levelUp();
  }
});

//Flash random button
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
//Flash the button that user clicked
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

// Generates the next level of the game
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randbtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  btnFlash(randbtn);
}

// Checks the sequence of user's input
function checkSeq(idx) {
  if (gameSeq[idx] === userSeq[idx]) {
    if (gameSeq.length === userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    let score = level - 1;
    let body = document.querySelector("body");
    highScore = Math.max(score, highScore);
    h2.innerHTML = `Game over! Your current score is <b>${score}</b>.
                    <br>Your High score is <b>${highScore}</b>.
                    <br> Press any key to restart.`;
    body.style.backgroundColor = "red";
    setTimeout(() => {
      body.style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkSeq(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
  btn.addEventListener("click", btnPress);
}

// Reset the game to its initial state
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
