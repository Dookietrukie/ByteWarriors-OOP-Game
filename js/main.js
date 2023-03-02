class Player {

    constructor() {
        this.positionX = 0;
        this.positionY = 0;
        this.playerElm = document.getElementById('player');
    }

    moveLeft() {
        this.positionX--;
        this.playerElm.style.left = this.positionX + 'vw';
    }

    moveRight() {
        this.positionX++;
        this.playerElm.style.left = this.positionX + 'vw';
    }
};

const myPlayer = new Player();

// Attach Event Listeners

document.addEventListener('keydown', event => {
    if(event.key === 'ArrowLeft' || event.key === 'a') {
        myPlayer.moveLeft();
    } else if(event.key === 'ArrowRight' || event.key === 'd') {
        myPlayer.moveRight();
    }
});