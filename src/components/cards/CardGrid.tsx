import React from 'react';
import CardItem from './CardItem';
import { Card } from '../../types';

interface CardGridProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  selectedCards?: string[];
}

const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick, selectedCards = [] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
      {cards.map((card) => (
        <CardItem
          key={card.card_id}
          card={card}
          onClick={() => onCardClick(card)}
          isSelected={selectedCards.includes(card.card_id)}
        />
      ))}
    </div>
  );
};

export default CardGrid;