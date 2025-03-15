// Load the score from localStorage when the page is loaded
let score = JSON.parse(localStorage.getItem('score'));

// Check if the score in localStorage is null (first time the game is loaded)
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  }
}

updateScoreElement(); // Update the displayed score on the page

let compMove = '';   // Variable to store computer's move
let userMove = '';   // Variable to store user's move
let result = '';     // Variable to store the result of the game

// Function to randomly pick the computer's move
function pickCompMove() {
  compRange = Math.random();
  
  // Assign computer's move based on the generated random number
  if (compRange >= 0 && compRange < 1/3){
    compMove = 'rock';
  } else if (compRange >= 1/3 && compRange < 2/3) {
    compMove = 'paper';
  } else if (compRange >= 2/3 && compRange < 1) {
    compMove = 'scissor';
  }
}

// Function to reset the score to 0 and clear the localStorage
function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score'); // Remove score from localStorage
  updateScoreElement(); // Update the displayed score on the page
}

// Function to update the score display element on the page
function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = 
  `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}

// Function to play the game when the user picks a move
function playGame(userMove) {
  pickCompMove();
  
  // Determine the result based on user's move and computer's move
  if (userMove === 'rock') {
    if (compMove === 'rock') {
      result = 'Tie.';
    } else if (compMove === 'paper') {
      result = 'You lose!';
    } else if (compMove === 'scissor') {
      result = 'You win!';
    }
  } else if (userMove === 'paper') {
    if (compMove === 'rock') {
      result = 'You win!';
    } else if (compMove === 'paper') {
      result = 'Tie.';
    } else if (compMove === 'scissor') {
      result = 'You lose!';
    }
  } else if (userMove === 'scissor') {
    if (compMove === 'rock') {
      result = 'You lose!';
    } else if (compMove === 'paper') {
      result = 'You win!';
    } else if (compMove === 'scissor') {
      result = 'Tie.';
    }
  }
  
  // Update the score based on the result of the game
  if (result === 'You win!') {
    score.wins += 1;
  } else if (result === 'You lose!') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  // Save the updated score to localStorage
  localStorage.setItem('score', JSON.stringify(score));

  // Update the result and move images with emojis for both user and computer
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-move').innerHTML = `You <img class="move-icon" src="images/${userMove}-emoji.png" alt=""><img class="move-icon" src="images/${compMove}-emoji.png" alt=""> Computer`;

  updateScoreElement(); // Update the score display on the page again
}