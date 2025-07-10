'use strict';

const diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');

const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

const overAll0 = document.querySelector('#score--0');
const overAll1 = document.querySelector('#score--1');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

current0.textContent = 0;
current1.textContent = 0;

let currentScore = 0;
let activetPlayer = 0;

//we represent the players score as a array
const scores = [0, 0];

const reset = function () {
  document.querySelector(`current--${activetPlayer}`);
  diceEl.classList.add('hidden');
  overAll0.textContent = 0;
  overAll1.textContent = 0;
  const scores = [0, 0];
};

const switchPlayer = function () {
  document.querySelector(`#current--${activetPlayer}`).textContent = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  activetPlayer = activetPlayer === 0 ? 1 : 0;
  currentScore = 0;
};

//Roll Button
btnRoll.addEventListener('click', function () {
  //Generating A Random Number For The Dice
  const dice = Math.trunc(Math.random() * 6) + 1;
  //Making The Dice Appear Each Time With The Related Image For It
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  // We Set The Rules Here , If Its Not 1 We can Move On
  if (dice !== 1) {
    currentScore += dice;
    document.querySelector(`#current--${activetPlayer}`).textContent =
      currentScore;
  }
  //If It Is 1 You Should Lose It All And Switch Player
  else {
    //Winner Resets The Game
    if (scores[activetPlayer] >= 100) {
      reset();
    }
    switchPlayer();
  }
});

//Hold Button
btnHold.addEventListener('click', function () {
  //Adding The Current Scores Of Each Player To The OverAll Of Them
  scores[activetPlayer] += currentScore;
  document.querySelector(`#score--${activetPlayer}`).textContent =
    scores[activetPlayer];
  //Winner Resets The Game
  if (scores[activetPlayer] >= 100) {
    reset();
  }
  switchPlayer();
});

//Reset Button
btnNew.addEventListener('click', reset);
