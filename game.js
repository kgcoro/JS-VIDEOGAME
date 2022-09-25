const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

const playerPosition = {
    x: undefined,
    y: undefined,
};
const giftPosition = {
    x: undefined,
    y: undefined,
};
let enemiesPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    (window.innerHeight > window.innerWidth) ?
        canvasSize = window.innerWidth * 0.8 :
        canvasSize = window.innerHeight * 0.8

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = (canvasSize / 10);

    startGame();
}

function startGame() {

    game.font = (elementsSize - 6) + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));

    showLives();

    enemiesPositions = [];
    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowsCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                enemiesPositions.push({
                    x: posX,
                    y: posY,
                });
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();
}

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;
    
    console.log(giftCollisionY, giftPosition.y);
    
    if (giftCollision) {
        levelWin();
    }

    const enemyCollision = enemiesPositions.find(enemy => {
        const enemyCollisionX = (enemy.x).toFixed(2) == (playerPosition.x).toFixed(2);
        const enemyCollisionY = (enemy.y).toFixed(2) == (playerPosition.y).toFixed(2);
        return enemyCollisionX && enemyCollisionY;
    })

    if (enemyCollision) {
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

function levelWin() {
    console.log('Niel Superado');
    level++;
    startGame();
}

function levelFail() {
    console.log('chocaste con un enemigo');
    lives--;

    if (lives <= 0) {
        level = 0;
        lives = 3
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    console.log('Game Over');
}

function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART']);

    spanLives.innerHTML = "";
    heartsArray.forEach(heart => spanLives.append(heart))
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
    if (!((playerPosition.y - elementsSize).toFixed(2) < elementsSize)) {
        playerPosition.y -= elementsSize;
        startGame();
    }
}

function moveLeft() {
    if (!((playerPosition.x - elementsSize).toFixed(2) < elementsSize)) {
        playerPosition.x -= elementsSize;
        startGame();
    }
}

function moveRight() {
    if (!((playerPosition.x + elementsSize).toFixed(2) > canvasSize)) {
        playerPosition.x += elementsSize;
        startGame();
    }
}

function moveDown() {
    if (!((playerPosition.y + elementsSize).toFixed(2) > canvasSize)) {
        playerPosition.y += elementsSize;
        startGame();
    }
}