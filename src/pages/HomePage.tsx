import React, { useState, useEffect, useRef } from 'react';
import CardGrid from '../components/cards/CardGrid';
import SelectedCards from '../components/cards/SelectedCards';
import CardInterpretation from '../components/cards/CardInterpretation';
import FilterButtons from '../components/filters/FilterButtons';
import { cards, readings } from '../data/cards';
import { Card, Reading } from '../types';

const MyCardsPage: React.FC = () => {
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [foundReadings, setFoundReadings] = useState<Reading[]>([]); // Променено от foundReading на масив
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const interpretationsRef = useRef<HTMLDivElement>(null);

  // Избраните карти (пълни обекти)
  const selectedCards = cards.filter(c => selectedCardIds.includes(c.card_id));

  // Филтриране на наличните карти
  const availableCards = cards.filter(c => !selectedCardIds.includes(c.card_id));
  
  const filteredCards = availableCards.filter(card => {
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

  // Функция за добавяне/махане на карта
  const toggleCard = (card: Card) => {
    setSelectedCardIds(prev => {
      if (prev.includes(card.card_id)) {
        return prev.filter(id => id !== card.card_id);
      } else {
        if (prev.length >= 10) {
          alert('Може да изберете максимум 10 карти');
          return prev;
        }
        return [...prev, card.card_id];
      }
    });
  };

  // Функция за премахване на конкретна карта
  const removeCard = (cardId: string) => {
    setSelectedCardIds(prev => prev.filter(id => id !== cardId));
  };

  // Изчистване на всички карти
  const clearSelected = () => {
    setSelectedCardIds([]);
    setFoundReadings([]); // Променено
  };

  // Скрол до тълкуванията
  const scrollToInterpretations = () => {
    if (interpretationsRef.current) {
      interpretationsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Функция за търсене на всички комбинации
  const checkForReadings = (ids: string[]) => {
    if (ids.length < 2) {
      setFoundReadings([]);
      return;
    }

    const sortedIds = [...ids].sort();
    
    // Намираме всички комбинации, които съвпадат
    const matchingReadings = readings.filter(r => {
      // Проверка за точно съвпадение
      const sortedReadingIds = [...r.reading_combination].sort();
      if (JSON.stringify(sortedIds) === JSON.stringify(sortedReadingIds)) {
        return true;
      }
      
      // Проверка дали всички карти от комбинацията са в избраните
      if (r.reading_combination.every(id => sortedIds.includes(id))) {
        return true;
      }
      
      return false;
    });

    setFoundReadings(matchingReadings);
  };

  useEffect(() => {
    checkForReadings(selectedCardIds);
  }, [selectedCardIds]);

  return (
    <div className="container">
      <h1 className="page-title">Помощ при тълкуване</h1>
      <p className="page-subtitle">
        Изберете до 10 карти, за да получите тълкувание и да откриете специални комбинации
      </p>
      
      {/* Selected Cards Component */}
      <SelectedCards 
        selectedCards={selectedCards}
        onClear={clearSelected}
        onRemoveCard={removeCard}
        foundReadings={foundReadings} // Променено
        onScrollToInterpretations={scrollToInterpretations}
      />

      {/* Филтри за налични карти */}
      <div className="mt-4 mb-2">
        <FilterButtons 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter}
          showNumbers={true}
        />
      </div>

      {/* Available Cards Grid */}
      <div className="mt-8">
        <h2 className="section-title">Налични карти ({filteredCards.length})</h2>
        <CardGrid 
          cards={filteredCards}
          onCardClick={toggleCard}
          selectedCards={selectedCardIds}
        />
      </div>

      {/* Interpretations Section */}
      {selectedCards.length > 0 && (
        <div ref={interpretationsRef} className="interpretations-section">
          <h2 className="section-title">Тълкувания</h2>
          <div className="interpretations-grid">
            {selectedCards.map(card => (
              <CardInterpretation key={card.card_id} card={card} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCardsPage;