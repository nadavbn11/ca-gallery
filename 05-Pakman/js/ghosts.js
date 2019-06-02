var GHOST = '&#9781;';

var gIntervalGhosts;
var gGhosts;
var GhustRemoveCounter = 0;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3,
        },
        currCellContent: FOOD,
        color: getRandomColor()
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}


function removeGhost() {
    for (var r = 0; r < gGhosts.length; r++) {
        var cuurGhost = gGhosts[r];
        if (cuurGhost.location.i === gPacman.location.i && cuurGhost.location.j === gPacman.location.j) {
            gGhosts.splice(r, 1);
            GhustRemoveCounter++;
        }
    }
}

function bringGhost() {

    for (var i = 0; i < GhustRemoveCounter; i++) {
        createGhost(gBoard)
    }
    GhustRemoveCounter = 0;
}

function createGhosts(board) {
    gGhosts = [];

    // empty the gGhosts array, create some ghosts
    createGhost(board)
    createGhost(board)
    createGhost(board)
    //  and run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 3000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];

        // Create the moveDiff
        var moveDiff = getMoveDiff();
        var nextLocation = { i: ghost.location.i + moveDiff.i, j: ghost.location.j + moveDiff.j }
        // console.log('ghost.location', ghost.location, 'nextLocation', nextLocation, 'moveDiff', moveDiff)

        // if WALL return
        if (gBoard[nextLocation.i][nextLocation.j] === WALL) return

        // if PACMAN - gameOver, return
        if (gBoard[nextLocation.i][nextLocation.j] === PACMAN) {
            gameOver()
            return
        }

        // set back what we stepped on: update Model, DOM
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        renderCell(ghost.location, ghost.currCellContent)

        // move the ghost
        ghost.location = nextLocation

        // keep the contnet of the cell we are going to
        ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j]

        // move the ghost and update model and dom
        gBoard[ghost.location.i][ghost.location.j] = GHOST
        renderCell(ghost.location, getGhostHTML(ghost))

    }
}
function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100)
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function ghostsChangeColor() {
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = getRandomColor();
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }
}

function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color}" >${GHOST}</span>`
}






