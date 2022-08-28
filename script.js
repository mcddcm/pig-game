'use strict';

/*******************************************
/* VARIABLES
/*******************************************/

// store Player 1 element
const player0El = document.querySelector('.player--0');
// store Player 2 element
const player1El = document.querySelector('.player--1');
// store Player 1 total score
const score0El = document.querySelector('#score--0'); // option 1
// store Player 2 total score
const score1El = document.getElementById('score--1') // option 2
// store Player 1 current score
const current0El = document.getElementById('current--0');
// store Player 2 current score
const current1El = document.getElementById('current--1');
// store Dice element
const diceEl = document.querySelector('.dice');
// store [New Game] button
const btnNew = document.querySelector('.btn--new');
// store [Roll Dice] button
const btnRoll = document.querySelector('.btn--roll');
// store [Hold] button
const btnHold = document.querySelector('.btn--hold');
// variable declarations for total scores, active player, current score, and game status
let scores, activePlayer, currentScore, playing;


/*******************************************
/* FUNCTIONS
/*******************************************/

// switch players
const switchPlayer = function () {
  // reset active player current score 
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // toggle active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // reset current score tracker
  currentScore = 0;
  // reassign {player--active} to new player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// reset initial values
const init = function () {
  // total scores
  scores = [0, 0];
  // active player
  activePlayer = 0;
  // current score
  currentScore = 0;
  // game status
  playing = true;
  // reset Player 1 total score 
  score0El.textContent = 0;
  // reset Player 2 total score
  score1El.textContent = 0;
  // reset Player 1 current score 
  current0El.textContent = 0;
  // reset Player 2 current score
  current1El.textContent = 0;
  // hide Dice element
  diceEl.classList.add('hidden');
  // remove .player-winner class
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  // remove/reset .player--active class
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}


/*******************************************
/* STARTING CONDITIONS
/*******************************************/

// ** initialise values
init();


/*******************************************
/* [🎲 ROLL DICE] FUNCTIONALITY
/*******************************************/

// listen for when [Roll Dice] button is clicked
btnRoll.addEventListener('click', function () {
  // check game status
  if (playing) {
    // generate random number between 1 and 6
    const diceValue = Math.trunc(Math.random() * 6) + 1;
    // assign random number to img src link address
    diceEl.src = `./images/dice-${diceValue}.png`;
    // display dice img
    diceEl.classList.remove('hidden');
    // ** if player rolls a 1 **
    // check if a 1 is rolled
    if (diceValue !== 1) {
      // add dice value to current score
      currentScore += diceValue;
      // display current score 
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});


/*******************************************
/* [📥 HOLD] FUNCTIONALITY
/*******************************************/

// listen for when [Hold] button is clicked
btnHold.addEventListener('click', function () {
  // check game status
  if (playing) {
    // add current score to active player's total score
    scores[activePlayer] += currentScore;
    // display total score
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    // ** if player wins **
    // check if total score is >= 100
    if (scores[activePlayer] >= 100) {
      // set playing to false
      playing = false;
      // add player--winner class to active player
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      // remove player--active class from active player
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      // hide dice img
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});


/*******************************************
/* [🔄 NEW GAME] FUNCTIONALITY
/*******************************************/

// listen for when [New Game] button is clicked and initialise values
btnNew.addEventListener('click', init);
