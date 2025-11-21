import React, { useContext, useEffect } from 'react'
import { AppContext } from '../App';

// letterPos and attemptVal tells us the exact location of the letter in the board
const Letter = ({ letterPos, attemptVal }) => {
  // Access letter board position
  const { board, correctWord, currAttempt, setDisabledLetters } = useContext(AppContext)
  const letter = board[attemptVal][letterPos];

  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== '' && correctWord.includes(letter)

  // When Enter is pressed, onEnter() increments currAttempt.attemptVal to move to the next row
  // This checks: "Has the user moved past this row?" (currAttempt.attemptVal > attemptVal)
  // If yes, this row was submitted, so show the color state (correct/almost/error)
  // If no, the user is still typing on this row, so don't show colors yet (letterState = undefined)
  const letterState =
     currAttempt.attemptVal > attemptVal && (correct ? "correct" : almost ? "almost" : "error")

     useEffect(() => {
          // Add letter to disabled letters array
          if (letter !== "" && !correct && !almost) {
               // Grab current state (prev) and add letter to the array
               setDisabledLetters((prev) => [...prev, letter])
          }
     }, [currAttempt.attemptVal])

  return (
    <div className="letter" id={letterState}>{letter}</div>
  )
}

export default Letter