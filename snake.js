// 定义画布和画笔
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// 定义蛇的初始位置和大小
var snakeSize = 10;
var snake = [
  { x: 50, y: 50 },
  { x: 40, y: 50 },
  { x: 30, y: 50 },
  { x: 20, y: 50 }
];

// 定义食物的位置
var food = { x: 0, y: 0 };

// 在画布上绘制蛇和食物
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00FF00";
  for (var i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, snakeSize, snakeSize);
  }
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

// 更新蛇的位置
function update() {
  for (var i = snake.length - 1; i > 0; i--) {
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }
  snake[0].x += snakeSize;
  if (snake[0].x >= canvas.width) {
    snake[0].x = 0;
  }
}

// 生成新的食物位置
function generateFood() {
  food.x = Math.floor(Math.random() * canvas.width / snakeSize) * snakeSize;
  food.y = Math.floor(Math.random() * canvas.height / snakeSize) * snakeSize;
}

// 判断是否吃到食物
function checkFood() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
    generateFood();
  }
}

// 主循环
function main() {
 // 监听键盘事件
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 37 && direction !== "right") {
    direction = "left";
  } else if (event.keyCode === 38 && direction !== "down") {
    direction = "up";
  } else if (event.keyCode === 39 && direction !== "left") {
    direction = "right";
  } else if (event.keyCode === 40 && direction !== "up") {
    direction = "down";
  }
});

// 定义蛇的移动方向
var direction = "right";

// 定时器，每100毫秒更新一次游戏
setInterval(function () {
  update();
  checkFood();
  draw();
}, 100);
