'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
//  To play Minesweeper, we will create instances of MineSweeperGame
//  in command line.
//  For example:
//  In the command line, navigate to the lib directory and run `node`
//  Run `.load game.js` to load the contents of this file.
//  Then create a Game instance and run commands like so:
//  let game = new Game(3, 3, 3);
//  game.playMove(0, 1);
//  game.playMove(1, 2);
//  When done run `.exit`

// import Board module from board.js


var _board = require('./board');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
*  The Game class handles a players moves and generates game boards
*  @class Game
*/
var Game = function () {
  /**
  * Game class constructor
  * @method  constructor
  * @param number numberOfRows
  * @param number numberOfColumns
  * @param number numberOfBombs
  * Creates new board instance
  */
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new _board.Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  /**
  * @method  playMove
  * @param number rowIndex
  * @param number columnIndex
  * Takes in the position of a player chosen tile
  * @return console.log of board
  */


  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this._board.flipTile(rowIndex, columnIndex);
      // Checks if the tile the user has chosen has a bomb on it
      if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
        console.log('This game is over!');
        this._board.print(this._board.playerBoard);
        // Checks if there are any more unflipped tiles
      } else if (this._board.hasSafeTiles() === false) {
        console.log('Congratulations!  You\'ve won');
        // Returns updated Board
      } else {
        console.log('Current Board:');
        this._board.print(this._board.playerBoard);
      }
    }
  }]);

  return Game;
}();

;
