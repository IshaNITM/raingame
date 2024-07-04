import React, { useState, useEffect } from 'react';

const FallingRain = () => {
  const [gridSize, setGridSize] = useState({ rows: 50, cols: 60 });
  const [rainDrops, setRainDrops] = useState([]);

  useEffect(() => {
    const generateRainDrops = () => {
      const newRainDrops = [];
      for (let i = 0; i < gridSize.rows; i++) {
        for (let j = 0; j < gridSize.cols; j++) {
          const random = Math.random();
          if (random < 0.2) {
            newRainDrops.push({
              x: j,
              y: i,
              color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${random})`,
            });
          }
        }
      }
      setRainDrops(newRainDrops);
    };
    generateRainDrops();
    const interval = setInterval(() => {
      generateRainDrops();
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleGridSizeChange = (event) => {
    const value = parseInt(event.target.value);
    setGridSize({ rows: value, cols: value });
  };

  return (
    <div className="container">
      <div className="game-title">Falling Rain</div>
      <div className="controls">
        <label htmlFor="gridSize">Grid Size:</label>
        <input
          type="number"
          id="gridSize"
          min="5"
          max="30"
          value={gridSize.rows}
          onChange={handleGridSizeChange}
        />
      </div>
      <div className="rain-grid">
        {rainDrops.map((drop, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: `${drop.y * 30}px`,
              left: `${drop.x *30}px`,
              width: '30px',
              height: '30px',
              backgroundColor: drop.color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FallingRain;


