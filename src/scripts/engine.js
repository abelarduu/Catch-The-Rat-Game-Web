const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        timerId: null,
        countDownTimerId: null,
        hitPosition: null,
        gameVelocity: 1000,
        result: 0,
        curretTime: 60
    },
};

function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    // Verifica se o tempo acabou
    if (state.values.curretTime === 0) {
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId); 
        alert("Game Over! Seu score é: " + state.values.result);
    }
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");

    });

    let randomNumber = Math.floor(Math.random() * 5);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);

}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.01;
    audio.play();
}
function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition= null;
                playSound();
            }
        })
    });
}

function main(){
    state.values.countDownTimerId = setInterval(countDown, 1000);
    addListenerHitBox();
    moveEnemy();
}

main();