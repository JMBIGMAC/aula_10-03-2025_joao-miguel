// src/components/GameBoard.jsx
import React, { useState, useEffect } from 'react';
import { cardsData } from '../data/cardsData';
import Card from './Card';
import './styles/styles.css';

const GameBoard = ({ totalCards }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  // Embaralha as cartas quando o número total de cartas mudar
  useEffect(() => {
    let shuffledCards = [...cardsData, ...cardsData].slice(0, totalCards);
    shuffledCards = shuffledCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, [totalCards]);

  // Verifica as cartas quando duas forem viradas
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      
      // Checa se as cartas viradas são iguais
      if (firstCard.id === secondCard.id) {
        setMatchedCards((prev) => [...prev, firstCard, secondCard]);
        setScore(score + 1);
      } else {
        setLives(lives - 1);
      }

      // Se perdeu todas as vidas, fim de jogo
      if (lives <= 0) {
        setGameOver(true);
      }

      // Limpa as cartas viradas após 1 segundo para que o jogador possa ver a comparação
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards, lives, score]);

  const handleCardClick = (card) => {
    // Verifica se a carta ainda não foi virada ou já foi encontrada como par
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
      setFlippedCards((prev) => [...prev, card]);
    }
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setMatchedCards([]);
    setFlippedCards([]);
    setGameOver(false);
  };

  return (
    <div className="game-board">
      {gameOver && (
        <div className="game-over">
          <p>Game Over! </p>
          <button onClick={resetGame}>Jogar Novamente</button>
        </div>
      )}
      <div className="score">Pontos: {score} | Vidas: {lives}</div>
      <div className="cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleClick={handleCardClick}
            flipped={flippedCards.includes(card) || matchedCards.includes(card)}
            disabled={flippedCards.length === 2 || matchedCards.includes(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
