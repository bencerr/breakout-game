var canvas = document.getElementById("myCanvas");
var scoreHeader = document.getElementById("scoreboard")
var ctx = canvas.getContext("2d")

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 15;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var score = 0;

function displayPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

function displayBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

function mouseHandler(e) {
    var rect = canvas.getBoundingClientRect();
    paddleX = (e.screenX - rect.left) - (paddleWidth/2);
    if (paddleX <= 0) {
        paddleX = 0;
    } else if (paddleX + paddleWidth > canvas.width){
        paddleX = canvas.width - paddleWidth;
    }
}

function resetGame() {
    alert("GAME OVER");
    document.location.reload();
    clearInterval(drawInterval);
    score = 0;
}

function updateScore() {
    score++;
    scoreHeader.innerText = "SCORE: " + score;
}

document.addEventListener("mousemove", mouseHandler, false);

function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    displayBall();
    displayPaddle();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            updateScore();
        } else {
            resetGame()
        }
    }

    x += dx;
    y += dy;
}

var drawInterval = setInterval(draw, 10) // calls draw every 10 seconds