/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.addNextRook = function(board) {
  var matrix = board.rows();
  var resultBoard;
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][j] = 1;
        resultBoard = new Board(matrix);
        var stillValid = !(resultBoard.hasAnyRowConflicts() || resultBoard.hasAnyColConflicts());
        var numPieces = _.reduce(resultBoard, function(memo, row) {
          return memo + _.reduce(row, function(memo, col) {
            return memo + col;
          }, 0);
        }, 0);
        if (stillValid && numPieces < matrix.length) {
          window.addNextRook(resultBoard);
        }
        if (stillValid && numPieces === matrix.length) {
          return resultBoard;
        }
      }
    }
  }
  
  // return resultBoard;
}

window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var matrix = makeEmptyMatrix(n);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
