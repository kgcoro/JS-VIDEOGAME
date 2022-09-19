const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    (window.innerHeight > window.innerWidth) ? 
    canvasSize = window.innerWidth * 0.8 : 
    canvasSize = window.innerHeight * 0.8

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = (canvasSize / 10.6);

    startGame();
}

function startGame() {      

    
    game.font = (elementsSize - 5) + 'px Verdana';
    game.textAlign = 'center';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));

    mapRowsCols.forEach( (row, rowI) => {
        row.forEach( (col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);
            game.fillText(emoji, posX, posY);
        });
    });

   
}

window.addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}

function moveUp() {
    console.log('Mover arriba');
}

function moveLeft() {
    console.log('Mover izquierda');
}

function moveRight() {
    console.log('Mover derecha');
}

function moveDown() {
    console.log('Mover abajo');
}