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



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var emptyMatrix = window.makeEmptyMatrix(n);
  
  // rewrite hasRowConflictAt 
  // var hasRowConflictAt = function(row) {
  //   var sumArray = (elem, sum) => elem + sum;      
  //   return (row.reduce(sumArray) > 1);
  // }
  
  // var hasColConflictAt = function(col) {
  //   var sumArray = (elem, sum) => elem + sum;      
  //   return (col.reduce(sumArray) > 1);
  // }
  
  var hasConflictAt = function(arr) {
    var sumArray = (elem, sum) => elem + sum;      
    return (arr.reduce(sumArray) > 1);
  }

  var checkIfValid = function(matrix) {
    var result = false;
    
    for (var i = 0; i < matrix.length; i++) {
      result = result || hasConflictAt(matrix[i]);
    }
    
    for (var j = 0; j < matrix.length; j++) {
      let col = [];
      let sumArray = (elem, sum) => elem + sum; 
      for (var i = 0; i < matrix.length; i++) {
        col.push(matrix[i][j]);
      }
      result = result || hasConflictAt(col);
    }
    
    return !result;
  }
  
  var findSol = function(matrix) {
    // loop through all spaces
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix.length; j++) {
        // make copy of matrix
        var copyMatrix = matrix.map(function (arr) {
          return arr.slice();
        });
        // place piece if the space is empty
        if (copyMatrix[i][j] === 0) {
          copyMatrix[i][j] = 1;
          // check if copy of matrix still valid, 
          var isValid = checkIfValid(copyMatrix);
          // if it is still valid: 
          if (isValid) {
            // if numPieces === n (aka numGood)
            var numPieces = _.reduce(copyMatrix, function(memo, row) {
              return memo + _.reduce(row, function(memo, col) {
                return memo + col;
              }, 0);
            }, 0);
            if (numPieces === matrix.length) {
              // return the copy of the matrix
              return copyMatrix;
            } else {
              // else result = helper function on the copy of matrix 
              var result = findSol(copyMatrix);
              // if result !== undefined 
              if (result !== undefined) {
                // return the result
                return result;
              }
            }
          }
        }
      // else, no nothing
      }
    }
  }
  
  solution = findSol(emptyMatrix);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1; //fixme
  for (var i = 1; i <= n; i++) {
    solutionCount *= i;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme
  var emptyMatrix = window.makeEmptyMatrix(n);
  var makeEmptyMask = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return true;
      });
    });
  };
  var mask = makeEmptyMask(n);
  
  var hasConflictAt = function(arr) {
    var sumArray = (elem, sum) => elem + sum;      
    return (arr.reduce(sumArray) > 1);
  }

  var checkIfValid = function(matrix) {
    var result = false;
    
    // valid row
    for (var i = 0; i < matrix.length; i++) {
      result = result || hasConflictAt(matrix[i]);
    }
    
    // valid col
    for (var j = 0; j < matrix.length; j++) {
      let col = [];
      // let sumArray = (elem, sum) => elem + sum; 
      for (var i = 0; i < matrix.length; i++) {
        col.push(matrix[i][j]);
      }
      result = result || hasConflictAt(col);
    }
    
    // valid diag
    //  create a diag array storing all diagonals
    for (var k = -matrix.length + 1; k < matrix.length; k++) {
      let majorDiag = [];
      for (var i = 0; i < matrix.length; i++) {
        var el = matrix[i][k+i];
        if (el !== undefined) {
          majorDiag.push(el);
        }
      }
      result = result || hasConflictAt(majorDiag);
    }
    
    for (var k = 0; k < (2 * matrix.length) - 1; k++) {
      let minorDiag = [];
      for (var i = 0; i < matrix.length; i++) {
        var el = matrix[i][k-i];
        if (el !== undefined) {
          minorDiag.push(el);
        }
      }
      result = result || hasConflictAt(minorDiag);
    }    
    
    return !result;
  }
  
  var isDiagonal = function(x1, y1, x2, y2) {
    var xdiff =  x2 - x1 ;
    var ydiff =  y2 - y1;
    if (xdiff === ydiff) {
      return true;
    } else if (xdiff === -ydiff) {
      return true;
    } else {
      return false
    }
  }

  var makeMask = function(x, y, matrix) {
    var copyMatrix = matrix.map(function (arr) {
      return arr.slice();
    });
    
    for (var i = 0; i < copyMatrix.length; i++) {
      for (var j = 0; j < copyMatrix.length; j++) {
        if (i === x || j === y || isDiagonal(i,j,x,y)) {
          copyMatrix[i][j] = false;
        }
      }
    }
    
    return copyMatrix;
  }
  
  var findSol = function(matrix, mask) {
    // loop through all spaces
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix.length; j++) {
        // make copy of matrix
        var copyMatrix = matrix.map(function (arr) {
          return arr.slice();
        });
        var copyMask = mask.map(function (arr) {
          return arr.slice();
        });
        // place piece if the space is empty
        if (copyMatrix[i][j] === 0) {
          copyMatrix[i][j] = 1;
          // check if copy of matrix still valid, 
          var isValid = checkIfValid(copyMatrix);
          // if it is still valid: 
          if (isValid) {
            // if numPieces === n (aka numGood)
            var numPieces = _.reduce(copyMatrix, function(memo, row) {
              return memo + _.reduce(row, function(memo, col) {
                return memo + col;
              }, 0);
            }, 0);
            // if we have a solution
            if (numPieces === matrix.length) {
              // return the copy of the matrix
              return copyMatrix;
            } else {
              // else result = helper function on the copy of matrix 
              var result = findSol(copyMatrix);
              // if result !== undefined 
              if (result !== undefined) {
                // return the result
                return result;
              }
            }
          }
        }
      // else, no nothing
      }
    }
  }
  
  solution = findSol(emptyMatrix);
  solution = solution || emptyMatrix;

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme
  // optimization ideas:
  // for the first piece, we only need to place it in the first half for first row.
  
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
