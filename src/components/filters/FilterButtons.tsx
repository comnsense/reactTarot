import React from 'react';
import { filters } from '../../data/cards';

interface FilterButtonsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ activeFilter, onFilterChange }) => {
  const filterList = [
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

  return (
    <div className="filter-buttons">
      {filterList.map(filter => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;