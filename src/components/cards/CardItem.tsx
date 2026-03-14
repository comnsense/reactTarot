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

  // Разделяме ключовите думи
  const keywordsList = card.keywords.split(',').map(k => k.trim());

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
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="card-image" style={{ 
          backgroundColor: '#374151', 
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
        <div className="card-hover-transparent animate-fadeIn">
          <h3>{card.name}</h3>
          <p className="card-english">{card.name_en}</p>
          <div className="card-keywords-hover">
            {keywordsList.map((keyword, index) => (
              <span key={index} className="keyword-hover-item">
                {keyword}
              </span>
            ))}
          </div>
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