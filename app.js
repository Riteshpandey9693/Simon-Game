let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = 0;

let btns = ["red", "green", "yellow", "blue"];

let endSound = document.querySelector(".endSound");
let gameOverSound = function () {
  endSound.play();
}
let btnsSound = document.querySelector(".btnSound");
let btnSound = function () {
  btnsSound.play();
}
let sbtnSound = document.querySelector(".sbtnSound");
let startbtnSound = function () {
  sbtnSound.play();
}

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let allBtns = document.querySelectorAll(".btn");
let startBtn = document.querySelector(".start-btn");
let endBtn = document.querySelector(".end-btn");

let h4 = document.querySelector("h4");
let body = document.querySelector("body");

// Set default text for h4
h4.innerText = `HighScore = ${highScore}`;

startBtn.addEventListener("click", () => {
  if (started == false) {
    started = true;
    startBtn.classList.add("d-none");
    endBtn.classList.remove("d-none");
    levelUp();
    startbtnSound();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);

  if (level == 1) {
    setTimeout(() => {
      gameFlash(randBtn);
    }, 500);
  } else {
    gameFlash(randBtn);
  }
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 200);
}

for (let btn of allBtns) {
  btn.addEventListener("click", userRes);
}

function userRes() {
  if (started == true) {
    let btn = this;

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    userFlash(btn);

    checkAns(userSeq.length - 1);
  }
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 200);
  btnSound();
}

function checkAns(Idx) {
  if (userSeq[Idx] == gameSeq[Idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h3.innerHTML = `Game Over! Your Score was :- ${level - 1} </br> Press The Button To Start Again`;

    startBtn.classList.remove("d-none");

    if (highScore < level - 1) {
      highScore = level - 1;
      h4.innerText = `HighScore = ${highScore}`;
    }

    bodyFlash();
    gameOverSound();
    reset();
  }
}

function reset() {
  started = false;
  level = 0;
  userSeq = [];
  gameSeq = [];
  endBtn.classList.add("d-none");
}

function bodyFlash() {
  let prev = body.getAttribute("style");
  body.setAttribute("style", "background: #f2003c");
  setTimeout(() => {
    body.setAttribute("style", `background: ${prev}`);
  }, 200);
}

endBtn.addEventListener("click", () => {
  reset();
  h3.innerHTML = `Press The Button To Start Again`;

  startBtn.classList.remove("d-none");

  if (highScore < level - 1) {
    highScore = level - 1;
    h4.innerText = `HighScore = ${highScore}`;
  }
});
