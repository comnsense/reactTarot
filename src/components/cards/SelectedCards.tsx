import React from 'react';
import { Card, Reading } from '../../types';

interface SelectedCardsProps {
  selectedCards: Card[];
  onClear: () => void;
  onRemoveCard: (cardId: string) => void;
  foundReadings: Reading[];
  onScrollToInterpretations: () => void;
}

const SelectedCards: React.FC<SelectedCardsProps> = ({ 
  selectedCards, 
  onClear, 
  onRemoveCard,
  foundReadings, 
  onScrollToInterpretations 
}) => {
  if (selectedCards.length === 0) {
    return (
      <div className="selected-cards-empty">
        <p>Все още нямате избрани карти</p>
        <p className="text-sm">Кликнете върху карта, за да я добавите (макс. 10)</p>
      </div>
    );
  }

  return (
    <div className="selected-cards-container">
      <div className="selected-cards-header">
        <h2 className="selected-cards-title">
          Избрани карти ({selectedCards.length}/10)
        </h2>
        <div className="selected-cards-actions">
          <button onClick={onClear} className="btn-secondary">
            Изчисти всички
          </button>
          <button onClick={onScrollToInterpretations} className="btn-primary">
            Готово
          </button>
        </div>
      </div>

      {/* Миниатюри на избрани карти */}
      <div className="selected-cards-grid">
        {selectedCards.map(card => (
          <div key={card.card_id} className="selected-card-item">
            <img 
              src={card.image} 
              alt={card.name}
              className="selected-card-image"
            />
            <button 
              onClick={() => onRemoveCard(card.card_id)}
              className="selected-card-remove"
              title="Премахни"
            >
              ×
            </button>
            <span className="selected-card-name">{card.name}</span>
          </div>
        ))}
      </div>

      {/* Открити комбинации */}
      {foundReadings.length > 0 && (
        <div className="found-readings-container">
          <h3 className="found-readings-title">
            ⚡ Открити комбинации ({foundReadings.length})
          </h3>
          <div className="found-readings-list">
            {foundReadings.map((reading, index) => (
              <div key={index} className="reading-found animate-sparkle">
                <div className="reading-found-header">
                  <span className="reading-found-icon">⚡</span>
                  <h4 className="reading-found-title">{reading.reading_name}</h4>
                </div>
                <p className="reading-found-cards">{reading.reading_cards}</p>
                <p className="reading-found-description">{reading.reading_description}</p>
                <p className="reading-found-advice">"{reading.reading_advice}"</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedCards;
