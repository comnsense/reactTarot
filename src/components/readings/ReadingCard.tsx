import React, { useState } from 'react';
import { Reading } from '../../types';

interface ReadingCardProps {
  reading: Reading;
}

const ReadingCard: React.FC<ReadingCardProps> = ({ reading }) => {
  const [expanded, setExpanded] = useState(false);

  // Определяне на икона според типа комбинация
  const getIcon = () => {
    const name = reading.reading_name.toLowerCase();
    const cards = reading.reading_cards.toLowerCase();
    
    if (name.includes('любов') || cards.includes('чаши') || cards.includes('влюбените')) return '💕';
    if (name.includes('пари') || cards.includes('пентакли')) return '💰';
    if (name.includes('кариер') || cards.includes('жезли')) return '💼';
    if (name.includes('здрав') || cards.includes('мечове')) return '🏥';
    if (cards.includes('големи') || cards.includes('аркани')) return '⭐';
    if (cards.includes('жезли')) return '🔥';
    if (cards.includes('чаши')) return '💧';
    if (cards.includes('мечове')) return '⚔️';
    if (cards.includes('пентакли')) return '🪙';
    return '🃏';
  };

  // Определяне на цвета според боята
  const getSuitColor = () => {
    const cards = reading.reading_cards.toLowerCase();
    if (cards.includes('жезли')) return '#ff6b6b';
    if (cards.includes('чаши')) return '#4dabf7';
    if (cards.includes('мечове')) return '#fcc419';
    if (cards.includes('пентакли')) return '#51cf66';
    if (cards.includes('големи')) return '#9775fa';
    return '#9333ea';
  };

  return (
    <div className="reading-card">
      <div className="reading-card-header" onClick={() => setExpanded(!expanded)}>
        <div 
          className="reading-card-icon"
          style={{ background: `linear-gradient(135deg, ${getSuitColor()} 0%, ${getSuitColor()}dd 100%)` }}
        >
          {getIcon()}
        </div>
        <div className="reading-card-title">
          <h3>{reading.reading_name}</h3>
          <p className="reading-card-cards">{reading.reading_cards}</p>
        </div>
        <button className="reading-card-expand">
          {expanded ? '−' : '+'}
        </button>
      </div>
      
      <div className={`reading-card-body ${expanded ? 'expanded' : ''}`}>
        <div className="reading-card-meaning">
          <span className="reading-tag">{reading.reading_meaning}</span>
        </div>
        
        {/* Показване на second_meaning ако съществува */}
        {reading.second_meaning && (
          <div className="reading-card-second-meaning">
            <span className="second-meaning-label">📖 Допълнително значение</span>
            <p className="reading-card-second-description">{reading.second_meaning}</p>
          </div>
        )}
        
        <p className="reading-card-description">{reading.reading_description}</p>
        
        <div className="reading-card-advice">
          <span className="advice-icon">✨</span>
          <p>{reading.reading_advice}</p>
        </div>
      </div>
    </div>
  );
};

export default ReadingCard;
