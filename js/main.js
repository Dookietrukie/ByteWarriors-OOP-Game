class Game {

    constructor() {
        this.player = new Player();
        this.obstaclesArr = [];
    }

    start() {

        this.attachEventListeners();

        // Create new Obstacles
        setInterval(() => {
            const myObstacle = new Obstacle();
            this.obstaclesArr.push(myObstacle);
            console.log('New obstacle created!')
            console.log(`Currently we have: ${this.obstaclesArr.length}`)
        }, 3000);

        // Move Obstacles
        setInterval(() => {
            this.obstaclesArr.forEach((obstacle) => {
                obstacle.obastacleFall();
                this.checkCollision(obstacle);
            });
        }, 16.16);
    }

    attachEventListeners() {
        document.addEventListener('keydown', event => {
            if (event.key === 'ArrowLeft' || event.key === 'a') {
                this.player.moveLeft();
            } else if (event.key === 'ArrowRight' || event.key === 'd') {
                this.player.moveRight();
            }
        });
    }

    checkCollision(obstacle) {
        if (
            this.player.positionX < obstacle.positionX + obstacle.width &&
            this.player.positionX + this.player.width > obstacle.positionX &&
            this.player.positionY < obstacle.positionY + obstacle.height &&
            this.player.height + this.player.positionY > obstacle.positionY
        ) {
            console.log('Game over dude, git good.')
            window.location.href = './../gameOver.html';
        }
    }
}

class Player {

    constructor() {
        this.positionX = 0;
        this.positionY = 0;
        this.width = 5;
        this.height = 10;
        this.playerElm = document.getElementById('player');

        this.playerElm.style.width = this.width + 'vw';
        this.playerElm.style.height = this.height + 'vh';
    }

    moveLeft() {
        this.positionX = this.positionX - 0.5;
        this.playerElm.style.left = this.positionX + 'vw';
    }

    moveRight() {
        this.positionX = this.positionX + 0.5;
        this.playerElm.style.left = this.positionX + 'vw';
    }
};

class Obstacle {

    constructor() {
        this.positionX = Math.floor(Math.random() * 90);
        this.positionY = 100;

        this.width = 2.5;
        this.height = 5;

        this.obstacleElm = this.createObstacle();
        this.game = game;
    }

    obastacleFall() {
        this.positionY = this.positionY - 0.25;
        this.obstacleElm.style.bottom = this.positionY + 'vh';

        if(this.positionY <= 0) {
            this.deleteObstacle(this);
        }
    }

    createObstacle() {
        // Create DOM Element
        const obstacleElm = document.createElement('div');
        const boardElm = document.getElementById('board');
        obstacleElm.className = 'obstacle';
        obstacleElm.style.left = this.positionX + 'vw';
        obstacleElm.style.width = this.width + 'vw';
        obstacleElm.style.height = this.height + 'vh';
        boardElm.appendChild(obstacleElm);
        return obstacleElm;
    }

    deleteObstacle(currentObstacle) {
        currentObstacle.obstacleElm.parentNode.removeChild(currentObstacle.obstacleElm);
        const index = this.game.obstaclesArr.indexOf(currentObstacle);
        if (index > -1) {
            this.game.obstaclesArr.splice(index, 1);
        }
        console.log('Object deleted.')
        console.log(`Current we have: ${this.game.obstaclesArr.length}`)
    }
}

const game = new Game();
game.start();