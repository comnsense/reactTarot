import React from 'react';
import { Card, Reading } from '../../types';

interface SelectedCardsProps {
  selectedCards: Card[];
  onClear: () => void;
  onRemoveCard: (cardId: string) => void;
  foundReading: Reading | null;
  onScrollToInterpretations: () => void;
}

const SelectedCards: React.FC<SelectedCardsProps> = ({ 
  selectedCards, 
  onClear, 
  onRemoveCard,
  foundReading, 
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
              alt={card.name}  // ← Променено от card_name на name
              className="selected-card-image"
            />
            <button 
              onClick={() => onRemoveCard(card.card_id)}
              className="selected-card-remove"
              title="Премахни"
            >
              ×
            </button>
            <span className="selected-card-name">{card.name}</span>  {/* ← Променено от card_name на name */}
          </div>
        ))}
      </div>

      {/* Открита комбинация */}
      {foundReading && (
        <div className="reading-found animate-sparkle">
          <div className="reading-found-header">
            <span className="reading-found-icon">⚡</span>
            <h3 className="reading-found-title">Открита комбинация: {foundReading.reading_name}</h3>
          </div>
          <p className="reading-found-cards">{foundReading.reading_cards}</p>
          <p className="reading-found-description">{foundReading.reading_description}</p>
          <p className="reading-found-advice">"{foundReading.reading_advice}"</p>
        </div>
      )}
    </div>
  );
};

export default SelectedCards;