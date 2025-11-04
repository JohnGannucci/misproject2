// Simple AI-Friendly Game - Number Clicker
class SimpleGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        // Simple game state
        this.score = 0;
        this.target = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;
        this.maxAttempts = 10;
        this.gameOver = false;
        this.gameWon = false;
        this.message = "Click Start to Begin!";
        
        // Random target number
        this.target = Math.floor(Math.random() * 100) + 1;
        
        this.setupEventListeners();
        this.draw();
    }
    
    setupEventListeners() {
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('restartBtn').addEventListener('click', () => this.restartGame());
        document.getElementById('playAgainBtn').addEventListener('click', () => this.restartGame());
        document.getElementById('nextLevelBtn').addEventListener('click', () => this.nextLevel());
        
        // Click handler for guessing
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
    }
    
    startGame() {
        this.score = 0;
        this.attempts = 0;
        this.gameOver = false;
        this.gameWon = false;
        this.message = "Click numbers to guess!";
        this.gameLoop();
    }
    
    togglePause() {
        if (this.gameOver || this.gameWon) return;
        this.message = this.message === "Game Paused!" ? "Game Resumed!" : "Game Paused!";
        this.draw();
    }
    
    restartGame() {
        this.target = Math.floor(Math.random() * 100) + 1;
        this.startGame();
    }
    
    nextLevel() {
        this.target = Math.floor(Math.random() * 100) + 1;
        this.startGame();
    }
    
    handleClick(e) {
        if (this.gameOver || this.gameWon) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if click is on a number
        for (let i = 1; i <= 9; i++) {
            const numX = (i - 1) % 3 * 100 + 250;
            const numY = Math.floor((i - 1) / 3) * 100 + 300;
            
            if (x >= numX && x <= numX + 80 && y >= numY && y <= numY + 80) {
                this.makeGuess(i);
                break;
            }
        }
    }
    
    makeGuess(guess) {
        this.attempts++;
        
        if (guess === this.target) {
            this.gameWon = true;
            this.score = (this.maxAttempts - this.attempts) * 10;
            this.message = `You won! Score: ${this.score}`;
        } else if (guess < this.target) {
            this.message = `${guess} is too low! Try higher.`;
        } else {
            this.message = `${guess} is too high! Try lower.`;
        }
        
        if (this.attempts >= this.maxAttempts && !this.gameWon) {
            this.gameOver = true;
            this.message = `Game Over! The number was ${this.target}`;
        }
        
        this.draw();
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillRect(0, 0, this.canvas.width, 100);
        
        // Draw title
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 32px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Number Guessing Game', this.canvas.width / 2, 50);
        
        // Draw instructions
        this.ctx.font = '18px Arial';
        this.ctx.fillText('Guess the number between 1-9', this.canvas.width / 2, 80);
        
        // Draw current game state
        this.ctx.fillStyle = '#34495e';
        this.ctx.fillRect(50, 150, 700, 120);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Score: ${this.score}`, 70, 190);
        this.ctx.fillText(`Attempts: ${this.attempts}/${this.maxAttempts}`, 70, 220);
        
        // Draw message
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.message, this.canvas.width / 2, 250);
        
        // Draw number buttons (1-9)
        if (!this.gameOver && !this.gameWon) {
            for (let i = 1; i <= 9; i++) {
                const buttonX = (i - 1) % 3 * 100 + 250;
                const buttonY = Math.floor((i - 1) / 3) * 100 + 300;
                
                // Draw button background
                this.ctx.fillStyle = '#3498db';
                this.ctx.fillRect(buttonX, buttonY, 80, 80);
                
                // Draw button border
                this.ctx.strokeStyle = '#2980b9';
                this.ctx.lineWidth = 3;
                this.ctx.strokeRect(buttonX, buttonY, 80, 80);
                
                // Draw number
                this.ctx.fillStyle = 'white';
                this.ctx.font = 'bold 32px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(i.toString(), buttonX + 40, buttonY + 50);
            }
        } else {
            // Draw game over/win screen
            this.ctx.fillStyle = this.gameWon ? '#27ae60' : '#e74c3c';
            this.ctx.fillRect(250, 280, 300, 200);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 28px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(this.gameWon ? 'You Win!' : 'Game Over', this.canvas.width / 2, 340);
            
            this.ctx.font = '20px Arial';
            this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, 380);
            
            if (this.gameOver) {
                this.ctx.fillText(`The number was: ${this.target}`, this.canvas.width / 2, 410);
            }
        }
        
        // Update button states
        this.updateButtonStates();
    }
    
    updateButtonStates() {
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const restartBtn = document.getElementById('restartBtn');
        
        if (this.gameOver || this.gameWon) {
            startBtn.disabled = true;
            pauseBtn.disabled = true;
            restartBtn.disabled = false;
        } else {
            startBtn.disabled = false;
            pauseBtn.disabled = false;
            restartBtn.disabled = false;
        }
    }
    
    gameLoop() {
        if (!this.gameOver && !this.gameWon) {
            this.draw();
            setTimeout(() => this.gameLoop(), 100);
        }
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SimpleGame();
});
