import React, { useState, useMemo } from 'react';
import ReadingCard from '../components/readings/ReadingCard';
import { readings, baseReadings, minorArcanaReadings } from '../data/readings';
import { Reading } from '../types';

const ReadingsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSuit, setActiveSuit] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Категории с броячи
  const categories = [
    { key: 'all', label: 'Всички', count: readings.length, icon: '🃏' },
    { key: 'major', label: 'Големи аркани', count: baseReadings.length, icon: '⭐' },
    { key: 'minor', label: 'Малки аркани', count: minorArcanaReadings.length, icon: '🎴' },
  ];

  // Филтри за бои
  const suitFilters = [
    { key: 'all', label: 'Всички', icon: '🃏' },
    { key: 'wands', label: 'Жезли', icon: '🔥' },
    { key: 'cups', label: 'Купи', icon: '💧' },
    { key: 'swords', label: 'Мечове', icon: '⚔️' },
    { key: 'pentacles', label: 'Пентакли', icon: '🪙' },
  ];

  // Функция за проверка на боя
  const hasCardsFromSuit = (reading: Reading, suit: string): boolean => {
    if (suit === 'all') return true;
    
    const readingCards = reading.reading_combination;
    
    return readingCards.some(cardId => {
      if (suit === 'wands') return cardId.includes('wands');
      if (suit === 'cups') return cardId.includes('cups');
      if (suit === 'swords') return cardId.includes('swords');
      if (suit === 'pentacles') return cardId.includes('pentacles');
      return false;
    });
  };

  // Филтриране на комбинациите
  const filteredReadings = useMemo(() => {
    let filtered = readings;
    
    // Филтър по категория
    if (activeCategory === 'major') {
      filtered = baseReadings;
    } else if (activeCategory === 'minor') {
      filtered = minorArcanaReadings;
    }
    
    // Филтър по търсене
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(reading => 
        reading.reading_name.toLowerCase().includes(term) ||
        reading.reading_cards.toLowerCase().includes(term) ||
        reading.reading_description.toLowerCase().includes(term)
      );
    }
    
    // Филтър по боя
    if (activeSuit !== 'all') {
      filtered = filtered.filter(reading => hasCardsFromSuit(reading, activeSuit));
    }
    
    return filtered;
  }, [activeCategory, activeSuit, searchTerm]);

  // Броячи за филтрите по боя
  const suitCounts = useMemo(() => {
    const counts = { wands: 0, cups: 0, swords: 0, pentacles: 0 };
    
    readings.forEach(reading => {
      if (hasCardsFromSuit(reading, 'wands')) counts.wands++;
      if (hasCardsFromSuit(reading, 'cups')) counts.cups++;
      if (hasCardsFromSuit(reading, 'swords')) counts.swords++;
      if (hasCardsFromSuit(reading, 'pentacles')) counts.pentacles++;
    });
    
    return counts;
  }, []);

  return (
    <div className="container readings-page">
      <h1 className="page-title">Всички комбинации</h1>
      <p className="page-subtitle">
        {readings.length} комбинации - открийте значението на картите заедно
      </p>

      {/* Търсачка */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Търси комбинация по име, карти или описание..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="search-clear"
            onClick={() => setSearchTerm('')}
          >
            ×
          </button>
        )}
      </div>

      {/* Категории */}
      <div className="filters-section">
        <h3 className="filters-title">📋 Категории</h3>
        <div className="categories-container">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`category-btn ${activeCategory === cat.key ? 'active' : ''}`}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-label">{cat.label}</span>
              <span className="category-count">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Филтри по бои */}
      <div className="filters-section">
        <h3 className="filters-title">🎴 Бои</h3>
        <div className="suit-filters">
          {suitFilters.map(suit => (
            <button
              key={suit.key}
              onClick={() => setActiveSuit(suit.key)}
              className={`suit-btn ${activeSuit === suit.key ? 'active' : ''}`}
            >
              <span className="suit-icon">{suit.icon}</span>
              <span className="suit-label">{suit.label}</span>
              {suit.key !== 'all' && (
                <span className="suit-count">{suitCounts[suit.key as keyof typeof suitCounts]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Активни филтри и резултати */}
      <div className="readings-stats">
        <div className="stats-left">
          <span className="stats-count">
            {filteredReadings.length} комбинации
          </span>
          {(activeCategory !== 'all' || activeSuit !== 'all') && (
            <div className="active-filters">
              {activeCategory !== 'all' && (
                <span className="active-filter-tag">
                  {categories.find(c => c.key === activeCategory)?.icon} {categories.find(c => c.key === activeCategory)?.label}
                </span>
              )}
              {activeSuit !== 'all' && (
                <span className="active-filter-tag">
                  {suitFilters.find(s => s.key === activeSuit)?.icon} {suitFilters.find(s => s.key === activeSuit)?.label}
                </span>
              )}
            </div>
          )}
        </div>
        {(activeCategory !== 'all' || activeSuit !== 'all') && (
          <button 
            className="stats-reset"
            onClick={() => {
              setActiveCategory('all');
              setActiveSuit('all');
            }}
          >
            Изчисти всички филтри
          </button>
        )}
      </div>

      {/* Grid с комбинации */}
      {filteredReadings.length > 0 ? (
        <div className="readings-grid">
          {filteredReadings.map(reading => (
            <ReadingCard key={reading.reading_id} reading={reading} />
          ))}
        </div>
      ) : (
        <div className="readings-empty">
          <span className="empty-icon">🔍</span>
          <h3>Няма намерени комбинации</h3>
          <p>Опитайте с друго търсене или изберете друга категория</p>
        </div>
      )}
    </div>
  );
};

export default ReadingsPage;
