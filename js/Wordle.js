
const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container');

let wordle


const getWordle = () => {
    fetch('http://localhost:3000/word')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            wordle = json.toUpperCase()
        })
        .catch(err => console.log(err))
};

getWordle();


const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex);

        guessRow.forEach((guess, guessIndex) => {
            const tileElement = document.createElement('div');
            tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
            tileElement.classList.add('tile');
            rowElement.append(tileElement);
        });

    tileDisplay.append(rowElement);
});

keys.forEach(key => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', () => handleClick(key));
    keyboard.append(buttonElement);
});

const handleClick = (letter) => {
    if (!isGameOver) {
        console.log('clicked', letter);
            if (letter === '«') {
                deleteLetter();
                console.log(guessRows);
                return
            }
            if (letter === 'ENTER') {
                checkRow();
                console.log(guessRows);
                return
            }
        addLetter(letter);
        console.log(guessRows);
    }
}

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter;
        tile.setAttribute('data', letter);
        currentTile++;
    }
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = '';
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '');
    };
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('');

    if (currentTile > 4) {
        console.log('My guess is ' + guess, 'Wordle is ' + wordle);
        fetch(`http://localhost:3000/check/?word=${guess}`)
            .then(response => response.json())
            .then(json => {
                if (json !== 'Success') {
                    showMessage('Word does not exist')
                    return
                } else {
                    flipTile();
                    if (wordle === guess) {
                        showMessage('Well Done!');
                        isGameOver = true;
                        return;
                    } else {
                        if (currentRow >= 5) {
                            showMessage('Game Over');
                            isGameOver = true;
                            return;
                        }
                        if (currentRow < 5) {
                            currentRow++;
                            currentTile = 0;
                            return;
                        }
                    }
                }           
            })
            .catch(err => console.log(err));
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => messageDisplay.removeChild(messageElement), 3000)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter);
    key.classList.add(color);
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes;
    let checkWordle = wordle;
    const guess = [];

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'});
    });

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay';
            checkWordle = checkWordle.replace(guess.letter, '');
        }
    });

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay';
            checkWordle = checkWordle.replace(guess.letter, '');
        };
    });

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip');
            tile.classList.add(guess[index].color);
            addColorToKey(guess[index].letter, guess[index].color);
        }, 500 * index);
    })

};