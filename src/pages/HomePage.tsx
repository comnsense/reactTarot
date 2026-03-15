import React, { useState } from 'react';
import CardGrid from '../components/cards/CardGrid';
import CardModal from '../components/cards/CardModal';
import FilterButtons from '../components/filters/FilterButtons';
import { cards } from '../data/cards';
import { Card } from '../types';

const HomePage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Филтриране на картите
  const filteredCards = cards.filter(card => {
    if (activeFilter === 'all') return true;
    
    // Филтър за числа (1-10)
    if (activeFilter.startsWith('number_')) {
      const number = activeFilter.split('_')[1];
      return card.number === number;
    }
    
    // Филтър за числа (общ)
    if (activeFilter === 'numbers') {
      return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(card.number);
    }
    
    // Обикновен филтър
    return card.filter === activeFilter;
  });

  return (
    <div className="container">
      <h1 className="page-title">Всички Таро карти</h1>
      <p className="page-subtitle">
        {cards.length} карти - Големи и Малки аркани
      </p>
      
      {/* Филтри - с showNumbers = true */}
      <FilterButtons 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter}
        showNumbers={true}
      />
      
      {/* Брой намерени карти */}
      <div className="results-count">
        Показани: {filteredCards.length} карти
      </div>
      
      {/* Grid с карти */}
      <CardGrid 
        cards={filteredCards} 
        onCardClick={setSelectedCard} 
      />

      {/* Modal за детайли */}
      <CardModal 
        card={selectedCard} 
        onClose={() => setSelectedCard(null)} 
      />
    </div>
  );
};

export default HomePage;
