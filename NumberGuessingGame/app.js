// game values
// A way to instansiate more let's without writing let for every variable.
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// assign UI min max
minNum.textContent = min;
maxNum.textContent = max;

// listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value)
    // validate
    if (isNaN(guess) | guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    // check if won
    if (guess === winningNum) {
        gameOver(true,`${winningNum} is correct! YOU WIN`);
    }
    else {
        // subtract guesses left
        guessesLeft--;
        if (guessesLeft == 0) {
            gameOver(false,`Game over, you lost. the correct number was ${winningNum}`);
        }
        else {
            // game continues ansver wrong
            guessInput.style.borderColor = 'red';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
            guessInput.value = '';
        }
    }
})

// play again event listner from parent
game.addEventListener('mousedown',function(e){
    if(e.target.className==='play-again'){
        window.location.reload();
    }
})

function gameOver(won, msg) {
    let color = won === true ? 'green' : 'red';
    // guessNumber
    guessInput.disabled = true;
    // make border green
    guessInput.style.borderColor = color;
    // let user know they won
    setMessage(msg,color)
    // play again
    guessBtn.value='Play again';
    guessBtn.className+='play-again';
}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}