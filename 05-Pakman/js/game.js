'use strict';
var WALL = '#';
var FOOD = '.';
var EMPTY = ' ';
var SUPER_FOOD = '🍄'
var Charries = '🍒'

var MaxFoods = 68;
var gBoard;
var gGame = {
  score: 0,
  isOn: false
};




function init() {

  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);
  addSuperFood();
  hiddenElement();
  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;
  var CharessInterval = setInterval(addCharris, 15000);

}

function isWin() {
  return (gGame.score === MaxFoods)
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
    }
  }
  return board;
}
function addSuperFood() {
  gBoard[1][1] = SUPER_FOOD;
  gBoard[1][8] = SUPER_FOOD;
  gBoard[8][1] = SUPER_FOOD;
  gBoard[8][8] = SUPER_FOOD;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  if (value===15){
    MaxFoods+=15;
  }
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}

function gameOver() {
  console.log('Game Over');
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  var elCard = document.querySelectorAll('.afterEnding');
  elCard[0].classList.remove("coverd");
  elCard[2].classList.remove("coverd");

}

function hiddenElement() {
  var elCard = document.querySelectorAll('.afterEnding');
  for (var i = 0; i < elCard.length; i++) {
    elCard[i].classList.add("coverd");
  }
}

function winDisplay() {
  var elCard = document.querySelectorAll('.afterEnding');
  elCard[1].classList.remove("coverd");
  elCard[2].classList.remove("coverd");
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
}
function addCharris() {

  var row = Math.floor(Math.random() * (gBoard.length - 2)) + 1;
  var col = Math.floor(Math.random() * (gBoard[0].length - 2)) + 1;
  if (gBoard[row][col] === EMPTY || gBoard[row][col] === FOOD) {
    gBoard[row][col] === Charries;
    renderCell({ i: row, j: col }, Charries);

  }

}