const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


// create ball porps
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy:-4
}

// create paddle props
const paddle = {
    x: canvas.width / 2 - 40,
    y:canvas.height - 20,
    w: 80,
    h: 12,
    speed: 8,
    dx: 0
}
// create paddle2 props
const paddle2 = {
    x: canvas.width / 2 - 40,
    y:canvas.height - 590,
    w: 80,
    h: 12,
    speed: 8,
    dx: 0
}

// draw a ball on canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0,Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

// draw a paddle on canvas
function drawPaddle1() {
    ctx.beginPath();
    ctx.rect(paddle.x , paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}
// draw a second paddle on canvas
function drawPaddle2() {
    ctx.beginPath();
    ctx.rect(paddle2.x , paddle2.y, paddle2.w, paddle2.h);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

//move paddle 1
function movePaddle(){
    paddle.x += paddle.dx;

    //  wall detectoin
    if(paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    } 

    if(paddle.x < 0) {
        paddle.x = 0;
    }
}

// move paddle 2
function movePaddle2(){
    paddle2.x += paddle2.dx;

    //  wall detectoin
    if(paddle2.x + paddle2.w > canvas.width) {
        paddle2.x = canvas.width - paddle2.w;
    } 


    if(paddle2.x < 0) {
        paddle2.x = 0;
    }
}

//move ball 
function moverBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // collesion detections(x)
    if(ball.x + ball.size > canvas.width || ball.x < 0) {
        ball.dx *= -1;
    }

    // collesion detections(y)
    if(ball.y + ball.size > canvas.height || ball.y < 0) {
        ball.dy *= -1;
    }

    // paddle colesion 
    if(ball.x - ball.size > paddle.x && 
        ball.x + ball.size < paddle.x + paddle.w && 
        ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed;
        }
    // paddle 2 colesion
        if(ball.y - ball.size > paddle2.y && 
            ball.y + ball.size < paddle2.y + paddle2.w && 
            ball.y + ball.size < paddle2.y) {
            ball.dy = -ball.speed;
            }
}

function draw() {
    // clear canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);

    drawBall();
    drawPaddle1();
    drawPaddle2();
}

// keydown event
function keyDown(e){
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    } 
}

// keyup event
function keyUp(e){
    if(e.key === 'Right' || e.key === 'Left' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        paddle.dx = 0;
    }

}

// keydown a event
function keyDownA(ea){
    if(ea.key === 'Right' || ea.key === 'd') {
        paddle2.dx = paddle2.speed;
    } else if (ea.key === 'Left' || ea.key === 'a') {
        paddle2.dx = -paddle2.speed;
    } 
}

// keyup d event
function keyUpD(ea){
    if(ea.key === 'Right' || ea.key === 'Left' || ea.key === 'd' || ea.key === 'a') {
        paddle2.dx = 0;
    }
}

function update() {
    movePaddle();
    movePaddle2();
    moverBall();

    requestAnimationFrame(update);

    draw();
}

update();


//keyboard event handlers
document.addEventListener('keydown' , keyDown);
document.addEventListener('keyup' , keyUp);
document.addEventListener('keydown' , keyDownA);
document.addEventListener('keyup' , keyUpD);

// Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));