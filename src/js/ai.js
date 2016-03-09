var compMove;

var randomNumber = function() {
  return Math.floor(Math.random() * 10);
};

var ai = function() {

  if (compBrain === 0) {

    var move;

    do {
      move = randomNumber();
      // console.log(compMove);
    }
    while (arrPlayedMoves[move] !== 'nobody');
    console.log(move);

    return move;
  }


};
