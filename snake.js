// 创建画布和蛇的起始位置
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const snake = [{ x: 0, y: 0 }];

// 定义蛇的移动方向
let direction = 'right';

// 创建食物的位置
let food = { x: Math.floor(Math.random() * canvas.width), y: Math.floor(Math.random() * canvas.height) };

// 定义游戏循环
function gameLoop() {
  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 绘制蛇
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }

  // 绘制食物
  ctx.fillRect(food.x, food.y, 10, 10);

  // 移动蛇的头部
  const head = { x: snake[0].x, y: snake[0].y };
  if (direction === 'up') {
    head.y -= 10;
  } else if (direction === 'down') {
    head.y += 10;
  } else if (direction === 'left') {
    head.x -= 10;
  } else if (direction === 'right') {
    head.x += 10;
  }

  // 添加新的头部
  snake.unshift(head);

  // 判断是否吃到食物
  if (head.x === food.x && head.y === food.y) {
    food = { x: Math.floor(Math.random() * canvas.width), y: Math.floor(Math.random() * canvas.height) };
  } else {
    // 移除尾部
    snake.pop();
  }

  // 判断游戏是否结束
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some((part, index) => index !== 0 && part.x === head.x && part.y === head.y)) {
    alert('Game Over!');
    clearInterval(intervalId);
  }
}

// 监听键盘事件，改变蛇的方向
document.addEventListener('keydown', event => {
  if (event.code === 'ArrowUp' && direction !== 'down') {
    direction = 'up';
  } else if (event.code === 'ArrowDown' && direction !== 'up') {
    direction = 'down';
  } else if (event.code === 'ArrowLeft' && direction !== 'right') {
    direction = 'left';
  } else if (event.code === 'ArrowRight' && direction !== 'left') {
    direction = 'right';
  }
});

// 开始游戏
