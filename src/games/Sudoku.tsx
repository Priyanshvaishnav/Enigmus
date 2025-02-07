import React, { useState, useEffect } from 'react';

const Sudoku: React.FC = () => {
  const [board, setBoard] = useState<number[][]>(Array(9).fill(null).map(() => Array(9).fill(0)));
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [initialBoard, setInitialBoard] = useState<boolean[][]>(Array(9).fill(null).map(() => Array(9).fill(false)));

  useEffect(() => {
    generatePuzzle();
  }, []);

  const generatePuzzle = () => {
    // Create a solved Sudoku board
    const solvedBoard = Array(9).fill(null).map(() => Array(9).fill(0));
    fillBoard(solvedBoard);

    // Create the puzzle by removing some numbers
    const newBoard = solvedBoard.map(row => [...row]);
    const newInitialBoard = Array(9).fill(null).map(() => Array(9).fill(true));
    
    // Remove numbers to create the puzzle (adjust difficulty by changing the number of cells to remove)
    let cellsToRemove = 40; // Medium difficulty
    while (cellsToRemove > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (newBoard[row][col] !== 0) {
        newBoard[row][col] = 0;
        newInitialBoard[row][col] = false;
        cellsToRemove--;
      }
    }

    setBoard(newBoard);
    setInitialBoard(newInitialBoard);
  };

  const fillBoard = (board: number[][]) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          // Shuffle numbers for randomization
          const shuffled = [...numbers].sort(() => Math.random() - 0.5);
          for (const num of shuffled) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (fillBoard(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }

    return true;
  };

  const handleCellClick = (row: number, col: number) => {
    if (!initialBoard[row][col]) {
      setSelected([row, col]);
    }
  };

  const handleNumberInput = (number: number) => {
    if (selected) {
      const [row, col] = selected;
      if (!initialBoard[row][col]) {
        const newBoard = [...board];
        newBoard[row][col] = number;
        setBoard(newBoard);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (selected && !initialBoard[selected[0]][selected[1]]) {
      const num = parseInt(event.key);
      if (num >= 1 && num <= 9) {
        handleNumberInput(num);
      } else if (event.key === 'Backspace' || event.key === 'Delete') {
        handleNumberInput(0);
      }
    }
  };

  return (
    <div className="flex flex-col items-center" onKeyDown={handleKeyPress} tabIndex={0}>
      <h2 className="text-2xl font-bold mb-6">Sudoku</h2>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-9 gap-1">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`w-10 h-10 flex items-center justify-center border ${
                  selected?.[0] === rowIndex && selected?.[1] === colIndex
                    ? 'bg-purple-100 border-purple-500'
                    : initialBoard[rowIndex][colIndex]
                    ? 'bg-gray-100 border-gray-300'
                    : 'border-gray-300'
                } ${
                  (rowIndex + 1) % 3 === 0 && rowIndex < 8 ? 'border-b-2 border-b-gray-400' : ''
                } ${
                  (colIndex + 1) % 3 === 0 && colIndex < 8 ? 'border-r-2 border-r-gray-400' : ''
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell !== 0 && cell}
              </button>
            ))
          )}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-9 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            className="w-10 h-10 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            onClick={() => handleNumberInput(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Click a cell and use number keys or buttons below to fill in numbers
      </div>
      <button
        onClick={generatePuzzle}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        New Game
      </button>
    </div>
  );
};

export default Sudoku;