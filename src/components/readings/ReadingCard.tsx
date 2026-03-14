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
    if (name.includes('любов') || name.includes('съдбовна') || name.includes('брак')) return '💕';
    if (name.includes('пари') || name.includes('финанс') || name.includes('бизнес')) return '💰';
    if (name.includes('кариер') || name.includes('работа') || name.includes('успех')) return '💼';
    if (name.includes('здрав') || name.includes('болест')) return '🏥';
    if (name.includes('раздяла') || name.includes('край')) return '💔';
    if (name.includes('криза') || name.includes('фалит')) return '⚠️';
    if (name.includes('духов') || name.includes('пробуждане')) return '🕯️';
    return '🃏';
  };

  return (
    <div className="reading-card">
      <div className="reading-card-header" onClick={() => setExpanded(!expanded)}>
        <div className="reading-card-icon">{getIcon()}</div>
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