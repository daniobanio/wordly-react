import React, { useContext, useEffect, useRef } from 'react'
import { AppContext } from '../App';
import { playSound } from '../utils/sounds';

// letterPos and attemptVal tells us the exact location of the letter in the board
const Letter = ({ letterPos, attemptVal }) => {
  // Access letter board position
  const { board, correctWord, currAttempt, 
    setDisabledLetters,
    setAlmostLetters,
    setCorrectLetters,
    animatingRow,
    revealedLetters,
   } = useContext(AppContext)
  const letter = board[attemptVal][letterPos];

  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== '' && correctWord.includes(letter)

  // Check if this letter should show its state
  // Either the row has been completed (moved past) OR it's been revealed during animation
  const isRevealed = currAttempt.attemptVal > attemptVal || revealedLetters.has(`${attemptVal}-${letterPos}`);
  const letterState = isRevealed ? (correct ? "correct" : almost ? "almost" : "error") : undefined

  // Check if this letter should be animating
  const isAnimating = animatingRow === attemptVal;
  const animationDelay = isAnimating ? letterPos * 0.25 : 0; // 250ms delay between letters
  const hasPlayedFlipSound = useRef(false);

  useEffect(() => {
    if (isAnimating && !hasPlayedFlipSound.current && letter !== '') {
      const soundDelay = letterPos * 250;
      setTimeout(() => {
        if (correct || almost) {
          playSound('flipCorrect');
        } else {
          playSound('flip');
        }
      }, soundDelay);
      hasPlayedFlipSound.current = true;
    }
    if (!isAnimating) {
      hasPlayedFlipSound.current = false;
    }
  }, [isAnimating, letterPos, letter, correct, almost]);

  useEffect(() => {
    // Add letter to disabled/almost/correct letters array
    if (letter !== "" && !correct && !almost) {
      // Grab current state (prev) and add letter to the array
      setDisabledLetters((prev) => [...prev, letter])
    } else if (letter !== "" && !correct) {
      setAlmostLetters((prev) => [...prev, letter])
    } else {
      setCorrectLetters((prev) => [...prev, letter])
    }
  }, [currAttempt.attemptVal])

  return (
    <div 
      className={`letter ${isAnimating ? 'guess-animating' : ''}`}
      id={letterState}
      style={isAnimating ? { animationDelay: `${animationDelay}s` } : {}}
    >
      {letter}
    </div>
  )
}

export default Letter