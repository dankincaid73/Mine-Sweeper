'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* The Board class includes all properties and methods for creating
* and updating a Mine Sweeper game board
* @class Board
* export as module
*/
var Board = exports.Board = function () {
  /**
  * Board class constructor
  * @method  constructor
  * @param number numberOfRows
  * @param number numberOfColumns
  * @param number numberOfBombs
  * Generates player and bomb board
  */
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  /**
  * @method  playerBoard
  * @return _playerBoard
  */


  _createClass(Board, [{
    key: 'flipTile',


    /**
    * @method  flipTile
    * @param number rowIndex
    * @param number columnIndex
    * @return this._numberOfTiles
    * Takes in position of players move
    */
    value: function flipTile(rowIndex, columnIndex) {
      // checks to see if player move has already been made
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
        // checks to see if player move has landed on a bomb
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
        // if not, the move is made
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    }

    /**
    * @method  getNumberOfNeighborBombs
    * @param number rowIndex
    * @param number columnIndex
    * @return numberOfBombs
    * Counts number of bombs within one move of players move
    */

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      // set up move offsets could be improved by making it dynamic
      this.neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

      this.numberOfRows = this._bombBoard.length;
      this.numberOfColumns = this._bombBoard[0].length;
      this.numberOfBombs = 0;

      // checks to see if there are bombs within one move of
      // players move
      this.neighborOffsets.forEach(function (offset) {
        _this.neighborRowIndex = rowIndex + offset[0];
        _this.neighborColumnIndex = columnIndex + offset[1];
        // if there is a bomb within 1 move, numberOfBombs is incrementeed
        if (_this.neighborRowIndex >= 0 && _this.neighborRowIndex <= _this.numberOfRows && _this.neighborColumnIndex >= 0 && _this.neighborColumnIndex <= _this.numberOfColumns) {
          if (_this._bombBoard[_this.neighborRowIndex][_this.neighborColumnIndex] === 'B') {
            _this.numberOfBombs++;
          }
        }
      });
      return this.numberOfBombs;
    }

    /**
    * @method  hasSafeTiles
    * @param number numberOfTiles
    * @param number numberOfBombs
    * @return number of safe tiles remaining
    */

  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles(numberOfTiles, numberOfBombs) {
      return this._numberOfTiles !== this._numberOfBombs;
    }

    /**
    * @method  print
    * @param array board
    * @return formats and prints board array to the console
    */

  }, {
    key: 'print',
    value: function print(board) {
      console.log(board.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }

    /**
    * @method  generatePlayerBoard
    * @param number numberOfRows
    * @param number numberOfColumns
    * @return player board array
    * Takes in users parameters and creates a player board
    * array according to the number of rows and columns the
    * user has specified
    */

  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];

      for (var rows = 0; rows < numberOfRows; rows++) {
        var row = [];

        for (var columns = 0; columns < numberOfColumns; columns++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }

    /**
    * @method  generateBombBoard
    * @param number numberOfRows
    * @param number numberOfColumns
    * @param number numberOfBombs
    * @return bomb board array
    * Takes in users parameters and creates a bomb board
    * array according to the number of rows, columns, and
    * bombs the user has specified
    * Bombs are randomly placed
    */

  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];

      for (var rows = 0; rows < numberOfRows; rows++) {
        var row = [];

        for (var columns = 0; columns < numberOfColumns; columns++) {
          row.push(null);
        }
        board.push(row);
      }

      var numberOfBombsPlaced = 0;

      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }]);

  return Board;
}();

;