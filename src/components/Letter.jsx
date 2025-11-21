import React, { useContext } from 'react'
import { AppContext } from '../App';

// letterPos and attemptVal tells us the exact location of the letter in the board
const Letter = ({ letterPos, attemptVal }) => {
  // Access letter board position
  const { board } = useContext(AppContext)
  const letter = board[attemptVal][letterPos];

  return (
    <div className="letter">{letter}</div>
  )
}

export default Letter