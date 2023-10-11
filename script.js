document.addEventListener('DOMContentLoaded', () => {
    const gameCanvas = document.getElementById('gameCanvas');
    const ctx = gameCanvas.getContext('2d');

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
                interval = 100;
            }
        }

        requestAnimationFrame(updateSnake);
    }

    function checkCollision() {
        const head = snake[0];
        return (
            head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 ||
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
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleMode');

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
    
});
