import React, { useContext } from 'react'
import { AppContext } from '../App'

const GameOver = () => {
     const {gameOver, correctWord, currAttempt} = useContext(AppContext)

  return (
    <div className="gameover">
     <h3>{gameOver.guessedWord ? "You correctly guessed!" : "You failed."}</h3>
     <h1>Word: {correctWord}</h1>
     {gameOver.guessedWord && (<h3> You guessed in {currAttempt.attemptVal} attempts</h3>)}
    </div>
  )
}

export default GameOver