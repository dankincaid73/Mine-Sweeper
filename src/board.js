/**
* The Board class includes all properties and methods for creating
* and updating a Mine Sweeper game board
* @class Board
* export as module
*/
export class Board {
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

  /**
  * @method  playerBoard
  * @return _playerBoard
  */
  get playerBoard () {
    return this._playerBoard;
  }

  /**
  * @method  flipTile
  * @param number rowIndex
  * @param number columnIndex
  * @return this._numberOfTiles
  * Takes in position of players move
  */
  flipTile (rowIndex, columnIndex) {
    // checks to see if player move has already been made
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    // checks to see if player move has landed on a bomb
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    // if not, the move is made
    } else {
      this._playerBoard[rowIndex][columnIndex] =
      this.getNumberOfNeighborBombs(rowIndex, columnIndex);
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
  getNumberOfNeighborBombs (rowIndex, columnIndex)  {
    // set up move offsets could be improved by making it dynamic
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

    // checks to see if there are bombs within one move of
    // players move
    this.neighborOffsets.forEach(offset => {
        this.neighborRowIndex = rowIndex + offset[0];
        this.neighborColumnIndex = columnIndex + offset[1];
        // if there is a bomb within 1 move, numberOfBombs is incrementeed
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

  /**
  * @method  hasSafeTiles
  * @param number numberOfTiles
  * @param number numberOfBombs
  * @return number of safe tiles remaining
  */
  hasSafeTiles(numberOfTiles, numberOfBombs) {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  /**
  * @method  print
  * @param array board
  * @return formats and prints board array to the console
  */
  print(board) {
    console.log(board.map(row => row.join(' | ')).join('\n'));
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
