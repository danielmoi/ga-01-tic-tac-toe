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
  // debugger;

  if (compBrain === 0) {
    var move = randomMove();

    return move;
  }

  if (compBrain === 1) {
    var move2;
    console.log('move2: ');


    jQuery.each(arrWinningCombos, function(key, value) {


      if (move2) {
        return false;
      }

      console.log(value);
      // C-C-n
      if (arrPlayedMoves[value[0]] === arrPlayedMoves[value[1]] && arrPlayedMoves[value[1]] === 'Computer' && arrPlayedMoves[value[2]] === 'nobody') {
        console.log('C-C-n');
        move2 = value[2];
        return false;
      }

      // C-n-C
      else if (arrPlayedMoves[value[0]] === arrPlayedMoves[value[2]] && arrPlayedMoves[value[2]] === 'Computer' && arrPlayedMoves[value[1]] === 'nobody') {
        console.log('C-n-C');
        move2 = value[1];
        return false;
      }

      // n-C-C
      else if (arrPlayedMoves[value[1]] === arrPlayedMoves[value[2]] && arrPlayedMoves[value[2]] === 'Computer' && arrPlayedMoves[value[0]] === 'nobody') {
        console.log('n-C-C');
        move2 = value[0];
        return false;
      } else {

        console.log('else');
        if (move2) {
          return false;
        } else {
          move2 = randomMove();
          // return false;

        }
        // return false;
      }

    });

    return move2;
  }
};

// Block 2-in-a-row for Player 1
var ai2 = function() {

  // P-P-n
  if (arrPlayedMoves[element[0]] === arrPlayedMoves[element[1]] && arrPlayedMoves[element[1]] === 'Player 1' && arrPlayedMoves[element[2]] === 'nobody') {
    return element[2];
  }

  // P-n-P
  if (arrPlayedMoves[element[0]] === arrPlayedMoves[element[2]] && arrPlayedMoves[element[2]] === 'Player 1' && arrPlayedMoves[element[1]] === 'nobody') {
    return element[1];
  }

  // n-P-P
  if (arrPlayedMoves[element[1]] === arrPlayedMoves[element[2]] && arrPlayedMoves[element[2]] === 'Player 1' && arrPlayedMoves[element[0]] === 'nobody') {
    return element[0];
  }

};
