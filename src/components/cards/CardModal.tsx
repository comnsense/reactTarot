import React, { useState } from 'react';
import { Card } from '../../types';

interface CardModalProps {
  card: Card | null;
  onClose: () => void;
}

// За момента ще използваме обикновен бутон с "X" докато оправим react-icons
const CardModal: React.FC<CardModalProps> = ({ card, onClose }) => {
  const [showMore, setShowMore] = useState(false);

  if (!card) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative p-6">
          {/* Close Button - използваме обикновен текст */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10 w-8 h-8 flex items-center justify-center text-2xl font-bold"
            aria-label="Close"
          >
            ×
          </button>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Card Image */}
            <div className="md:w-1/3">
              <img 
                src={card.image} 
                alt={card.name}
                className="w-full rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 mt-2 text-center italic">
                {card.name_en}
              </p>
            </div>

            {/* Card Details */}
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-2">{card.name}</h2>
              
              {/* Filter/Number Info */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {card.arcana}
                </span>
                {card.number && card.number !== "" && (
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    № {card.number}
                  </span>
                )}
              </div>

              {/* Keywords */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Ключови думи</h3>
                <p className="text-gray-700">{card.keywords}</p>
              </div>

              {/* This is */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Това е</h3>
                <p className="text-gray-700">{card.this_is}</p>
              </div>

              {/* General Meaning */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Значение</h3>
                <p className="text-gray-700">{card.general_meaning}</p>
              </div>

              {/* Advice */}
              <div className="mb-4 bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">✨ Съвет</h3>
                <p className="text-gray-700">{card.advice}</p>
              </div>

              {/* Read More Section */}
              {!showMore ? (
                <button
                  onClick={() => setShowMore(true)}
                  className="text-purple-600 hover:text-purple-800 font-semibold"
                >
                  + Прочети повече
                </button>
              ) : (
                <div className="space-y-4 mt-4 border-t pt-4">
                  {/* Symbolism */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Символика</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {card.cardSymbolism.map((symbol, index) => (
                        <li key={index}>{symbol}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Reversed */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Обърната позиция</h3>
                    <p className="text-gray-700">{card.reversed}</p>
                  </div>

                  {/* Astrology */}
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-purple-800">Планета</h4>
                      <p className="text-gray-700">{card.planet}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800">Зодия</h4>
                      <p className="text-gray-700">{card.zodiac_sign}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;