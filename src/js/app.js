$(document).on('click', '.square', function() {
  console.log($(this)[0].id);
  var id = parseInt($(this)[0].id);
  play(id);
  checkWin();
});

var gameStarted;

var arrPlayer = [];

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
  arrPlayer.push(id);
  arrPlayer.sort();
  console.log(arrPlayer);
};

var checkWin = function() {
  arrWinningCombos.forEach(function(element) {
    // console.log(element.join('') === arrPlayer.join(''));
    if (element.join('') === arrPlayer.join('')) {
      console.log('win');
    }
  });
};
