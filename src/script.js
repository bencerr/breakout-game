var canvas = document.getElementById("myCanvas");
var scoreHeader = document.getElementById("scoreboard")
var ctx = canvas.getContext("2d")

// ball
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 15;

// paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

// bricks
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = []
var columns = 5;
var rows = 3;
for (var a=0; a<columns; a++) {
    bricks[a] = [];
    for (var b=0; b<rows; b++) {
        bricks[a][b] = {x: 0, y: 0, visible: true};
    }
}

// score
var score = 0;

function checkBricks() {
    for(var c=0; c<columns; c++) {
        for(var r=0; r<rows; r++) {
            var brick = bricks[c][r];
            if(x > brick.x && x < brick.x+brickWidth && y > brick.y && y < brick.y+brickHeight && brick.visible) {
                dy = -dy;
                brick.visible = false;
                updateScore();
            }
        }
    }
}

function displayBricks() {
    for(var column=0; column<columns; column++) {
        for(var row=0; row<rows; row++) {
            if (bricks[column][row].visible) {
                var brickX = (column*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (row*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[column][row].x = brickX;
                bricks[column][row].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#000000";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


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
    displayBricks();
    checkBricks();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            resetGame()
        }
    }

    x += dx;
    y += dy;
}

var drawInterval = setInterval(draw, 10) // calls draw every 10 seconds