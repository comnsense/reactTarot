export interface Card {
  card_id: string;
  name: string;
  name_en: string;
  number: string;
  arcana: string;
  filter: string;
  image: string;
  keywords: string;
  this_is: string;
  general_meaning: string;
  advice: string;
  cardSymbolism: string[];
  reversed: string;
  planet: string;
  zodiac_sign: string;
  as_situation?: string;  
  as_lesson?: string;    
}

export interface Reading {
  reading_id: string;
  reading_name: string;
  reading_cards: string;
  reading_combination: string[];
  reading_meaning: string;
  second_meaning: string;  // ← Добавете този ред
  reading_description: string;
  reading_advice: string;
}

export interface Filters {
  [key: string]: string | { [key: string]: string };
}

export type FilterType = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles' | 
                        'kings' | 'queens' | 'knights' | 'pages' | 'numbers' | 'all';
