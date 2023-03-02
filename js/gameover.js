const gameOverScreen = document.querySelector('.game-over');

function showGameOver() {
  gameOverScreen.style.display = 'flex';
}

const playAgainButton = gameOverScreen.querySelector('.button');

playAgainButton.addEventListener('click', function() {
  window.location.href = './../index.html'; // Replace with the URL of your index.html page
});