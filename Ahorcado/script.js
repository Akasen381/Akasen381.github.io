const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const bodyParts = [
    [4, 2, 1, 1], // cabeza
    [4, 3, 1, 2], // torso
    [3, 5, 1, 1], // pierna izquierda
    [5, 5, 1, 1], // pierna derecha
    [3, 3, 1, 1], // brazo izquierdo
    [5, 3, 1, 1], // brazo derecho
];

let selectedWord;
let usedLetters = [];
let mistakes = 0;
let hits = 0;

const addLetter = letter => {
    const span = document.createElement('span');
    span.textContent = letter.toUpperCase();
    usedLettersElement.appendChild(span);
};

const addBodyPart = part => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...part);
};

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if (mistakes === bodyParts.length) endGame(false);
};

const correctLetter = letter => {
    const letters = wordContainer.children;
    for (let i = 0; i < letters.length; i++) {
        if (letters[i].textContent === letter) {
            letters[i].classList.remove('hidden');
            hits++;
        }
    }
    if (hits === selectedWord.length) endGame(true);
};

const letterInput = letter => {
    if (usedLetters.includes(letter)) return;
    usedLetters.push(letter);
    addLetter(letter);

    selectedWord.includes(letter) ? correctLetter(letter) : wrongLetter();
};

const letterEvent = e => {
    const letter = e.key.toUpperCase();
    if (/^[A-ZÑ]$/.test(letter)) {
        letterInput(letter);
    }
};

const drawWord = () => {
    wordContainer.innerHTML = '';
    selectedWord.forEach(letter => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.classList.add('letter', 'hidden');
        wordContainer.appendChild(span);
    });
};

const selectRandomWord = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    selectedWord = word.toUpperCase().split('');
};

const drawHangMan = () => {
    ctx.canvas.width = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#d95d39';
    ctx.fillRect(0, 7, 4, 1); // base
    ctx.fillRect(1, 0, 1, 8); // poste vertical
    ctx.fillRect(2, 0, 3, 1); // soporte horizontal
    ctx.fillRect(4, 1, 1, 1); // cuerda
};

const endGame = won => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';
    if (!won) alert(`¡Perdiste! La palabra era: ${selectedWord.join('')}`);
    else alert('¡Ganaste!');
};

const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    usedLettersElement.innerHTML = '';
    wordContainer.innerHTML = '';
    startButton.style.display = 'none';
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
};

startButton.addEventListener('click', startGame);
