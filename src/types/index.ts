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
}

export interface Reading {
  reading_id: string;
  reading_name: string;
  reading_cards: string;
  reading_combination: string[];
  reading_meaning: string;
  reading_description: string;
  reading_advice: string;
}