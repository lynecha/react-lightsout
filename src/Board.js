import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game  ==> .45
 * 
 * RNG 1-100 
 * convert changelightstartson into a number => 45 
 * any cells with a value less than <45 is on anything bigger than 45 is off
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // TODO: create array-of-arrays of true/false values
    let initialBoard = [];

    for (let i = 0; i < nrows; i++) {
      let currRow = [];
      for (let j = 0; j < ncols; j++) {
        let val = RNG();
        if (val < chanceLightStartsOn * 100) {
          currRow.push(true);
        }
        else {
          currRow.push(false);
        }
      }
      initialBoard.push(currRow);
    }

    return initialBoard;
  }

 

  

  function createReactBoard() {
    const initialBoard = board;
    console.log("initial board",initialBoard)
    const reactBoard = initialBoard.map((rows, rIdx) => <tr key={rIdx}>{
      rows.map((cell, cIdx) =>
       {
        let coord = `${rIdx}-${cIdx}`;
        return <Cell key={coord} flipCellsAroundMe={() => flipCellsAround(coord)} isLit={cell} />})}</tr>);
    console.log("what is reactboard",reactBoard);
    return reactBoard;
  }


  // const reactBoard = initialBoard.map((rows, rIdx) => <trow>{
  // rows.map((cell, cIdx) =>
  //   <Cell flipCellsAroundMe={flipCellsAround(`${rIdx}-${cIdx}`)} isLit={cell} />)}</trow>);

  function RNG() {
    return Math.floor(Math.random() * 100) + 1;
  }



  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  return (
    <table>
      <tbody>
      {createReactBoard()}
      </tbody>
      
    </table>
    )


  // TODO
}

export default Board;
