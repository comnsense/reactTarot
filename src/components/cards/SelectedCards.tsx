import React from 'react';
import { Card, Reading } from '../../types';

interface SelectedCardsProps {
  selectedCards: Card[];
  onClear: () => void;
  foundReading: Reading | null;
}

const SelectedCards: React.FC<SelectedCardsProps> = ({ 
  selectedCards, 
  onClear, 
  foundReading 
}) => {
  // Скрол до тълкуванията
  const scrollToInterpretations = () => {
    const element = document.getElementById('interpretations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Избрани карти ({selectedCards.length}/10)
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={onClear}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Изчисти
          </button>
          <button 
            onClick={scrollToInterpretations}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Готово
          </button>
        </div>
      </div>

      {/* Миниатюри на избрани карти */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedCards.map(card => (
          <div key={card.card_id} className="w-16">
            <img 
              src={card.image} 
              alt={card.name}
              className="w-full rounded-lg shadow"
            />
            <p className="text-xs text-center mt-1">{card.name}</p>
          </div>
        ))}
      </div>

      {/* Открита комбинация */}
      {foundReading && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 animate-sparkle">
          <div className="flex items-center">
            <span className="text-2xl mr-2">⚡</span>
            <h3 className="font-bold text-lg">{foundReading.reading_name}</h3>
          </div>
          <p className="text-gray-700 mt-2">{foundReading.reading_description}</p>
          <p className="text-purple-600 mt-2 italic">{foundReading.reading_advice}</p>
        </div>
      )}
    </div>
  );
};

export default SelectedCards;