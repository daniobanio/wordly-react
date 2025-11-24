import React, { useContext, useEffect } from 'react'
import { AppContext } from '../App'

const GameOver = () => {
  const {gameOver, correctWord, currAttempt, streak, highestStreak, resetGame, language} = useContext(AppContext)

  const handlePlayAgain = () => {
    resetGame();
  }

  useEffect(() => {
    let listenerAdded = false;
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        resetGame();
      }
    };

    const timeoutId = setTimeout(() => {
      window.addEventListener('keydown', handleKeyPress);
      listenerAdded = true;
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (listenerAdded) {
        window.removeEventListener('keydown', handleKeyPress);
      }
    };
  }, [resetGame]);

  return (
    <div className="modal-overlay" onClick={handlePlayAgain}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h1>{gameOver.guessedWord ? language.translations.youWon : language.translations.youLost}</h1>

      <div>
          <p className="text-xl text-white">{gameOver.guessedWord ? language.translations.guessedIn(correctWord, currAttempt.attemptVal) : language.translations.correctWas(correctWord)}</p>
      </div>

      <div>
          <p className="text-xl font-bold text-white">{language.translations.streak}</p>
          <h1>🔥 {streak}</h1>
      </div>

      <div>
          <p className="text-sm text-white">{language.translations.bestStreak}</p>
          <h2 className="text-2xl font-bold text-white">{highestStreak}</h2>
      </div>

      <button onClick={handlePlayAgain}>{language.translations.playAgain}</button>
      </div>
    </div>
  )
}

export default GameOver