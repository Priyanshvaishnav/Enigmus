import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Game {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface GameSelectorProps {
  games: Game[];
  onSelect: (gameId: string) => void;
}

const GameSelector: React.FC<GameSelectorProps> = ({ games, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {games.map((game) => (
        <button
          key={game.id}
          onClick={() => onSelect(game.id)}
          className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <game.icon className="w-12 h-12 text-purple-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">{game.name}</h2>
        </button>
      ))}
    </div>
  );
}

export default GameSelector;