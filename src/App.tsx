import React, { useState } from 'react';
import { Layout, Grid2X2 } from 'lucide-react';
import GameSelector from './components/GameSelector';
import Sudoku from './games/Sudoku';
import Snake from './games/Snake';
import TicTacToe from './games/TicTacToe';
import Minesweeper from './games/Minesweeper';

export type GameType = 'sudoku' | 'snake' | 'tictactoe' | 'minesweeper';

const games = [
  { id: 'sudoku', name: 'Sudoku', icon: Layout },
  { id: 'snake', name: 'Snake', icon: Grid2X2 },
  { id: 'tictactoe', name: 'Tic Tac Toe', icon: Grid2X2 },
  { id: 'minesweeper', name: 'Minesweeper', icon: Grid2X2 },
];

function App() {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);

  const renderGame = () => {
    switch (selectedGame) {
      case 'sudoku':
        return <Sudoku />;
      case 'snake':
        return <Snake />;
      case 'tictactoe':
        return <TicTacToe />;
      case 'minesweeper':
        return <Minesweeper />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Puzzle Games Hub
        </h1>
        
        {!selectedGame ? (
          <GameSelector games={games} onSelect={(game) => setSelectedGame(game as GameType)} />
        ) : (
          <div>
            <button
              onClick={() => setSelectedGame(null)}
              className="mb-4 px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              ← Back to Games
            </button>
            {renderGame()}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;