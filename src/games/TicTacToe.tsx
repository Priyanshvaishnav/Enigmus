import React, { useState } from 'react';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (calculateWinner(board) || board[i]) return;

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every(square => square)
    ? 'Draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Tic Tac Toe</h2>
      <div className="mb-4 text-lg font-semibold">{status}</div>
      <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-lg shadow-lg">
        {board.map((square, i) => (
          <button
            key={i}
            className="w-20 h-20 bg-purple-100 hover:bg-purple-200 text-3xl font-bold flex items-center justify-center border border-purple-300 rounded"
            onClick={() => handleClick(i)}
          >
            {square}
          </button>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        New Game
      </button>
    </div>
  );
};

export default TicTacToe;