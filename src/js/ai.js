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

var ai0 = function() {
  var move = randomMove();

  return move;
};

var ai1 = function() {
  var move;
  jQuery.each(arrWinningCombos, function(key, value) {
    if (move) {
      return false;
    }

    // C-C-n
    if (arrPlayedMoves[value[0]] === arrPlayedMoves[value[1]] && arrPlayedMoves[value[1]] === 'Computer' && arrPlayedMoves[value[2]] === 'nobody') {
      console.log('C-C-n');
      move = value[2];
      return false;
    }

    // C-n-C
    else if (arrPlayedMoves[value[0]] === arrPlayedMoves[value[2]] && arrPlayedMoves[value[2]] === 'Computer' && arrPlayedMoves[value[1]] === 'nobody') {
      console.log('C-n-C');
      move = value[1];
      return false;
    }

    // n-C-C
    else if (arrPlayedMoves[value[1]] === arrPlayedMoves[value[2]] && arrPlayedMoves[value[2]] === 'Computer' && arrPlayedMoves[value[0]] === 'nobody') {
      console.log('n-C-C');
      move = value[0];
      return false;
    }
  });

  if (move) {
    return move;
  }
  // no 2-in-a-row
  else {
    console.log('ai1-else');
    move = randomMove();
    // return false;
  }

  return move;
};


// Block 2-in-a-row for Player 1
var ai2 = function() {

  var move;
  jQuery.each(arrWinningCombos, function(key, value) {
    if (move) {
      return false;
    }
    // P-P-n
    if (arrPlayedMoves[value[0]] === arrPlayedMoves[value[1]] && arrPlayedMoves[value[1]] === 'Player 1' && arrPlayedMoves[value[2]] === 'nobody') {
      console.log('P-P-n');
      move = value[2];
      return false;
    }

    // P-n-P
    else if (arrPlayedMoves[value[0]] === arrPlayedMoves[value[2]] && arrPlayedMoves[value[2]] === 'Player 1' && arrPlayedMoves[value[1]] === 'nobody') {
      console.log('P-n-P');
      move = value[1];
      return false;
    }

    // n-P-P
    else if (arrPlayedMoves[value[1]] === arrPlayedMoves[value[2]] && arrPlayedMoves[value[2]] === 'Player 1' && arrPlayedMoves[value[0]] === 'nobody') {
      console.log('n-P-P');
      move = value[0];
      return false;
    }

  });

  if (move) {
    return move;
  }
  // no 2-in-a-row
  else {
    console.log('ai2-else');
    move = randomMove();
    // return false;
  }

  return move;
};

var ai = function() {
  // debugger;
  var move;
  switch (compBrain) {

    case 0:
      move = ai0();
      break;
    case 1:
      move = ai1();
      break;
    case 2:
      move = ai2();
      break;

  }
  return move;
};
