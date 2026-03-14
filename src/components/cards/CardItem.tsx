import React, { useState } from 'react';
import { Card } from '../../types';

interface CardItemProps {
  card: Card;
  onClick: () => void;
  isSelected?: boolean;
}

const CardItem: React.FC<CardItemProps> = ({ card, onClick, isSelected }) => {
  const [showHover, setShowHover] = useState(false);

  return (
    <div 
      className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isSelected ? 'opacity-50' : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => setShowHover(true)}
      onMouseLeave={() => setShowHover(false)}
    >
      {/* Card Image */}
      <img 
        src={card.image} 
        alt={card.name}
        className="w-full rounded-lg shadow-lg"
      />
      
      {/* Hover Info */}
      {showHover && !isSelected && (
        <div className="absolute inset-0 bg-black bg-opacity-75 text-white p-2 rounded-lg flex flex-col justify-center items-center text-center animate-fadeIn">
          <h3 className="text-sm font-bold">{card.name}</h3>
          <p className="text-xs italic">{card.name_en}</p>
          <p className="text-xs mt-2">{card.keywords.split(',')[0]}</p>
        </div>
      )}

      {/* Selected Badge */}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
          ✓
        </div>
      )}
    </div>
  );
};

export default CardItem;