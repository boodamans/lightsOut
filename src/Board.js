import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      let newRow = [];
      for (let j = 0; j < ncols; j++) {
        if (Math.random() > chanceLightStartsOn) {
          newRow.push(true);
        } else {
          newRow.push(false);
        }
      }
      initialBoard.push(newRow);
    }
    return initialBoard;
  }

  // Handle cell clicks (flipping cells)
  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);
  
      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
  
      const boardCopy = JSON.parse(JSON.stringify(oldBoard)); // Create a deep copy
  
      // Flip the selected cell and cells around it
      flipCell(y, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
  
      return boardCopy;
    });
  }
  

  // Check for a win condition whenever the board changes
  useEffect(() => {
    function checkWin() {
      for (let i = 0; i < nrows; i++) {
        for (let j = 0; j < ncols; j++) {
          if (board[i][j]) {
            return false; // If any cell is turned on, the player hasn't won yet.
          }
        }
      }
      // If all cells are turned off, the player has won.
      return true;
    }
  
    if (checkWin()) {
      alert("Congratulations! You've won!");
    }
  }, [board, nrows, ncols]);

  // Render the game board
  return (
    <table className="Board">
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                flipCellsAroundMe={() => flipCellsAround(`${rowIndex}-${colIndex}`)}
                isLit={cell}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
