import React, { useContext } from 'react'
import { AppContext } from '../App'

const GameOver = () => {
     const {gameOver, correctWord, currAttempt, streak, highestStreak, resetGame} = useContext(AppContext)

  const handlePlayAgain = () => {
    resetGame();
  }

  return (
    <div className="modal-overlay" onClick={handlePlayAgain}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h1>{gameOver.guessedWord ? "You Won!" : "You lost."}</h1>

      <div>
          <p className="text-xl text-white">{gameOver.guessedWord ? `You guessed ${correctWord} in ${currAttempt.attemptVal} attempt${currAttempt.attemptVal > 1 ? "s" : ""}!` : `The correct word was ${correctWord}`}</p>
      </div>

      <div>
          <p className="text-xl font-bold text-white">Win Streak:</p>
          <h1>🔥 {streak}</h1>
      </div>

      <div>
          <p className="text-sm text-white">Your highest streak:</p>
          <h2 className="text-2xl font-bold text-white">{highestStreak}</h2>
      </div>

      <button onClick={handlePlayAgain}>Play Again</button>
      </div>
    </div>
  )
}

export default GameOver