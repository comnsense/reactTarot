import React, { useState, useEffect, useRef } from 'react';
import CardGrid from '../components/cards/CardGrid';
import SelectedCards from '../components/cards/SelectedCards';
import CardInterpretation from '../components/cards/CardInterpretation';
import { cards, readings } from '../data/cards';
import { Card, Reading } from '../types';

const MyCardsPage: React.FC = () => {
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [foundReading, setFoundReading] = useState<Reading | null>(null);
  const interpretationsRef = useRef<HTMLDivElement>(null);

  // Избраните карти (пълни обекти)
  const selectedCards = cards.filter(c => selectedCardIds.includes(c.card_id));

  // Функция за добавяне/махане на карта
  const toggleCard = (card: Card) => {
    setSelectedCardIds(prev => {
      if (prev.includes(card.card_id)) {
        // Махаме картата
        return prev.filter(id => id !== card.card_id);
      } else {
        // Добавяме карта (макс 10)
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
    setFoundReading(null);
  };

  // Скрол до тълкуванията
  const scrollToInterpretations = () => {
    if (interpretationsRef.current) {
      interpretationsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Функция за търсене на комбинация
  const checkForReading = (ids: string[]) => {
    if (ids.length < 2) {
      setFoundReading(null);
      return;
    }

    // Сортираме ID-тата за коректно сравнение
    const sortedIds = [...ids].sort();
    
    // Търсим съвпадение в readings
    const reading = readings.find(r => {
      const sortedReadingIds = [...r.reading_combination].sort();
      
      // Проверка за точно съвпадение
      if (JSON.stringify(sortedIds) === JSON.stringify(sortedReadingIds)) {
        return true;
      }
      
      // Проверка за частични комбинации (ако избраните карти включват комбинацията)
      // Например: ако имаме 3 карти и комбинацията е от 2 от тях
      if (r.reading_combination.every(id => sortedIds.includes(id))) {
        return true;
      }
      
      return false;
    });

    setFoundReading(reading || null);
  };

  // Ефект за проверка на комбинации при промяна на избраните карти
  useEffect(() => {
    checkForReading(selectedCardIds);
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
        foundReading={foundReading}
        onScrollToInterpretations={scrollToInterpretations}
      />

      {/* Available Cards Grid */}
      <div className="mt-8">
        <h2 className="section-title">Налични карти</h2>
        <CardGrid 
          cards={cards.filter(c => !selectedCardIds.includes(c.card_id))}
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