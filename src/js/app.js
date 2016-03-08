$(document).ready(function() {
  startGame();
});

var startGame = function() {
  updateInstructions();
  updateTiles();
  $('.control').hide();
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
  displayMessage('Current player: ' + currentPlayer);
};

var updateTiles = function() {
  $('.player1-tile').text(players.player1.tile);

  $('.player2-tile').text(players.player2.tile);
  console.log('tiles updated');


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
  jQuery.each(arrWinningCombos, function(key, value) {
    // console.log(arrPlayedMoves[element[0]], arrPlayedMoves[element[1]], arrPlayedMoves[element[2]]);
    if (arrPlayedMoves[value[0]] !== 'nobody' && arrPlayedMoves[value[0]] === arrPlayedMoves[value[1]] && arrPlayedMoves[value[1]] === arrPlayedMoves[value[2]]) {
      gameOver(currentPlayerObject, 'win', value);
      return false;
    }

    if (arrPlayedMoves.indexOf('nobody') === -1) {
      gameOver(currentPlayerObject, 'tie');
      return false;
    }
  });
};

var gameOver = function(currentPlayerObject, result, winningCombo) {
  $('.reset-button').addClass('reset-action');
  gameActive = false;

  if (result === 'win') {
    console.log('Winner: ' + currentPlayerObject.name);

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
// var gameOver = function(currentPlayerObject, result, winningCombo) {
//   $('.reset-button').addClass('reset-action');
//   gameActive = false;
//
//   if (result === 'win') {
//     console.log('Winner: ' + currentPlayerObject.name);
//     for (var i = 0; i < arrPlayedMoves.length; i++) {
//       if (arrPlayedMoves[i] === currentPlayerObject.name) {
//         for (var j = 0; j < winningCombo.length; j++) {
//           $('#' + winningCombo[j] + '> .marker').addClass('tile-win');
//         }
//       }
//     }
//     displayMessage(currentPlayerObject.name + ' wins!');
//     console.log('WIN!');
//   } else {
//     console.log('TIE!');
//     displayMessage('It\'s a tie!');
//
//   }
// };

var displayMessage = function(str) {
  $('.message').text(str);
};

// Reset
var reset = function() {

  // allow game to play
  gameActive = true;

  // reset text on screen
  $('.marker').text('');
  $('.marker').removeClass('tile-win');
  $('.message').text('');

  // reset array
  for (var i = 0; i < arrPlayedMoves.length; i++) {
    arrPlayedMoves[i] = 'nobody';
  }

  // reset instructions
  updateInstructions();
};

// USER INTERFACE

// Game Play
$(document).on('click', '.square', function() {
  // console.log($(this)[0].id);
  var id = parseInt($(this)[0].id);
  play(id);
});

// Game Reset
$('.reset-button').on('click', function() {
  reset();
  $('.console').show();
  $('.control').hide();
});

// Console Nav Pills
$('.players1').on('click', function() {
  $('.players1').addClass('active');
  $('.players2').removeClass('active');
});

$('.players2').on('click', function() {
  $('.players2').addClass('active');
  $('.players1').removeClass('active');
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

// Console Play
$('.start-button').on('click', function() {
  $('.console').hide();
  $('.reset-button').removeClass('reset-action');
  $('.control').show();

});
