// src/components/Card.jsx
import React from 'react';
import './styles/styles.css';

const Card = ({ card, handleClick, flipped, disabled }) => {
  return (
    <div 
      className={`card ${flipped ? 'flipped' : ''}`} 
      onClick={() => !disabled && handleClick(card)}
    >
      {flipped ? (
        <img 
          src={card.img} 
          alt="card" 
          onError={(e) => e.target.alt = 'Imagem não carregada'}
        />
      ) : (
        <span>?</span>
      )}
    </div>
  );
};

export default Card;
