import React, { useState } from 'react';
import { Card } from '../../types';

interface CardModalProps {
  card: Card | null;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ card, onClose }) => {
  const [showMore, setShowMore] = useState(false);

  if (!card) return null;

  // Определяне на типа карта за стилове
  const isMajor = card.arcana.includes('Големи');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-body">
          <div className="flex flex-col md-flex-row gap-6">
            {/* Card Image */}
            <div className="md-w-1-3">
              <img 
                src={card.image} 
                alt={card.name}
                className="modal-image"
              />
              <p className="text-sm text-gray-600 mt-2 text-center italic">
                {card.name_en}
              </p>
            </div>

            {/* Card Details */}
            <div className="md-w-2-3">
              <h2 className="modal-title">{card.name}</h2>
              
              {/* Tags */}
              <div className="card-tags">
                <span className={`card-tag ${isMajor ? 'tag-major' : 'tag-minor'}`}>
                  {card.arcana}
                </span>
                {card.number && card.number !== "" && (
                  <span className="card-tag tag-number">
                    № {card.number}
                  </span>
                )}
              </div>

              {/* Keywords */}
              <div className="keywords-container">
                <h3 className="section-title">Ключови думи</h3>
                <div className="keywords-list">
                  {card.keywords.split(',').map((keyword, index) => (
                    <span key={index} className="keyword-tag">
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* This is */}
              <div className="modal-section">
                <h3 className="section-title">Това е</h3>
                <p className="section-text">{card.this_is}</p>
              </div>

              {/* General Meaning */}
              <div className="modal-section">
                <h3 className="section-title">Значение</h3>
                <p className="section-text">{card.general_meaning}</p>
              </div>

              {/* Advice */}
              <div className="advice-box">
                <h3>✨ Съвет от картата</h3>
                <p>{card.advice}</p>
              </div>

              {/* Read More Section */}
              {!showMore ? (
                <button
                  onClick={() => setShowMore(true)}
                  className="read-more-btn"
                >
                  + Покажи повече информация
                </button>
              ) : (
                <div className="mt-6">
                  {/* Symbolism */}
                  <div className="modal-section">
                    <h3 className="section-title">Символика</h3>
                    <ul className="symbolism-list">
                      {card.cardSymbolism.map((symbol, index) => (
                        <li key={index}>{symbol}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Reversed */}
                  <div className="reversed-box">
                    <h3>Обърната позиция</h3>
                    <p>{card.reversed}</p>
                  </div>

                  {/* Astrology */}
                  <div className="astrology-grid">
                    <div className="astrology-item">
                      <div className="astrology-label">Планета</div>
                      <div className="astrology-value">{card.planet}</div>
                    </div>
                    <div className="astrology-item">
                      <div className="astrology-label">Зодия</div>
                      <div className="astrology-value">{card.zodiac_sign}</div>
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