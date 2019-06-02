var gPacman;
const PACMAN = '&#9786;';
IsRegularPac = true;



function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  console.log("packmen location: ", gPacman.location)
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;
  if (nextCell === Charries) updateScore(15);
  // Hitting FOOD? update score
  if (nextCell === FOOD || SUPER_FOOD) updateScore(1);
  if (nextCell === SUPER_FOOD) eatSuperFood();

  if (isWin()) {
    winDisplay();
    return;
  }

  else if (nextCell === GHOST && IsRegularPac) {
    gameOver()
    renderCell(gPacman.location, EMPTY);
    return;
  }
  else if (nextCell === GHOST && !IsRegularPac) {
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    renderCell(gPacman.location, EMPTY);
    gPacman.location = nextLocation;
    renderCell(gPacman.location, PACMAN);
    removeGhost();
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function eatSuperFood() {
  IsRegularPac = false;
  ghostsChangeColor();

  setTimeout(function () {
    IsRegularPac = true
  }, 5000);

  setTimeout(bringGhost, 8000);

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }

  return nextLocation;
}