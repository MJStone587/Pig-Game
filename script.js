'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currentScore1 = document.getElementById('current--0');
const currentScore2 = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const oneTotal = document.getElementById('score--0');
const twoTotal = document.getElementById('score--1');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

//starting conditions
currentScore1.textContent = 0;
currentScore2.textContent = 0;
oneTotal.textContent = 0;
twoTotal.textContent = 0;
//setting
let current = 0;
const score = [0, 0];
let activePlayer = 0;
let playing = true;

//dice roll image display function
const diceImage = function (rollDice) {
  document.querySelector('.dice').src = 'dice-' + String(rollDice) + '.png';
};
//function to switch player
const swapPlayer = function () {
  document.getElementById('current--' + activePlayer).textContent = 0;
  current = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    let diceRoll = Math.trunc(Math.random() * 6) + 1;
    diceImage(diceRoll);
    diceEl.classList.remove('hidden');
    console.log(diceRoll);
    if (diceRoll === 1) {
      swapPlayer();
    } else {
      current += diceRoll;
      document.getElementById('current--' + activePlayer).textContent =
        String(current);
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += current;
    document.getElementById('score--' + activePlayer).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector('.player--' + activePlayer)
        .classList.add('player--winner');
      document
        .querySelector('.player--' + activePlayer)
        .classList.remove('player--active');
    } else {
      swapPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  currentScore1.textContent = '0';
  currentScore2.textContent = '0';
  oneTotal.textContent = '0';
  twoTotal.textContent = '0';
  current = 0;
  diceEl.classList.add('hidden');
  activePlayer = 0;
  score[0] = 0;
  score[1] = 0;
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
});
