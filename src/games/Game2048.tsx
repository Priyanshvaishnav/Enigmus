import React, { useState, useEffect } from 'react';

const Game2048: React.FC = () => {
  const [board, setBoard] = useState<number[][]>(Array(4).fill(null).map(() => Array(4).fill(0)));
  const [score, setScore] = useState(0);

  useEffect(() => {
    initializeBoard();
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const initializeBoard = () => {
    const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
    addNewTile(newBoard);
    addNewTile(newBoard);
    setBoard(newBoard);
    setScore(0);
  };

  const addNewTile = (currentBoard: number[][]) => {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentBoard[i][j] === 0) {
          emptyCells.push([i, j]);
        }
      }
    }
    if (emptyCells.length > 0) {
      const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      currentBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const moveBoard = (direction: 'up' | 'down' | 'left' | 'right') => {
    let newBoard = board.map(row => [...row]);
    let moved = false;
    let newScore = score;

    // Rotate board to handle all directions uniformly
    if (direction === 'up') {
      newBoard = rotateBoard(newBoard);
    } else if (direction === 'right') {
      newBoard = rotateBoard(rotateBoard(newBoard));
    } else if (direction === 'down') {
      newBoard = rotateBoard(rotateBoard(rotateBoard(newBoard)));
    }

    // Move and merge tiles
    for (let i = 0; i < 4; i++) {
      const row = newBoard[i];
      const newRow = row.filter(cell => cell !== 0);
      
      // Merge adjacent equal numbers
      for (let j = 0; j < newRow.length - 1; j++) {
        if (newRow[j] === newRow[j + 1]) {
          newRow[j] *= 2;
          newScore += newRow[j];
          newRow.splice(j + 1, 1);
        }
      }
      
      // Fill with zeros
      while (newRow.length < 4) {
        newRow.push(0);
      }
      
      // Check if the row changed
      if (row.some((cell, index) => cell !== newRow[index])) {
        moved = true;
      }
      
      newBoard[i] = newRow;
    }

    // Rotate back
    if (direction === 'up') {
      newBoard = rotateBoard(rotateBoard(rotateBoard(newBoard)));
    } else if (direction === 'right') {
      newBoard = rotateBoard(rotateBoard(newBoard));
    } else if (direction === 'down') {
      newBoard = rotateBoard(newBoard);
    }

    if (moved) {
      addNewTile(newBoard);
      setBoard(newBoard);
      setScore(newScore);
    }
  };

  const rotateBoard = (board: number[][]): number[][] => {
    const N = board.length;
    const rotated = Array(N).fill(null).map(() => Array(N).fill(0));
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        rotated[j][N - 1 - i] = board[i][j];
      }
    }
    return rotated;
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        moveBoard('up');
        break;
      case 'ArrowDown':
        event.preventDefault();
        moveBoard('down');
        break;
      case 'ArrowLeft':
        event.preventDefault();
        moveBoard('left');
        break;
      case 'ArrowRight':
        event.preventDefault();
        moveBoard('right');
        break;
    }
  };

  const getColor = (value: number): string => {
    const colors: { [key: number]: string } = {
      2: 'bg-blue-100',
      4: 'bg-blue-200',
      8: 'bg-blue-300',
      16: 'bg-blue-400',
      32: 'bg-blue-500',
      64: 'bg-blue-600',
      128: 'bg-purple-400',
      256: 'bg-purple-500',
      512: 'bg-purple-600',
      1024: 'bg-yellow-400',
      2048: 'bg-yellow-500',
    };
    return colors[value] || 'bg-gray-100';
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">2048</h2>
      <div className="mb-4">
        <span className="text-lg font-semibold">Score: {score}</span>
      </div>
      <div className="bg-gray-200 p-4 rounded-lg">
        <div className="grid grid-cols-4 gap-2">
          {board.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`w-16 h-16 flex items-center justify-center rounded-lg font-bold text-lg ${
                  cell === 0 ? 'bg-gray-300' : getColor(cell)
                } ${cell > 4 ? 'text-white' : 'text-gray-800'}`}
              >
                {cell !== 0 && cell}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Use arrow keys to move tiles
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

export default Game2048;