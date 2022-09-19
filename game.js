const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

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

   /*  for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
            game.fillText(emojis[mapRowsCols[row-1][col-1]], (elementsSize * col), (elementsSize * row));
            
        }
    } */
}
