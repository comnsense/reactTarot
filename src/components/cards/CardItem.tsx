import React, { useState } from 'react';
import { Card } from '../../types';

interface CardItemProps {
  card: Card;
  onClick: () => void;
  isSelected?: boolean;
}

const CardItem: React.FC<CardItemProps> = ({ card, onClick, isSelected }) => {
  const [showHover, setShowHover] = useState(false);
  const [imageError, setImageError] = useState(false);

  // DEBUG
  console.log('CardItem rendering:', card.name, card.image);

  const handleImageError = () => {
    console.log('Image failed to load:', card.image);
    setImageError(true);
  };

  return (
    <div 
      className={`card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setShowHover(true)}
      onMouseLeave={() => setShowHover(false)}
    >
      {!imageError ? (
        <img 
          src={card.image} 
          alt={card.name}
          className="card-image"
          onError={handleImageError}
        />
      ) : (
        <div className="card-image" style={{ 
          backgroundColor: '#9333ea', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          minHeight: '250px'
        }}>
          {card.name}
        </div>
      )}
      
      {showHover && !isSelected && (
        <div className="card-hover animate-fadeIn">
          <h3>{card.name}</h3>
          <p>{card.name_en}</p>
          <p className="mt-2 text-xs">{card.keywords?.split(',')[0] || ''}</p>
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