const words = [
    { word: 'november', hint: 'The month of Scoprio' },
    { word: 'google', hint: 'A famous search engine' },
    { word: 'sophomore', hint: '2nd Year of College is' },
    { word: 'python', hint: 'A programming language named after a snake' },
    { word: 'candle', hint: 'To see in the dark' },
    { word: 'opticals', hint: 'Cute people wear' },
    { word: 'developer', hint: 'Who can make a software' },
    { word: 'dory', hint: 'Mother of Nemo' },
    { word: 'black', hint: 'The best colour' },
    { word: 'amir', hint: 'Who got kohli twice in 2 balls' }
];

let currentWordIndex = Math.floor(Math.random() * words.length);
let currentWord = words[currentWordIndex].word.toLowerCase(); // Ensure current word is lowercase
let hint = words[currentWordIndex].hint;
let guessedWord = Array(currentWord.length).fill('_');
let lives = 5;
let usedLetters = new Set();
let timeoutId;

const wordDisplay = document.getElementById('word-display');
const message = document.getElementById('message');
const hintDisplay = document.getElementById('hint');
const livesDisplay = document.getElementById('lives');
const keyboard = document.getElementById('keyboard');
const resetButton = document.getElementById('reset-button');
const startButton = document.getElementById('start-button');
const startContainer = document.getElementById('start-container');
const gameContainer = document.getElementById('game-container');

function updateWordDisplay() {
    wordDisplay.textContent = guessedWord.join(' ');
}

function updateLivesDisplay() {
    livesDisplay.textContent = `Lives: ${lives}`;
}

function resetGame() {
    clearTimeout(timeoutId); // Clear the timeout if it exists
    currentWordIndex = Math.floor(Math.random() * words.length);
    currentWord = words[currentWordIndex].word.toLowerCase(); // Ensure current word is lowercase
    hint = words[currentWordIndex].hint;
    guessedWord = Array(currentWord.length).fill('_');
    lives = 5;
    usedLetters.clear();
    message.textContent = '';
    hintDisplay.textContent = `Hint: ${hint}`;
    updateWordDisplay();
    updateLivesDisplay();
    setupKeyboard();
    startContainer.style.display = 'none';
    gameContainer.style.display = 'block';
}

function setupKeyboard() {
    keyboard.innerHTML = '';
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(97 + i); // 'a' is 97 in ASCII
        const button = document.createElement('button');
        button.textContent = letter;
        button.className = 'key';
        button.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(button);
    }
}

function handleGuess(guess) {
    guess = guess.toLowerCase(); // Normalize the guessed letter to lowercase

    if (usedLetters.has(guess)) {
        message.textContent = 'You have already guessed that letter.';
        return;
    }

    usedLetters.add(guess);
    let correctGuess = false;

    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === guess) {
            guessedWord[i] = guess;
            correctGuess = true;
        }
    }

    if (correctGuess) {
        message.textContent = 'Good guess!';
    } else {
        lives--;
        message.textContent = 'Wrong guess, try again.';
        updateLivesDisplay();
    }

    updateWordDisplay();

    if (!guessedWord.includes('_')) {
        endGame(true);
    } else if (lives <= 0) {
        endGame(false);
    }

    const button = Array.from(keyboard.children).find(btn => btn.textContent === guess);
    if (button) button.disabled = true;
}

function endGame(won) {
    disableKeyboard();
    if (won) {
        message.textContent = 'Congratulations! You won the game!';
    } else {
        message.textContent = `Game over! Better luck next time. The word was "${currentWord}".`;
    }
    
    // Delay the transition to show the message before resetting
    timeoutId = setTimeout(() => {
        startContainer.style.display = 'block';
        gameContainer.style.display = 'none';
    }, 5000); 
}

function disableKeyboard() {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => key.disabled = true);
}

resetButton.addEventListener('click', resetGame);
startButton.addEventListener('click', resetGame);

document.addEventListener('DOMContentLoaded', () => {
    startContainer.style.display = 'block';
    gameContainer.style.display = 'none';
    setupKeyboard();
    hintDisplay.textContent = `Hint: ${hint}`;
    updateWordDisplay();
    updateLivesDisplay();
});
