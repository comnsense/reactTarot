import React, { useState, useMemo } from 'react';
import ReadingCard from '../components/readings/ReadingCard';
import { readings } from '../data/cards'; 
import { Reading } from '../types';

const ReadingsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSuit, setActiveSuit] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Категории с броячи
  const categories = useMemo(() => {
    const counts = {
      all: readings.length,
      love: 0,
      career: 0,
      money: 0,
      health: 0,
      spiritual: 0,
      crisis: 0
    };

    readings.forEach(reading => {
      const name = reading.reading_name.toLowerCase();
      const desc = reading.reading_description.toLowerCase();
      
      if (name.includes('любов') || desc.includes('любов') || name.includes('съдбовна') || name.includes('брак') || name.includes('влюбените')) counts.love++;
      if (name.includes('кариер') || desc.includes('кариер') || name.includes('работа') || name.includes('бизнес') || name.includes('успех')) counts.career++;
      if (name.includes('пари') || desc.includes('пари') || name.includes('финанс') || name.includes('бизнес') || name.includes('пентакли')) counts.money++;
      if (name.includes('здрав') || desc.includes('здрав') || name.includes('болест') || name.includes('мечове')) counts.health++;
      if (name.includes('духов') || desc.includes('духов') || name.includes('пробуждане') || name.includes('интуиция') || name.includes('жрица')) counts.spiritual++;
      if (name.includes('криза') || desc.includes('криза') || name.includes('фалит') || name.includes('край') || name.includes('смърт') || name.includes('кула')) counts.crisis++;
    });

    return [
      { key: 'all', label: 'Всички', count: counts.all, icon: '🃏' },
      { key: 'love', label: 'Любов', count: counts.love, icon: '💕' },
      { key: 'career', label: 'Кариера', count: counts.career, icon: '💼' },
      { key: 'money', label: 'Пари', count: counts.money, icon: '💰' },
      { key: 'health', label: 'Здраве', count: counts.health, icon: '🏥' },
      { key: 'spiritual', label: 'Духовност', count: counts.spiritual, icon: '🕯️' },
      { key: 'crisis', label: 'Кризи', count: counts.crisis, icon: '⚠️' },
    ];
  }, []);

  // Филтри за бои и Големи аркани
  const suitFilters = [
    { key: 'all', label: 'Всички', icon: '🃏' },
    { key: 'major', label: 'Големи аркани', icon: '⭐' },
    { key: 'wands', label: 'Жезли', icon: '🔥' },
    { key: 'cups', label: 'Купи', icon: '💧' },
    { key: 'swords', label: 'Мечове', icon: '⚔️' },
    { key: 'pentacles', label: 'Пентакли', icon: '🪙' },
  ];

  // Функция за проверка дали комбинацията съдържа карти от дадена боя
  const hasCardsFromSuit = (reading: Reading, suit: string): boolean => {
    if (suit === 'all') return true;
    
    const readingCards = reading.reading_combination;
    
    return readingCards.some(cardId => {
      if (suit === 'major') {
        const majorCards = ['fool', 'magician', 'high_priestess', 'empress', 'emperor', 'hierophant', 
          'lovers', 'chariot', 'strength', 'hermit', 'wheel_of_fortune', 'justice', 'hanged_man',
          'death', 'temperance', 'devil', 'tower', 'star', 'moon', 'sun', 'judgement', 'world'];
        return majorCards.includes(cardId);
      }
      
      if (suit === 'wands') return cardId.includes('wands');
      if (suit === 'cups') return cardId.includes('cups');
      if (suit === 'swords') return cardId.includes('swords');
      if (suit === 'pentacles') return cardId.includes('pentacles');
      
      return false;
    });
  };

  // Филтриране на комбинациите
  const filteredReadings = useMemo(() => {
    return readings.filter(reading => {
      // Филтър по категория
      if (activeCategory !== 'all') {
        const name = reading.reading_name.toLowerCase();
        const desc = reading.reading_description.toLowerCase();
        const cards = reading.reading_cards.toLowerCase();
        
        const categoryMatch = {
          love: name.includes('любов') || desc.includes('любов') || name.includes('съдбовна') || name.includes('брак') || cards.includes('влюбените') || cards.includes('чаши'),
          career: name.includes('кариер') || desc.includes('кариер') || name.includes('работа') || name.includes('бизнес') || name.includes('успех') || cards.includes('жезли') || cards.includes('пентакли'),
          money: name.includes('пари') || desc.includes('пари') || name.includes('финанс') || name.includes('бизнес') || cards.includes('пентакли'),
          health: name.includes('здрав') || desc.includes('здрав') || name.includes('болест') || cards.includes('мечове'),
          spiritual: name.includes('духов') || desc.includes('духов') || name.includes('пробуждане') || name.includes('интуиция') || cards.includes('жрица') || cards.includes('луна'),
          crisis: name.includes('криза') || desc.includes('криза') || name.includes('фалит') || name.includes('край') || cards.includes('смърт') || cards.includes('кула') || cards.includes('мечове')
        }[activeCategory];

        if (!categoryMatch) return false;
      }

      // Филтър по боя/Големи аркани
      if (activeSuit !== 'all') {
        if (!hasCardsFromSuit(reading, activeSuit)) return false;
      }

      // Филтър по търсене
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return reading.reading_name.toLowerCase().includes(term) ||
               reading.reading_cards.toLowerCase().includes(term) ||
               reading.reading_description.toLowerCase().includes(term);
      }

      return true;
    });
  }, [activeCategory, activeSuit, searchTerm]);

  // Броячи за филтрите по боя
  const suitCounts = useMemo(() => {
    const counts: { [key: string]: number } = {
      major: 0,
      wands: 0,
      cups: 0,
      swords: 0,
      pentacles: 0
    };

    readings.forEach(reading => {
      if (hasCardsFromSuit(reading, 'major')) counts.major++;
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

      {/* Филтри по бои и Големи аркани */}
      <div className="filters-section">
        <h3 className="filters-title">🎴 Бои и Аркани</h3>
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
                <span className="suit-count">{suitCounts[suit.key]}</span>
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
