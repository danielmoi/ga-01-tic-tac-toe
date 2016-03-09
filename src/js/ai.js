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
  console.log(move);

  return move;
};

var ai = function() {

  if (compBrain === 0) {
    var move = randomMove();

    return move;
  }

  if (compBrain === 1) {
    arrWinningCombos.forEach(function(element) {
      console.log(element);
      // C-C-n
      if (arrPlayedMoves[element[0]] === arrPlayedMoves[element[1]] && arrPlayedMoves[element[1]] === 'Computer' && arrPlayedMoves[element[2]] === 'nobody') {
        console.log('C-C-n');
        return element[2];
      }

      // C-n-C
      else if (arrPlayedMoves[element[0]] === arrPlayedMoves[element[2]] && arrPlayedMoves[element[2]] === 'Computer' && arrPlayedMoves[element[1]] === 'nobody') {
        console.log('C-n-C');
        return element[1];
      }

      // n-C-C
      else if (arrPlayedMoves[element[1]] === arrPlayedMoves[element[2]] && arrPlayedMoves[element[2]] === 'Computer' && arrPlayedMoves[element[0]] === 'nobody') {
        console.log('n-C-C');
        return element[0];
      }

      else {

        console.log('else');
        return randomMove();
      }


    });


  }


};
