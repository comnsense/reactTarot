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
      className={`card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setShowHover(true)}
      onMouseLeave={() => setShowHover(false)}
    >
      <img 
        src={card.image} 
        alt={card.name}
        className="card-image"
      />
      
      {showHover && !isSelected && (
        <div className="card-hover animate-fadeIn">
          <h3>{card.name}</h3>
          <p>{card.name_en}</p>
          <p>{card.keywords.split(',')[0]}</p>
        </div>
      )}

      {isSelected && (
        <div className="selected-badge">
          ✓
        </div>
      )}
    </div>
  );
};

export default CardItem;