let gameSeq = [];
let userSeq = [];

const btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

const h2 = document.querySelector("h2");
const allBtns = document.querySelectorAll(".btn");

// Start the game on any key press or first button click
function startGame() {
    if (started) return;
    started = true;
    levelUp();
}

document.addEventListener("keydown", startGame);
// capture phase so the game starts before the button click handler runs
document.addEventListener("click", (evt) => {
    // ignore click that is not on a game button
    if (!evt.target.classList.contains("btn")) return;
    // if this click is only to start, stop it from counting as a user move
    if (!started) {
        startGame();
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
    }
}, true);

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
    userSeq = [];
    level += 1;
    h2.innerText = `Level ${level}`;

    const randIdx = Math.floor(Math.random() * btns.length);
    const randColor = btns[randIdx];
    const randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 800);
        }
        return;
    }

    h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to restart`;
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 150);
    reset();
}

function btnPress() {
    if (!started) return;

    const btn = this;
    userFlash(btn);

    const userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

allBtns.forEach((btn) => btn.addEventListener("click", btnPress));

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.innerText = "Press any key to start the game";
}