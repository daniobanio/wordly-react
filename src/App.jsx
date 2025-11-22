import Nav from "./components/Nav";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import HintModal from "./components/HintModal";
import { boardDefault, generateWordSet } from "./Words";
import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export default function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({letterPos: 0, attemptVal: 0})
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})
  const [hints, setHints] = useState(Array(5).fill(null)); // Array to track revealed letters at each position
  const [showHintModal, setShowHintModal] = useState(false);

  useEffect(() => {
    generateWordSet()
      .then((words) => {
        setWordSet(words.wordSet);
        setCorrectWord(words.correctWord)
        console.log(`Correct Word: ${words.correctWord}`)
      })
  }, [])


  const onSelectLetter = (keyVal) => {
    // Can't input more than 5 letters
    if (currAttempt.letterPos > 4) return;
    // Select a letter => update the board at it's current letterPos and attemptVal with the new keyVal => increment the letterPos
    const newBoard = [...board]
    newBoard[currAttempt.attemptVal][currAttempt.letterPos] = keyVal
    setBoard(newBoard);
    // {attemptVal, letterPos}
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
    } 
  const onEnter = () => {
      // only ENTER if 5 letters
      if (currAttempt.letterPos !== 5) return;

      let currWord = "";
      for (let i = 0; i < 5; i++) {
        currWord += board[currAttempt.attemptVal][i];
      }

      // Check if word is valid (case-insensitive check against word bank)
      if (!wordSet.has(currWord.toLowerCase())) {
        alert('Word not valid')
        return;
      }

      // Check if player won (before moving to next attempt)
      if (currWord === correctWord) {
        setCurrAttempt({attemptVal: currAttempt.attemptVal + 1, letterPos: 0})
        setGameOver({gameOver: true, guessedWord: true})
        return
      }
      
      // Check if this was the last attempt (attempt 5 = 6th attempt, 0-indexed)
      if (currAttempt.attemptVal === 5) {
        setCurrAttempt({attemptVal: currAttempt.attemptVal + 1, letterPos: 0})
        setGameOver({gameOver: true, guessedWord: false})
        return
      }

      // Word is valid, move to next attempt
      setCurrAttempt({attemptVal: currAttempt.attemptVal + 1, letterPos: 0})
  }
  
  const onDelete = () => {
      if (currAttempt.letterPos === 0) return;
      const newBoard = [...board];
      // Go back one letterPos and make it blank
      // setBoard
      // Update current letterPos to go back one (or else it'll continue from the blank space) 
      newBoard[currAttempt.attemptVal][currAttempt.letterPos - 1] = "";
      setBoard(newBoard);
      setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1})
  }

  const getHint = () => {
    if (!correctWord) return;
    
    // Find all unrevealed positions
    const unrevealedPositions = hints
      .map((hint, index) => hint === null ? index : null)
      .filter(index => index !== null);
    
    // If all hints are revealed, don't do anything
    if (unrevealedPositions.length === 0) return;
    
    // Pick a random unrevealed position
    const randomIndex = unrevealedPositions[Math.floor(Math.random() * unrevealedPositions.length)];
    const letter = correctWord[randomIndex];
    
    // Update hints array with the revealed letter
    const newHints = [...hints];
    newHints[randomIndex] = letter;
    setHints(newHints);
    setShowHintModal(true);
  }

  const closeHintModal = () => {
    setShowHintModal(false);
  }


  return (
    <>
      <Nav />
      {/* Through the context API, the board and setBoard states are accessable to all of our components */}
      <AppContext.Provider value={{ 
        board, 
        setBoard, 
        currAttempt, 
        setCurrAttempt, 
        onSelectLetter, 
        onEnter, 
        onDelete, 
        correctWord, 
        disabledLetters, 
        setDisabledLetters, 
        almostLetters, 
        setAlmostLetters, 
        correctLetters, 
        setCorrectLetters, 
        setGameOver, 
        gameOver,
        hints,
        showHintModal,
        closeHintModal,
        }}>
        <div className="game">
          {showHintModal && <HintModal />}
          <Board />
          <button className="hint-btn" onClick={getHint}>Hint</button>
          <Keyboard />
          {gameOver.gameOver && (<GameOver />)}
        </div>
      </AppContext.Provider>
    </>
  )
}