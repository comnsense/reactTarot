import React from 'react';
import { filters } from '../../data/cards';

interface FilterButtonsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  showNumbers?: boolean;  // ← Този ред е критичен - добавете го
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ 
  activeFilter, 
  onFilterChange,
  showNumbers = false  // ← И този ред също
}) => {
  // Основни филтри
  const mainFilters = [
    { key: 'all', label: 'Всички' },
    { key: 'major', label: filters.major as string },
    { key: 'wands', label: filters.wands as string },
    { key: 'cups', label: filters.cups as string },
    { key: 'swords', label: filters.swords as string },
    { key: 'pentacles', label: filters.pentacles as string },
    { key: 'kings', label: filters.kings as string },
    { key: 'queens', label: filters.queens as string },
    { key: 'knights', label: filters.knights as string },
    { key: 'pages', label: filters.pages as string },
  ];

  // Филтри за числа (1-10)
  const numberFilters = [
    { key: 'numbers', label: 'Числа' },
    ...Object.entries(filters.numbers).map(([key, label]) => ({
      key: `number_${key}`,
      label: label as string
    }))
  ];

  return (
    <div className="filter-buttons">
      {/* Основни филтри */}
      {mainFilters.map(filter => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
        >
          {filter.label}
        </button>
      ))}

      {/* Филтри за числа (само ако showNumbers е true) */}
      {showNumbers && numberFilters.map(filter => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`filter-btn number-filter ${activeFilter === filter.key ? 'active' : ''}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;