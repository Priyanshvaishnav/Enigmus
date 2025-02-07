import React, { useState, useEffect } from 'react';

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

const Minesweeper: React.FC = () => {
  const BOARD_SIZE = 10;
  const MINES_COUNT = 15;

  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    // Create empty board
    const newBoard: Cell[][] = Array(BOARD_SIZE).fill(null).map(() =>
      Array(BOARD_SIZE).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
      }))
    );

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINES_COUNT) {
      const row = Math.floor(Math.random() * BOARD_SIZE);
      const col = Math.floor(Math.random() * BOARD_SIZE);
      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor mines
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (
                row + i >= 0 &&
                row + i < BOARD_SIZE &&
                col + j >= 0 &&
                col + j < BOARD_SIZE &&
                newBoard[row + i][col + j].isMine
              ) {
                count++;
              }
            }
          }
          newBoard[row][col].neighborMines = count;
        }
      }
    }

    setBoard(newBoard);
    setGameOver(false);
    setWon(false);
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || board[row][col].isFlagged || board[row][col].isRevealed) return;

    const newBoard = [...board];
    if (newBoard[row][col].isMine) {
      // Game over
      revealAll(newBoard);
      setGameOver(true);
    } else {
      // Reveal cell and neighbors if empty
      revealCell(newBoard, row, col);
      checkWin(newBoard);
    }
    setBoard(newBoard);
  };

  const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameOver || board[row][col].isRevealed) return;

    const newBoard = [...board];
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
  };

  const revealCell = (board: Cell[][], row: number, col: number) => {
    if (
      row < 0 ||
      row >= BOARD_SIZE ||
      col < 0 ||
      col >= BOARD_SIZE ||
      board[row][col].isRevealed ||
      board[row][col].isFlagged
    ) {
      return;
    }

    board[row][col].isRevealed = true;

    if (board[row][col].neighborMines === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          revealCell(board, row + i, col + j);
        }
      }
    }
  };

  const revealAll = (board: Cell[][]) => {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        board[row][col].isRevealed = true;
      }
    }
  };

  const checkWin = (board: Cell[][]) => {
    const won = board.every(row =>
      row.every(cell => cell.isRevealed || cell.isMine)
    );
    if (won) {
      setWon(true);
      setGameOver(true);
    }
  };

  const getCellContent = (cell: Cell): string => {
    if (!cell.isRevealed) return cell.isFlagged ? '🚩' : '';
    if (cell.isMine) return '💣';
    return cell.neighborMines === 0 ? '' : cell.neighborMines.toString();
  };

  const getCellColor = (cell: Cell): string => {
    if (!cell.isRevealed) return 'bg-gray-200 hover:bg-gray-300';
    if (cell.isMine) return 'bg-red-500';
    return 'bg-white';
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Minesweeper</h2>
      <div className="mb-4">
        {gameOver && <p className="text-lg font-semibold">{won ? 'You won!' : 'Game Over!'}</p>}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-10 gap-1">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`w-8 h-8 flex items-center justify-center border border-gray-300 ${getCellColor(
                  cell
                )}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
              >
                {getCellContent(cell)}
              </button>
            ))
          )}
        </div>
      </div>
      <button
        onClick={initializeBoard}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        New Game
      </button>
    </div>
  );
};

export default Minesweeper;