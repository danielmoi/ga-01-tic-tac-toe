$(document).ready(function() {
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
});

var gameActive = true;

var arrPlayer = [];

var players = {
  player1: {
    name: 'Player 1',
    tile: 'X',
    moves: []
  },
  player2: {
    name: 'Player 2',
    tile: 'O',
    moves: []

  }
};
var currentPlayer = players.player1.name;

var getCurrentPlayerObject = function() {
  if (currentPlayer === 'Player 1') {
    return players.player1;
  } else {
    return players.player2;
  }
};


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
  var currentPlayerObject = getCurrentPlayerObject();
  currentPlayerObject.moves.push(id);
  currentPlayerObject.moves.sort();
  console.log(currentPlayerObject.moves);
  checkWin(currentPlayerObject);
  if (gameActive) {
    currentPlayer = switchTurn();
    console.log(currentPlayer);
    updateDisplay();
  }

};

var drawMarker = function(id) {
  if (currentPlayer === 'Player 1') {
    $('#' + id + '> .marker').text(players.player1.tile);
  } else {
    $('#' + id + '> .marker').text(players.player2.tile);
  }
};

var switchTurn = function() {
  if (currentPlayer === 'Player 1') {
    return 'Player 2';
  } else {
    return 'Player 1';
  }
};

var updateDisplay = function() {
  $('.current-player').text(currentPlayer);
};

var declareWinner = function(name) {
  $('.message').text('Winner: ' + name);
};

var checkWin = function(currentPlayerObject) {
  arrWinningCombos.forEach(function(element) {
    // console.log(element.join('') === arrPlayer.join(''));
    if (element.join('') === currentPlayerObject.moves.join('')) {
      console.log('Winner', currentPlayerObject.name);
      gameActive = false;
      declareWinner(currentPlayerObject.name);
    }
  });
};
