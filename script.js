document.addEventListener('DOMContentLoaded', () => {
    const gameCanvas = document.getElementById('gameCanvas');
    const ctx = gameCanvas.getContext('2d');
    const gridSize = 25;
    const numCols = 32;
    const numRows = 19.2; 
    const snakeColors = ['#00f', '#0f0', '#ff0', '#f0f', '#0ff', '#f80', '#08f', '#f08', '#80f', '#8f0'];
  


    gameCanvas.width = numCols * gridSize;
    gameCanvas.height = numRows * gridSize;

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 1;
    let dy = 0;
    let score = 0;
    let gameInterval;
    let scoreElement = document.getElementById('score');

    function drawSnake() {
        const snakeColor = snakeColors[score % snakeColors.length];
        ctx.fillStyle = snakeColor;
    
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });
    }

    function drawFood() {
        ctx.fillStyle = '#f00';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }

    function updateSnake(timestamp) {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
        if (head.x < 0) head.x = numCols - 1;
        if (head.x >= numCols) head.x = 0;
        if (head.y < 0) head.y = numRows - 1;
        if (head.y >= numRows) head.y = 0;
    
        snake.unshift(head);
    
    
        const foodGridX = food.x * gridSize;
        const foodGridY = food.y * gridSize;
    
        if (
            head.x * gridSize >= foodGridX - 5 &&
            head.x * gridSize <= foodGridX + 5 &&
            head.y * gridSize >= foodGridY - 5 &&
            head.y * gridSize <= foodGridY + 5
        ) {
            score++;
            food = { x: Math.floor(Math.random() * numCols), y: Math.floor(Math.random() * numRows) };
            document.getElementById('scoreValue').textContent = score; 
            changeSnakeColor(); 
        } else {
            snake.pop();
        }
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    
        drawSnake();
        drawFood();
    
        if (checkCollision()) {
            alert(`Game Over! Pontuação: ${score}`);
            clearInterval(gameInterval);
            gameInterval = null;
            snake = [{ x: 10, y: 10 }];
            dx = 1;
            dy = 0;
            score = 0;
            document.getElementById('startGame').style.display = 'block';
        }
    }

    function checkCollision() {
        const head = snake[0];
        return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    }

    function handleKeydown(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (dy !== 1) {
                    dx = 0;
                    dy = -1;
                }
                break;
            case 'ArrowDown':
                if (dy !== -1) {
                    dx = 0;
                    dy = 1;
                }
                break;
            case 'ArrowLeft':
                if (dx !== 1) {
                    dx = -1;
                    dy = 0;
                }
                break;
            case 'ArrowRight':
                if (dx !== -1) {
                    dx = 1;
                    dy = 0;
                }
                break;
        }
    }
    
    document.addEventListener('keydown', handleKeydown);

    document.getElementById('startGame').addEventListener('click', () => {
        gameInterval = setInterval(updateSnake, 200);
        document.getElementById('startGame').style.display = 'none';
    });
});



function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled'); 
  }
  
  // Função para desativar o modo escuro
  function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled'); 
  }
  
  // Verificar o estado atual do modo escuro no carregamento da página
  document.addEventListener('DOMContentLoaded', function() {
    const storedDarkMode = localStorage.getItem('darkMode');
  
    if (storedDarkMode === 'enabled') {
      enableDarkMode();
      document.getElementById('dark-mode-toggle').classList.add('fa-sun');
    } else {
      disableDarkMode();
      document.getElementById('dark-mode-toggle').classList.add('fa-moon');
    }
  });
  
  // Adicione um evento para detectar a mudança de modo claro/escuro
  document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    const body = document.body;
    
    const darkModeEnabled = body.classList.contains('dark-mode');
  
    if (!darkModeEnabled) {
      this.classList.remove('fa-moon');
      this.classList.add('fa-sun');
    } else {
      this.classList.remove('fa-sun');
      this.classList.add('fa-moon');
    }
  
    // Após mudar a classe, verifique novamente o modo escuro
    if (darkModeEnabled) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });