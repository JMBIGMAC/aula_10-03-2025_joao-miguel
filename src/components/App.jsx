// src/components/App.jsx
import React, { useState } from 'react';
import GameBoard from './GameBoard';
import './App.css';

const App = () => {
  const [totalCards, setTotalCards] = useState(8); // 8, 16 ou 32 cartas

  return (
    <div className="app">
      <h1>Jogo da Memória</h1>
      <div className="card-options">
        <button onClick={() => setTotalCards(8)}>8 Cartas</button>
        <button onClick={() => setTotalCards(16)}>16 Cartas</button>
        <button onClick={() => setTotalCards(32)}>32 Cartas</button>
      </div>
      <GameBoard totalCards={totalCards} />
    </div>
  );
};

export default App;
