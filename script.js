document.addEventListener('DOMContentLoaded', () => {
    const gameCanvas = document.getElementById('gameCanvas');
    const ctx = gameCanvas.getContext('2d');
    const startButton = document.getElementById('startGame');

    toggleButton.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-mode');
    });

    startButton.addEventListener('click', () => {
        startGame();
    });

    function startGame() {
        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 15 };
        let dx = 1;
        let dy = 0;
        let score = 0;
        let lastTimestamp = 0;
        let interval = 200;

        function drawSnake() {
            ctx.fillStyle = '#00f';
            snake.forEach(segment => {
                ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
            });
        }

        function drawFood() {
            ctx.fillStyle = '#f00';
            ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
        }

        function updateSnake(timestamp) {
            if (timestamp - lastTimestamp >= interval) {
                lastTimestamp = timestamp;

                const head = { x: snake[0].x + dx, y: snake[0].y + dy };

                if (head.x < 0) head.x = 19;
                if (head.x >= 20) head.x = 0;
                if (head.y < 0) head.y = 19;
                if (head.y >= 20) head.y = 0;

                snake.unshift(head);

                if (head.x === food.x && head.y === food.y) {
                    score++;
                    food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
                } else {
                    snake.pop();
                }

                ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

                drawSnake();
                drawFood();

                if (checkCollision()) {
                    alert(`Game Over! Pontuação: ${score}`);
                    snake = [{ x: 10, y: 10 }];
                    dx = 1;
                    dy = 0;
                    score = 0;
                    interval = 200;
                }
            }

            requestAnimationFrame(updateSnake);
        }

        function checkCollision() {
            const head = snake[0];
            return (
                snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
            );
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

        updateSnake(0);
    }
});

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled'); // Corrigido para 'enabled'
  }
  
  // Função para desativar o modo escuro
  function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled'); // Corrigido para 'disabled'
  }
  
  // Verificar o estado atual do modo escuro no carregamento da página
  document.addEventListener('DOMContentLoaded', function() {
    const storedDarkMode = localStorage.getItem('darkMode');
  
    if (storedDarkMode === 'enabled') {
      enableDarkMode();
      document.getElementById('dark-mode-toggle').classList.add('fa-moon');
    } else {
      disableDarkMode();
      document.getElementById('dark-mode-toggle').classList.add('fa-sun');
    }
  });
  
  // Adicione um evento para detectar a mudança de modo claro/escuro
  document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    const body = document.body;
    
    const darkModeEnabled = body.classList.contains('dark-mode');
  
    if (!darkModeEnabled) {
      this.classList.remove('fa-sun');
      this.classList.add('fa-moon');
    } else {
      this.classList.remove('fa-moon');
      this.classList.add('fa-sun');
    }
  
    // Após mudar a classe, verifique novamente o modo escuro
    if (darkModeEnabled) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });