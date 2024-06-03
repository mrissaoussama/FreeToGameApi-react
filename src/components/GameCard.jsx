/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import useLazyLoadImage from './useLazyLoadImage';
const GameCard = ({ game, onGameClick }) => {
    const [imgRef, isIntersecting] = useLazyLoadImage();
    const [imgError, setImgError] = useState(false);
  
    return (
      <div className="game-card" onClick={() => onGameClick(game)}>
        <h3>{game.title}</h3>
        {isIntersecting ? (
          <img
            ref={imgRef}
            src={game.thumbnail}
            alt={game.title}
            onError={() => setImgError(true)}
            style={imgError ? { display: 'none' } : {}}
          />
        ) : (
          <div ref={imgRef} style={{ height: '150px', backgroundColor: '#ccc' }}>Loading...</div>
        )}
        {imgError && <p>Error loading image</p>}
        <p>{game.short_description}</p>
      </div>
    );
  };

export default GameCard;
