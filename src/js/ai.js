var compMove;

var randomNumber = function () {
  return Math.floor(Math.random() * 10);
};

var ai = function() {

  var move;

  do {
    compMove = randomNumber();
    // console.log(compMove);
  }
  while (arrPlayedMoves[compMove] !== 'nobody');

  return move;
};

compMove = ai();

// console.log('from AI');
