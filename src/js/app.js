///////////////////////////////////////////////////////////////////////////////

// TIC TAC TOE

// by Daniel Moi 2016

///////////////////////////////////////////////////////////////////////////////

// Variables - Game States
var gameActive = true;
var gameMode = 'pairs';
var compThink = false;

var compBrain = 'brainsVal0';

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

var winResult = false;

var currentPlayer = players.player1.name;

// Variables – Game Logic
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

///////////////////////////////////////////////////////////////////////////////

// Functions - Render Screen
var updateInstructions = function() {
  displayMessage('Current player: ' + currentPlayer);
};

var updateTiles = function() {
  $('.player1-tile').text(players.player1.tile);
  $('.player2-tile').text(players.player2.tile);
};

var displayMessage = function(str) {
  $('.message').text(str);
};

var drawMarker = function(move) {
  if (currentPlayer === 'Player 1') {
    $('#' + move + '> .marker').text(players.player1.tile);
  } else {
    $('#' + move + '> .marker').text(players.player2.tile);
  }
};

///////////////////////////////////////////////////////////////////////////////

// Functions - Game Logic

var getCurrentPlayerObject = function() {
  if (currentPlayer === 'Player 1') {
    return players.player1;
  } else {
    return players.player2;
  }
};

var play = function(move) {
  if (gameActive && available(move)) {

    var currentPlayerObject = getCurrentPlayerObject();

    arrPlayedMoves[move] = currentPlayerObject.name;

    checkWin(currentPlayerObject);
    drawMarker(move);

    if (gameActive) {
      currentPlayer = switchTurn(currentPlayerObject);
      console.log(currentPlayer);
      updateInstructions();
    }
    if (currentPlayer === 'Computer') {
      compThink = true;

      compMove = ai();

      var delayMove = function() {
        play(compMove);
        compThink = false;

      };
      timerID = setTimeout(delayMove, 900);
    }
  }
};

var available = function(move) {
  if (arrPlayedMoves[move] !== 'nobody') {
    return false;
  } else {
    return true;
  }
};

var switchTurn = function(obj) {
  if (currentPlayer === players.player1.name) {
    return players.player2.name;
  } else {
    return players.player1.name;
  }
};

var checkWin = function(currentPlayerObject) {
  jQuery.each(arrWinningCombos, function(key, value) {

    // WIN
    if (arrPlayedMoves[value[0]] !== 'nobody' && arrPlayedMoves[value[0]] === arrPlayedMoves[value[1]] && arrPlayedMoves[value[1]] === arrPlayedMoves[value[2]]) {
      winResult = true;
      gameOver(currentPlayerObject, 'win', value);
      return false;
    }



  });

  // TIE
  // Place this outside each loop
  if (arrPlayedMoves.indexOf('nobody') === -1 && winResult === false) {
    console.log(arrPlayedMoves);
    gameOver(currentPlayerObject, 'tie');
    return false;
  }
};

///////////////////////////////////////////////////////////////////////////////

// Functions - End Game
var gameOver = function(currentPlayerObject, result, winningCombo) {
  $('.reset-button').addClass('reset-action');
  gameActive = false;

  if (result === 'win') {
    console.log('Winner: ' + currentPlayerObject.name);

    // use arrWinningCombos to restrict number of tiles highlighted
    for (var j = 0; j < winningCombo.length; j++) {
      $('#' + winningCombo[j] + '> .marker').addClass('tile-win');
    }
    displayMessage(currentPlayerObject.name + ' wins!');
    console.log('WIN!');
  } else {
    console.log('TIE!');
    displayMessage('It\'s a tie!');
  }
};


// Reset
var reset = function() {

  // allow game to play
  gameActive = true;

  // reset winResult
  winResult = false;

  // reset currentPlayer to be player 1
  currentPlayer = players.player1.name;

  // reset text on screen
  $('.marker').text('');
  $('.marker').removeClass('tile-win');
  $('.message').text('');

  // reset array
  for (var i = 0; i <= 8; i++) {
    arrPlayedMoves[i] = 'nobody';
  }

  // reset instructions
  updateInstructions();
};

///////////////////////////////////////////////////////////////////////////////

// USER INTERFACE

// Game Play
$(document).on('click', '.square', function() {
  if (compThink === false) {
    var move = parseInt($(this)[0].id);
    play(move);
  }
});

// Game Reset
$('.reset-button').on('click', function() {
  reset();
  $('.console').show();
  $('.control').hide();
});

// Console Nav Pills
$('.solo-tab').on('click', function() {
  $('.solo-tab').addClass('solo-bkg');
  $('.pairs-tab').removeClass('pairs-bkg');

  $('.solo-options').show();
  $('.pairs-options').hide();
  $('.mode-options').addClass('solo-border');
  $('.mode-options').removeClass('pairs-border');

  players.player2.name = 'Computer';
});

$('.pairs-tab').on('click', function() {
  $('.pairs-tab').addClass('pairs-bkg');
  $('.solo-tab').removeClass('solo-bkg');

  $('.pairs-options').show();
  $('.solo-options').hide();
  $('.mode-options').addClass('pairs-border');
  $('.mode-options').removeClass('solo-border');

  players.player2.name = 'Player 2';
});

// Console switch
$('.switch').on('click', function() {
  if (players.player1.tile === 'X') {
    players.player1.tile = 'O';
    players.player2.tile = 'X';
  } else {
    players.player1.tile = 'X';
    players.player2.tile = 'O';
  }
  updateTiles();

});

// Radio change
$('.brains-container').on('change', function() {
  compBrain = $('input[name="brainsGroup"]:checked').val();
  console.log(compBrain);
});

// Console Play
$('.start-button').on('click', function() {
  $('.console').hide();
  $('.reset-button').removeClass('reset-action');
  $('.control').show();

  console.log(players.player1.name, players.player2.name);
});

///////////////////////////////////////////////////////////////////////////////

// INITIATE GAME
$(document).ready(function() {
  startGame();
});

var startGame = function() {
  updateInstructions();
  updateTiles();
  $('.control').hide();
};
