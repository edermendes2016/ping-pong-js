let boardWidth = 600;
let boardHeight = 300;
let ballSize = 10;
let paddleWidth = 10;
let paddleHeight = 60;
let paddleSpeed = 5;
let scoreLimit = 1; // pontuação necessária para vencer o jogo
let score1 = 0;
let score2 = 0;
let ball;
let paddle1;
let paddle2;
let speed;


function setup() {
    createCanvas(boardWidth, boardHeight);
    ball = createVector(boardWidth / 2 - ballSize / 2, boardHeight / 2 - ballSize / 2);
    speed = createVector(random(-5, 5), random(-5, 5));
    paddle1 = createVector(paddleWidth, boardHeight / 2 - paddleHeight / 2);
    paddle2 = createVector(boardWidth - paddleWidth * 2, boardHeight / 2 - paddleHeight / 2);
}

function draw() {
    background(0);

    // desenha as paletas
    rect(paddle1.x, paddle1.y, paddleWidth, paddleHeight);
    rect(paddle2.x, paddle2.y, paddleWidth, paddleHeight);

    // atualiza a posição da bola
    ball.add(speed);

    // desenha a bola
    ellipse(ball.x, ball.y, ballSize, ballSize);

    // verifica colisão com as paredes
    if (ball.y > height - ballSize / 2 || ball.y < ballSize / 2) {
        speed.y *= -1;
    }

    // verifica colisão com as paletas
    if (ball.x < paddle1.x + paddleWidth && ball.y > paddle1.y && ball.y < paddle1.y + paddleHeight) {
        speed.x *= -1.1;
        speed.y *= 1.1;
    }

    if (ball.x > paddle2.x && ball.y > paddle2.y && ball.y < paddle2.y + paddleHeight) {
        speed.x *= -1.1;
        speed.y *= 1.1;
    }

    // verifica se a bola saiu da tela
    if (ball.x < -ballSize / 2) {
        score(2);
        reset();
    }

    if (ball.x > width + ballSize / 2) {
        score(1);
        reset();
    }

    // atualiza a posição da paleta do jogador 1
    if (keyIsDown(87) && paddle1.y > 0) {
        paddle1.y -= paddleSpeed;
    }

    if (keyIsDown(83) && paddle1.y < height - paddleHeight) {
        paddle1.y += paddleSpeed;
    }

    // atualiza a posição da paleta do jogador 2
    if (keyIsDown(UP_ARROW) && paddle2.y > 0) {
        paddle2.y -= paddleSpeed;
    }

    if (keyIsDown(DOWN_ARROW) && paddle2.y < height - paddleHeight) {
        paddle2.y += paddleSpeed;
    }

    // desenha o placar
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255);
    text(score1 + " - " + score2, width / 2, 50);

    // verifica se algum jogador venceu
    if (score1 >= scoreLimit) {
        gameOver(1);
    } else if (score2 >= scoreLimit) {
        gameOver(2);
    }
}

function reset() {    
    ball = createVector(boardWidth / 2 - ballSize / 2, boardHeight / 2 - ballSize / 2);
    speed = createVector(random(-5, 5), random(-5, 5));
    paddle1 = createVector(paddleWidth, boardHeight / 2 - paddleHeight / 2);
    paddle2 = createVector(boardWidth - paddleWidth * 2, boardHeight / 2 - paddleHeight / 2);
}

function score(player) {
    if (player === 1) {
        score1++;
    } else if (player === 2) {
        score2++;
    }
    if (score1 >= 5 || score2 >= 5) {
        keyPressed();
    }
}

function gameOver() {
    // desenha a mensagem de game over
    textSize(64);
    textAlign(CENTER, CENTER);
    fill(255);
    if (score1 >= 5) {
        text("Player 1 wins!", width / 2, height / 2);
        textSize(18);
        textAlign(CENTER, CENTER);
        
    } else {
        text("Player 2 wins!", width / 2, height / 2);
        textSize(18);
        textAlign(CENTER, CENTER);
    }
    // pausa o jogo    
    noLoop();

}


