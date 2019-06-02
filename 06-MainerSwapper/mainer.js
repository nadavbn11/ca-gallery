'use strict'
// Pieces Types
const BOOM = '💣';
const FLAG = '🚩';
const Icon_START = '🙂';
const Icon_FAIL = '☹️';
const Icon_Win = '😎';
const EMPTY = '🗌';

var gBoard;
var gSelectedElCell = null;
var gFlagCounter;
var GplayerRecord;
var GplayersRecord=[];
var Gtryleft;
var BOARD_SIZE = 8;  ///deafult size
var isFirstClick;
var startTimer;
var timeRunner;
var currTime;

function init() {
    gBoard = createBoord();
    renderBoard(gBoard);
    setImage(Icon_START); 
    Gtryleft=3;
    gFlagCounter=0;
    displayFlagStatus();
    startTime();
    isFirstClick=true;    
}

function createCell() {
    return {
        isShown: false,
        isMine: false,
    }
}

function createBoord() {
    var board = [];
    for (var i = 0; i < BOARD_SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = createCell();
        }
    }
    return board;
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < BOARD_SIZE; i++) {
        strHtml += '<tr>\n';
        for (var j = 0; j < BOARD_SIZE; j++) {
            var img = BOOM;
            img = (Math.random() < 0.2) ? BOOM : '';
            if (img === BOOM) {
                board[i][j].isMine = true;
            }
            var className = img;
            var tdId = `cell-${i}-${j}`;
            strHtml += `<td id="${tdId}" class="${className}"  onclick="cellClicked(this) "  oncontextmenu="addRemoveFlag(this); return false; " >          
         </td>`
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var parts = strCellId.split('-')
    var coord = { i: +parts[1], j: +parts[2] };
    return coord;
}

function cellClicked(elCell) {
    var cellCoord = getCellCoord(elCell.id);
    var cordI = cellCoord.i;
    var cordJ = cellCoord.j;
    if (elCell.innerHTML === FLAG) return;
    if (isFirstClick) {
        while (gBoard[cordI][cordJ].isMine) {
            gBoard = createBoord();
            renderBoard(gBoard);
        }
        startTimer = new Date();
        timeRunner = setInterval(setTimer, 1000);
        isFirstClick = false;
    }
    if (gBoard[cordI][cordJ].isMine) {
        var cell= document.getElementById(elCell.id);
        cell.style.backgroundColor="red";
        cell.innerHTML=BOOM;
        Gtryleft--;
        var trys = document.getElementById("Try");
        trys.innerHTML = Gtryleft;
        if (Gtryleft===0)  GameOver();
    }
    else {
        var mainerCounter = chackBoomsAround(elCell.id);
        if (mainerCounter === 0) {
            elCell.innerText = EMPTY;
            gBoard[cordI][cordJ].isShown = true;
        }
        else elCell.innerText = mainerCounter;
    }
    gBoard[cordI][cordJ].isShown = true;
    if (isWin()) {
        setImage(Icon_Win) 
        var playerName=prompt("You WIN!!! enter your name");
        var playerTime =parseInt((currTime - startTimer) / 1000);
        GplayerRecord = { name: playerName, level: BOARD_SIZE, time: playerTime};
        GplayersRecord.push(GplayerRecord);
        createWinBoard(GplayersRecord);
        clearInterval(timeRunner);    
    }
    return;
}

function isWin() {
    for (var i = 0; i < BOARD_SIZE; i++) {
        for (var j = 0; j < BOARD_SIZE; j++) {
            if (gBoard[i][j].isShown === false && gBoard[i][j].isMine == false)
                return false;
        }
    }
    return true;
}

function chackBoomsAround(cords) {
    var cellCoord = getCellCoord(cords);
    var cordI = cellCoord.i;
    var cordJ = cellCoord.j
    var boomsAround = 0;
    for (var i = cordI - 1; i <= cordI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cordJ - 1; j <= cordJ + 1; j++) {
            if (i === cordI && j === cordJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isMine) boomsAround++;
        }
    }
    return boomsAround;
}

function addRemoveFlag(Elcard) {
    var cellCoord = getCellCoord(Elcard.id);
    var cordI = cellCoord.i;
    var cordJ = cellCoord.j;
    ///can't put flag if the cell isShown
    if  (gBoard[cordI][cordJ].isShown){
     return;
    }
    if (Elcard.innerHTML === FLAG) {
        Elcard.innerHTML = "";
        gFlagCounter--;
    }
    else {
        Elcard.innerHTML = FLAG;
        gFlagCounter++;
    }
    displayFlagStatus();
}

function GameOver() {
    setImage(Icon_FAIL);
    clearInterval(timeRunner);
    disableButtons();
    showAllBooms();
}

function setImage(image) {
    var img = document.getElementById("image")
    img.innerText = image;
}

function setTimer() {
    var timer = document.getElementById("Timer")
    currTime = new Date();
    timer.innerText = parseInt((currTime - startTimer) / 1000);
}

function showAllBooms() {
    for (var i = 0; i < BOARD_SIZE; i++) {
        for (var j = 0; j < BOARD_SIZE; j++) {
            if (gBoard[i][j].isMine === true) {
                var strId = `cell-${i}-${j}`;
                var place = document.getElementById(strId);
                place.innerHTML = BOOM;
            }
        }
    }
}

function disableButtons(){
    for (var i = 0; i < BOARD_SIZE; i++) {
        for (var j = 0; j < BOARD_SIZE; j++) {
            var strId = `cell-${i}-${j}`;
             var cell= document.getElementById(strId);
             cell.onclick="";
             cell.oncontextmenu="";
            
        }
    }
}
function changeBoardSize(ElButtonId){
    BOARD_SIZE=parseInt(ElButtonId);
    init();
}

function displayFlagStatus(){
    var Flags = document.getElementById("Flagcounter");
    Flags.innerHTML = gFlagCounter;
    var trys = document.getElementById("Try");
    trys.innerHTML = Gtryleft;
}

function startTime(){
    clearInterval(timeRunner);
    var timer = document.getElementById("Timer")
    timer.innerText = "00";
}

function createWinBoard(board) {   
        var strHTML = '';
        for (var i = 0; i < board.length; i++) {
            var player=board[i];
            strHTML += 
                `<tr class="player">
                    <td><span>Player Name: </span>${player.name} </td>
                    <td><span>Player Time: </span>${player.time} </td>
                    <td><span>Board Size: </span>${player.level} </td>
                </tr>`
        } 
    var elMat = document.querySelector('.record-board');
    elMat.innerHTML = strHTML ;
}