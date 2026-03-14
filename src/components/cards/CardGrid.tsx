import React from 'react';
import CardItem from './CardItem';
import { Card } from '../../types';

interface CardGridProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  selectedCards?: string[];
}

const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick, selectedCards = [] }) => {
  // DEBUG
  console.log('CardGrid received:', cards.length, 'cards');

  if (!cards || cards.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Няма карти за показване</p>
      </div>
    );
  }

  return (
    <div className="cards-grid">
      {cards.map((card) => {
        // DEBUG за първата карта
        if (card === cards[0]) {
          console.log('Rendering first card:', card.name, card.image);
        }
        
        return (
          <CardItem
            key={card.card_id}
            card={card}
            onClick={() => onCardClick(card)}
            isSelected={selectedCards.includes(card.card_id)}
          />
        );
      })}
    </div>
  );
};

export default CardGrid;