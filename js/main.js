class Player {

    constructor() {
        this.positionX = 0;
        this.positionY = 0;
        this.playerElm = document.getElementById('player');
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
        this.obstacleElm = this.createObstacle();
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
        boardElm.appendChild(obstacleElm);
        return obstacleElm;
    }

    deleteObstacle(currentObstacle) {
        currentObstacle.obstacleElm.parentNode.removeChild(currentObstacle.obstacleElm);
        const index = obstaclesArr.indexOf(currentObstacle);
        if (index > -1) {
            obstaclesArr.splice(index, 1);
        }
    }
}

const myPlayer = new Player();
const obstaclesArr = []; // This array will hold instances of the Obastacle class.

// Create new Obstacles
setInterval(function() {
    const myObstacle = new Obstacle();
    obstaclesArr.push(myObstacle);
    console.log('New obstacle created!')
    console.log(`Currently we have: ${obstaclesArr.length}`)
}, 1000);

// Move Obstacles
setInterval(function() {
    obstaclesArr.forEach(function(obstacle) {
        obstacle.obastacleFall();
    });
}, 16.16);

// Attach Event Listeners

document.addEventListener('keydown', event => {
    if(event.key === 'ArrowLeft' || event.key === 'a') {
        myPlayer.moveLeft();
    } else if(event.key === 'ArrowRight' || event.key === 'd') {
        myPlayer.moveRight();
    }
});