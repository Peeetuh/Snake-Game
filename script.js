//Snake Game
const canvas = document.getElementById("game");
const dimension = canvas.getContext("2d");



class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;


let xVelocity = 0;
let yVelocity = 0;

let score = 0;
//game loop
function drawGame() {

    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }

    clearScreen();

    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();

    if (score > 5) {
        speed = 10;
    }
    if (score > 10) {
        speed = 13;
    }

    setTimeout(drawGame, 1000 / speed);
}


//This function stops the game after the snake hits the wall / itself.
function isGameOver() {
    let gameOver = false;

    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    //walls
    if (headX < 0) {
        gameOver = true;
    } else if (headX === tileCount) {
        gameOver = true;
    } else if (headY < 0) {
        gameOver = true;
    } else if (headY === tileCount) {
        gameOver = true;
    }

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        dimension.fillStyle = "black";
        dimension.font = "60px 'Beau Rivage', cursive";

        if (gameOver) {
            dimension.fillStyle = "white";
            dimension.font = "50px";

        }

        dimension.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }

    return gameOver;
}


function drawScore() {
    dimension.fillStyle = "black";
    dimension.font = "15px 'Beau Rivage', cursive";
    dimension.fillText(score, canvas.width - 50, 10);
}

function clearScreen() {
    dimension.fillStyle = "greenyellow";
    dimension.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    dimension.fillStyle = "green";
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        dimension.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY)); //snake expands, item gets sent to the end of the body.
    while (snakeParts.length > tailLength) {
        snakeParts.shift(); // remove the furthest item from the snake parts if have more than our tail size.
    }

    dimension.fillStyle = "orange";
    dimension.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}


function drawApple() {
    dimension.fillStyle = "red";
    dimension.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}


//this function creats a new apple, once the snake eats the apple.
function checkAppleCollision() {
    if (appleX === headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}



document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
    //up
    if (event.keyCode == 38) {
        if (yVelocity == 1) return;
        yVelocity = -1;
        xVelocity = 0;
    }

    //down
    if (event.keyCode == 40) {
        if (yVelocity == -1) return;
        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if (event.keyCode == 37) {
        if (xVelocity == 1) return;
        yVelocity = 0;
        xVelocity = -1;
    }

    //right
    if (event.keyCode == 39) {
        if (xVelocity == -1) return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();