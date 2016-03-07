$(document).ready(function() {
  startGame();
});

var startGame = function() {
  updateInstructions();
};

var gameActive = true;

var players = {
  player1: {
    name: 'Player 1',
    tile: 'X',
  },
  player2: {
    name: 'Player 2',
    tile: 'O',
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

var arrPlayedMoves = ['nobody', 'nobody', 'nobody', 'nobody', 'nobody', 'nobody', 'nobody', 'nobody', 'nobody'];

var updateInstructions = function() {
  $('.current-player').text(currentPlayer);
};

var getCurrentPlayerObject = function() {
  if (currentPlayer === 'Player 1') {
    return players.player1;
  } else {
    return players.player2;
  }
};

var play = function(id) {
  if (gameActive) {
    var currentPlayerObject = getCurrentPlayerObject();

    arrPlayedMoves[id] = currentPlayerObject.name;

    console.log(arrPlayedMoves);
    checkWin(currentPlayerObject);
    drawMarker(id);

    if (gameActive) {
      currentPlayer = switchTurn();
      console.log(currentPlayer);
      updateInstructions();
    }
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


var checkWin = function(currentPlayerObject) {
  arrWinningCombos.forEach(function(element) {
    // console.log(arrPlayedMoves[element[0]], arrPlayedMoves[element[1]], arrPlayedMoves[element[2]]);
    if (arrPlayedMoves[element[0]] !== 'nobody' && arrPlayedMoves[element[0]] === arrPlayedMoves[element[1]] && arrPlayedMoves[element[1]] === arrPlayedMoves[element[2]]) {
      console.log('Winner: ' + currentPlayerObject.name);
      declareWinner(currentPlayerObject.name);
      gameActive = false;
    }
  });
};

var declareWinner = function(name) {
  $('.message').text('Winner: ' + name);
};

// Reset
var reset = function() {

  // allow game to play
  gameActive = true;

  // reset text on screen
  $('.marker').text('');
  $('.message').text('');

  // reset array
  for (var i = 0; i < arrPlayedMoves.length; i++) {
    arrPlayedMoves[i] = 'nobody';
  }

  // reset instructions
  updateInstructions();
};

// USER INTERFACE

$(document).on('click', '.square', function() {
  // console.log($(this)[0].id);
  var id = parseInt($(this)[0].id);
  play(id);
});


$('.reset').on('click', function() {
  reset();
});
