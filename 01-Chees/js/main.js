'use strict'

// Pieces Types
var KING_WHITE = '♔';
var QUEEN_WHITE = '♕';
var ROOK_WHITE = '♖';
var BISHOP_WHITE = '♗';
var KNIGHT_WHITE = '♘';
var PAWN_WHITE = '♙';
var KING_BLACK = '♚';
var QUEEN_BLACK = '♛';
var ROOK_BLACK = '♜';
var BISHOP_BLACK = '♝';
var KNIGHT_BLACK = '♞';
var PAWN_BLACK = '♟';

// The Chess Board
var gBoard;
var gSelectedElCell = null;

function restartGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < 8; i++) {
        board[i] = [];
        for (var j = 0; j < 8; j++) {
            var piece = ''
            if (i === 1) piece = PAWN_BLACK;
            if (i === 6) piece = PAWN_WHITE;
            board[i][j] = piece;
        }
    }

    board[0][0] = board[0][7] = ROOK_BLACK;
    board[0][1] = board[0][6] = KNIGHT_BLACK;
    board[0][2] = board[0][5] = BISHOP_BLACK;
    board[0][3] = QUEEN_BLACK;
    board[0][4] = KING_BLACK;

    board[7][0] = board[7][7] = ROOK_WHITE;
    board[7][1] = board[7][6] = KNIGHT_WHITE;
    board[7][2] = board[7][5] = BISHOP_WHITE;
    board[7][3] = QUEEN_WHITE;
    board[7][4] = KING_WHITE;

    board[3][3] = KNIGHT_BLACK;

    // TODO: build the board 8 * 8
    console.table(board);
    return board;

}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            // TODO: figure class name
            var className = ((i + j) % 2 === 0) ? 'white' : 'black';
            var tdId = `cell-${i}-${j}`;

            strHtml += `<td id="${tdId}" class="${className}" onclick="cellClicked(this)">
                            ${cell}
                        </td>`
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}

var res = [];
function cellClicked(elCell) {
    res = [];
    // TODO: if the target is marked - move the piece!
    if (elCell.classList.contains('mark')) {
        console.log('AHA');
        movePiece(gSelectedElCell, elCell);
        cleanBoard();
        return;
    }


    cleanBoard();

    elCell.classList.add('selected');
    gSelectedElCell = elCell;

    // console.log('elCell.id: ', elCell.id);
    var cellCoord = getCellCoord(elCell.id);
    var piece = gBoard[cellCoord.i][cellCoord.j];

    var possibleCoords = [];
    switch (piece) {
        case ROOK_BLACK:
        case ROOK_WHITE:
            possibleCoords = getAllPossibleCoordsRook(cellCoord);
            break;
        case BISHOP_BLACK:
        case BISHOP_WHITE:
            possibleCoords = getAllPossibleCoordsBishop(cellCoord);
            break;
        case KNIGHT_BLACK:
        case KNIGHT_WHITE:
            possibleCoords = getAllPossibleCoordsKnight(cellCoord);
            break;
        case PAWN_BLACK:
        case PAWN_WHITE:
            possibleCoords = getAllPossibleCoordsPawn(cellCoord, piece === PAWN_WHITE);
            break;
        case KING_BLACK:
        case KING_WHITE:
            possibleCoords = getAllPossibleCoordsKing(cellCoord);
            break;
        case QUEEN_BLACK:
        case QUEEN_WHITE:
            possibleCoords = getAllPossibleCoordsBishop(cellCoord) && getAllPossibleCoordsRook(cellCoord);
            break;
    }
    markCells(possibleCoords);
}

function movePiece(elFromCell, elToCell) {

    var fromCoord = getCellCoord(elFromCell.id);
    var toCoord = getCellCoord(elToCell.id);

    // update the MODEl
    var piece = gBoard[fromCoord.i][fromCoord.j];
    gBoard[fromCoord.i][fromCoord.j] = '';
    gBoard[toCoord.i][toCoord.j] = piece;
    // update the DOM
    elFromCell.innerText = '';
    elToCell.innerText = piece;

}

function markCells(coords) {
    for (var i = 0; i < coords.length; i++) {
        var coord = coords[i];
        var elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`);
        elCell.classList.add('mark')
    }
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var parts = strCellId.split('-')
    var coord = { i: +parts[1], j: +parts[2] };
    return coord;
}

function cleanBoard() {
    var elTds = document.querySelectorAll('.mark, .selected');
    for (var i = 0; i < elTds.length; i++) {
        elTds[i].classList.remove('mark', 'selected');
    }
}

function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j
}

function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j] === ''
}

function getAllPossibleCoordsKnight(pieceCoord) {
    var res = [];
    var row = pieceCoord.i;
    var col = pieceCoord.j;
    for (var i = row - 2; i <= row + 2; i++) {
        for (var j = col - 2; j <= col + 2; j++) {
            var nextCoord = { i: i, j: j }
            if (i >= 0 && i < 8 && j >= 0 && j < 8 && isEmptyCell(nextCoord) && j != i && j != col && i != row && Math.abs(row - i) != Math.abs(col - j))
                res.push(nextCoord);
        }
    }
    return res;
}

function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    var res = [];

    var diff = (isWhite) ? -1 : 1;
    var nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
    if (isEmptyCell(nextCoord)) res.push(nextCoord);
    else return res;

    if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
        diff *= 2;
        nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
        if (isEmptyCell(nextCoord)) res.push(nextCoord);
    }
    return res;
}


function getAllPossibleCoordsKing(pieceCoord) {
    var res = [];
    var row = pieceCoord.i;
    var col = pieceCoord.j;
    for (var i = row - 1; i <= row + 1; i++) {
        for (var j = col - 1; j <= col + 1; j++) {
            var nextCoord = { i: i, j: j }
            if (i >= 0 && i < 8 && j >= 0 && j < 8 && isEmptyCell(nextCoord))
                res.push(nextCoord);
        }
    }
    return res;
}


function getAllPossibleCoordsRook(pieceCoord) {

    var col = pieceCoord.j + 1;
    var nextCoord = { i: pieceCoord.i, j: col };
    while (col < 8 && isEmptyCell(nextCoord)) {
        res.push(nextCoord);
        col++;
        var nextCoord = { i: pieceCoord.i, j: col };
    }
    var col = pieceCoord.j - 1;
    var nextCoord = { i: pieceCoord.i, j: col };
    while (col >= 0 && isEmptyCell(nextCoord)) {
        res.push(nextCoord);
        col--;
        var nextCoord = { i: pieceCoord.i, j: col };
    }
    var row = pieceCoord.i - 1;
    var nextCoord = { i: row, j: pieceCoord.j };
    while (row >= 0 && isEmptyCell(nextCoord)) {
        res.push(nextCoord);
        row--;
        var nextCoord = { i: row, j: pieceCoord.j };
    }
    var row = pieceCoord.i;
    row++;
    var nextCoord = { i: row, j: pieceCoord.j };
    while (row < 8 && isEmptyCell(nextCoord)) {
        res.push(nextCoord);
        row++;
        var nextCoord = { i: row, j: pieceCoord.j };
    }
    return res;
}

function getAllPossibleCoordsBishop(pieceCoord) {

    var i = Math.abs(pieceCoord.i - 1);
    for (var idx = pieceCoord.j + 1; i >= 0 && idx >= 0; idx++) {
        var coord = { i: i--, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    var i = pieceCoord.i + 1;
    for (var idx = pieceCoord.j - 1; i < 8 && idx < 8; idx--) {
        var coord = { i: i++, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    var j = pieceCoord.j + 1;
    for (var idx = pieceCoord.i + 1; j < 8 && idx < 8; idx++) {
        var coord = { i: idx, j: j++ };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    var j = Math.abs(pieceCoord.j - 1);
    for (var idx = pieceCoord.i - 1; j >= 0 && idx >= 0; idx--) {
        var coord = { i: idx, j: j-- };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }

    return res;
}


