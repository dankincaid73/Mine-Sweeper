/**
* The Game class handles a players moves and generates game boards
* @class Game
*/
class Game {
  /**
  * Game class constructor
  * @method  constructor
  * @param number numberOfRows
  * @param number numberOfColumns
  * @param number numberOfBombs
  * Creates new board instance
  */
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  /**
  * Game class constructor
  * @method  playMove
  * @param number rowIndex
  * @param number columnIndex
  * Takes in the position of a player chosen tile
  * @return console.log of board
  */
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    // Checks if the tile the user has chosen has a bomb on it
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('This game is over!');
      this._board.print(this._board.playerBoard);
      this._board.print(this._board._bombBoard);
    // Checks if there are any more unflipped tiles
    } else if (this._board.hasSafeTiles() === false) {
      console.log('Congratulations!  You\'ve won');
    // Returns updated Board
    } else {
      console.log('Current Board:');
      this._board.print(this._board.playerBoard);
      this._board.print(this._board._bombBoard);
    }
  }
};

/**
* The Board class includes all properties and methods for creating
* and updating a Mine Sweeper game board
* @class Board
*/
class Board {
  /**
  * Board class constructor
  * @method  constructor
  * @param number numberOfRows
  * @param number numberOfColumns
  * @param number numberOfBombs
  * Generates player and bomb board
  */
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = (numberOfRows * numberOfColumns);
    this._playerBoard = Board.generatePlayerBoard(numberOfRows,
      numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows,
      numberOfColumns, numberOfBombs);
  }

  get playerBoard () {
    return this._playerBoard;
  }

  flipTile (rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] =
      this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs (rowIndex, columnIndex)  {
    this.neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];

    this.numberOfRows = this._bombBoard.length;
    this.numberOfColumns = this._bombBoard[0].length;
    this.numberOfBombs = 0;

    this.neighborOffsets.forEach(offset => {
        this.neighborRowIndex = rowIndex + offset[0];
        this.neighborColumnIndex = columnIndex + offset[1];
        if (this.neighborRowIndex >= 0 && this.neighborRowIndex <=
        this.numberOfRows && this.neighborColumnIndex >= 0 &&
        this.neighborColumnIndex <= this.numberOfColumns) {
          if (this._bombBoard[this.neighborRowIndex][this.neighborColumnIndex]
           === 'B') {
            this.numberOfBombs++;
          }
        }
    });
    return this.numberOfBombs;
  }

  hasSafeTiles(numberOfTiles, numberOfBombs) {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  print(board) {
    console.log(board.map(row => row.join(' | ')).join('\n'));
  }


  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];

    for (let rows = 0; rows < numberOfRows; rows++){
      let row = [];

      for (let columns = 0; columns < numberOfColumns; columns++){
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];

    for (let rows = 0; rows < numberOfRows; rows++){
      let row = [];

      for (let columns = 0; columns < numberOfColumns; columns++){
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;

    while(numberOfBombsPlaced < numberOfBombs){
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }
};

let g = new Game(3, 3, 3);

g.playMove(0, 1);
