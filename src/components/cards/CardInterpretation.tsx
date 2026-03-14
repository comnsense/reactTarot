import React from 'react';
import { Card } from '../../types';

interface CardInterpretationProps {
  card: Card;
}

const CardInterpretation: React.FC<CardInterpretationProps> = ({ card }) => {
  return (
    <div className="interpretation-card">
      <div className="interpretation-header">
        <img 
          src={card.image} 
          alt={card.name}
          className="interpretation-image"
        />
        <div className="interpretation-title">
          <h3>{card.name}</h3>
          <p className="interpretation-subtitle">{card.name_en}</p>
        </div>
      </div>
      
      <div className="interpretation-content">
        {/* KEYWORDS - първи секция */}
        <div className="interpretation-section">
          <h4>🔮 Ключови думи</h4>
          <div className="keywords-list">
            {card.keywords.split(',').map((kw, i) => (
              <span key={i} className="keyword-tag-small">{kw.trim()}</span>
            ))}
          </div>
        </div>

        {/* GENERAL MEANING - вторa секция */}
        <div className="interpretation-section">
          <h4>📖 Подробно значение</h4>
          <p className="general-meaning-text">{card.general_meaning}</p>
        </div>

        {/* THIS IS (Ситуация) - трета секция */}
        <div className="interpretation-section">
          <h4>📌 Ситуация</h4>
          <p>{card.this_is}</p>
        </div>

        {/* ADVICE (Съвет) - четвърта секция */}
        <div className="interpretation-section advice">
          <h4>💫 Съвет от картата</h4>
          <p>{card.advice}</p>
        </div>
      </div>
    </div>
  );
};

export default CardInterpretation;