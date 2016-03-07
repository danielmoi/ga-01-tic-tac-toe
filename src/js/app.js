$(document).ready(function () {
  startGame();
});

var startGame = function() {
  updateDisplay();
};

$(document).on('click', '.square', function() {
  console.log($(this)[0].id);
  var id = parseInt($(this)[0].id);
  play(id);
  drawMarker(id);
  checkWin();
});

var gameStarted;

var arrPlayer = [];

var players = {
  player1: {
    name: 'Player 1',
    tile: 'X'
  },
  player2: {
    name: 'Player 2',
    tile: 'O'
  }
};
var currentPlayer = players.player1.name;

var arrWinningCombos = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // diagonals
  [0, 4, 8],
  [2, 4, 6]
];

var play = function(id) {
  arrPlayer.push(id);
  arrPlayer.sort();
  console.log(arrPlayer);
  currentPlayer = switchTurn();
  console.log(currentPlayer);
  updateDisplay();
};

var drawMarker = function(id) {
  if (currentPlayer === 'Player 1') {
    $('#'+id).text(players.player1.tile);
  }
  else {
    $('#'+id).text(players.player2.tile);
  }
};

var switchTurn = function() {
  if (currentPlayer === 'Player 1') {
    return 'Player 2';
  }
  else {
    return 'Player 1';
  }
};

var updateDisplay = function() {
  $('.current-player').text(currentPlayer);
};

var checkWin = function() {
  arrWinningCombos.forEach(function(element) {
    // console.log(element.join('') === arrPlayer.join(''));
    if (element.join('') === arrPlayer.join('')) {
      console.log('win');
    }
  });
};
