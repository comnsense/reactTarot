import React, { useState, useEffect } from 'react';
import CardGrid from '../components/cards/CardGrid';
import CardModal from '../components/cards/CardModal';
import FilterButtons from '../components/filters/FilterButtons';
import { cards } from '../data/cards';
import { Card } from '../types';

const HomePage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // DEBUG: Проверка дали картите се зареждат
  useEffect(() => {
    console.log('Cards loaded:', cards);
    console.log('Number of cards:', cards.length);
    if (cards.length > 0) {
      console.log('First card:', cards[0]);
    }
  }, []);

  // Филтриране на картите
  const filteredCards = cards.filter(card => {
    if (activeFilter === 'all') return true;
    return card.filter === activeFilter;
  });

  // DEBUG: Проверка на филтрираните карти
  console.log('Active filter:', activeFilter);
  console.log('Filtered cards:', filteredCards.length);

  return (
    <div className="container">
      <h1 className="page-title">Всички Таро карти</h1>
      <p className="page-subtitle">{cards.length} карти - Големи и Малки аркани</p>
      
      {/* Филтри */}
      <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      
      {/* Брой намерени карти */}
      <div className="results-count">
        Показани: {filteredCards.length} карти
      </div>
      
      {/* Grid с карти */}
      {filteredCards.length > 0 ? (
        <CardGrid 
          cards={filteredCards} 
          onCardClick={setSelectedCard} 
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">Няма карти в тази категория</p>
        </div>
      )}

      {/* Modal за детайли */}
      <CardModal 
        card={selectedCard} 
        onClose={() => setSelectedCard(null)} 
      />
    </div>
  );
};

export default HomePage;