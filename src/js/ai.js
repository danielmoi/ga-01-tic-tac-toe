var compMove;

var randomNumber = function() {
  return Math.floor(Math.random() * 10);
};

var randomMove = function() {
  var move;

  do {
    move = randomNumber();
    // console.log(compMove);
  }
  while (arrPlayedMoves[move] !== 'nobody');
  console.log('move: ' + move);
  return move;
};


var ai = function() {
  var move;

  for (var i = 0; i < arrWinningCombos.length; i++) {
    // console.log(arrWinningCombos[i]);

    // PLAY TO WIN
    if (compBrain === 'brainsVal2') {

      // C-C-n
      if (arrPlayedMoves[arrWinningCombos[i][0]] === arrPlayedMoves[arrWinningCombos[i][1]] && arrPlayedMoves[arrWinningCombos[i][1]] === 'Computer' && arrPlayedMoves[arrWinningCombos[i][2]] === 'nobody') {
        console.log('C-C-n');
        move = arrWinningCombos[i][2];
        return move;
      }

      // C-n-C
      if (arrPlayedMoves[arrWinningCombos[i][0]] === arrPlayedMoves[arrWinningCombos[i][2]] && arrPlayedMoves[arrWinningCombos[i][2]] === 'Computer' && arrPlayedMoves[arrWinningCombos[i][1]] === 'nobody') {
        console.log('C-n-C');
        move = arrWinningCombos[i][1];
        return move;
      }

      // n-C-C
      if (arrPlayedMoves[arrWinningCombos[i][1]] === arrPlayedMoves[arrWinningCombos[i][2]] && arrPlayedMoves[arrWinningCombos[i][2]] === 'Computer' && arrPlayedMoves[arrWinningCombos[i][0]] === 'nobody') {
        console.log('n-C-C');
        move = arrWinningCombos[i][0];
        return move;
      }
    }

    // STOP WIN
    if (compBrain === 'brainsVal2' || compBrain === 'brainsVal1') {

      // P-P-n
      if (arrPlayedMoves[arrWinningCombos[i][0]] === arrPlayedMoves[arrWinningCombos[i][1]] && arrPlayedMoves[arrWinningCombos[i][1]] === 'Player 1' && arrPlayedMoves[arrWinningCombos[i][2]] === 'nobody') {
        console.log('P-P-n');
        move = arrWinningCombos[i][2];
        return move;
      }

      // P-n-P
      if (arrPlayedMoves[arrWinningCombos[i][0]] === arrPlayedMoves[arrWinningCombos[i][2]] && arrPlayedMoves[arrWinningCombos[i][2]] === 'Player 1' && arrPlayedMoves[arrWinningCombos[i][1]] === 'nobody') {
        console.log('P-P-n');
        move = arrWinningCombos[i][1];
        return move;
      }

      // n-P-P
      if (arrPlayedMoves[arrWinningCombos[i][1]] === arrPlayedMoves[arrWinningCombos[i][2]] && arrPlayedMoves[arrWinningCombos[i][2]] === 'Player 1' && arrPlayedMoves[arrWinningCombos[i][0]] === 'nobody') {
        console.log('n-P-P');
        move = arrWinningCombos[i][0];
        return move;
      }
    }

  } // end FOR LOOP

  // Default code must be outside of loop!!

  // if (compBrain === 2 || compBrain === 1 || compBrain === 0)
  move = randomMove();
  return move;

};
