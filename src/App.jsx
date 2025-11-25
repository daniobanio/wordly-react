import Nav from "./components/Nav";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import HintModal from "./components/HintModal";
import LangModal from "./components/LangModal";
import ModesModal from "./components/ModesModal";
import { boardDefault, generateWordSet } from "./Words";
import { createContext, useState, useEffect, useCallback } from "react";
import { languages } from "./constants/languages";

export const AppContext = createContext();

// Helper functions for localStorage
const getStoredStreak = () => {
  const stored = localStorage.getItem('winStreak');
  return stored ? parseInt(stored, 10) : 0;
};

const getStoredHighestStreak = () => {
  const stored = localStorage.getItem('highestStreak');
  return stored ? parseInt(stored, 10) : 0;
};

const getStoredLanguage = () => {
  const stored = localStorage.getItem('language');
  return stored && languages[stored] ? languages[stored] : languages.EN;
}

const updateStreak = (newStreak) => {
  localStorage.setItem('winStreak', newStreak.toString());
  const highest = getStoredHighestStreak();
  if (newStreak > highest) {
    localStorage.setItem('highestStreak', newStreak.toString());
  }
};

const resetStreak = () => {
  localStorage.setItem('winStreak', '0');
};

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
  const [modals, setModals] = useState({ hint: false, lang: false, modes: false })
  const [streak, setStreak] = useState(getStoredStreak());
  const [highestStreak, setHighestStreak] = useState(getStoredHighestStreak());
  const [language, setLanguage] = useState(getStoredLanguage());
  const [animatingRow, setAnimatingRow] = useState(null);
  const [revealedLetters, setRevealedLetters] = useState(new Set());

  const resetGame = useCallback(() => {
    const newBoard = [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ];
    
    setBoard(newBoard);
    setCurrAttempt({letterPos: 0, attemptVal: 0});
    setDisabledLetters([]);
    setAlmostLetters([]);
    setCorrectLetters([]);
    setHints(Array(5).fill(null));
    setGameOver({gameOver: false, guessedWord: false});
    setAnimatingRow(null);
    setRevealedLetters(new Set());
    generateWordSet(language.wordList, language.encoding)
      .then((words) => {
        setWordSet(words.wordSet);
        setCorrectWord(words.correctWord);
        console.log(`Correct Word: ${words.correctWord}`);
      });
  }, [language]);

  useEffect(() => {
    resetGame();
  }, [resetGame])


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
      // Don't allow new guesses while animation is playing
      if (animatingRow !== null) return;

      let currWord = "";
      for (let i = 0; i < 5; i++) {
        currWord += board[currAttempt.attemptVal][i];
      }

      // Check if word is valid (case-insensitive check against word bank)
      if (!wordSet.has(currWord.toLowerCase())) {
        alert(language.translations.wordNotValid || 'Word not valid')
        return;
      }

      // Trigger animation for current row
      setAnimatingRow(currAttempt.attemptVal);
      setRevealedLetters(new Set());
      
      const ANIMATION_DURATION = 1500;
      const LETTER_DELAY = 0.25;
      const HALFWAY_POINT = 0.25;

      // Reveal each letter's state at the halfway point of its animation
      for (let i = 0; i < 5; i++) {
        const revealTime = (i * LETTER_DELAY) + HALFWAY_POINT;
        setTimeout(() => {
          setRevealedLetters(prev => new Set([...prev, `${currAttempt.attemptVal}-${i}`]));
        }, revealTime * 1000);
      }

      // Check if player won (before moving to next attempt)
      if (currWord === correctWord) {
        setTimeout(() => {
          const newStreak = streak + 1;
          setStreak(newStreak);
          updateStreak(newStreak);
          if (newStreak > highestStreak) {
            setHighestStreak(newStreak);
          }
          setCurrAttempt({attemptVal: currAttempt.attemptVal + 1, letterPos: 0})
          setGameOver({gameOver: true, guessedWord: true})
          setAnimatingRow(null);
          setRevealedLetters(new Set());
        }, ANIMATION_DURATION);
        return
      }
      
      // Check if this was the last attempt (attempt 5 = 6th attempt, 0-indexed)
      if (currAttempt.attemptVal === 5) {
        setTimeout(() => {
          setStreak(0);
          resetStreak();
          setCurrAttempt({attemptVal: currAttempt.attemptVal + 1, letterPos: 0})
          setGameOver({gameOver: true, guessedWord: false})
          setAnimatingRow(null);
          setRevealedLetters(new Set());
        }, ANIMATION_DURATION);
        return
      }

      // Word is valid, move to next attempt after animation
      setTimeout(() => {
        setCurrAttempt({attemptVal: currAttempt.attemptVal + 1, letterPos: 0})
        setAnimatingRow(null);
        setRevealedLetters(new Set());
      }, ANIMATION_DURATION);
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
    openModal('hint');
  }

  const openModal = (modal) => {
    setModals(prev => ({ ...prev, [modal]: true}))
  }

  const closeModal = (modal) => {
    setModals(prev => ({ ...prev, [modal]: false}))

  }

  const changeLanguage = (langCode) => {
    localStorage.setItem('language', langCode);
    setLanguage(languages[langCode]);
    closeModal('lang');
  }

  return (
    <>
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
        modals,
        setModals,
        openModal,
        closeModal,
        streak,
        highestStreak,
        resetGame,
        language,
        changeLanguage,
        animatingRow,
        revealedLetters
        }}>
        <Nav />
        <div className="game">
          {modals.modes && <ModesModal />}
          {modals.lang && <LangModal />}
          {modals.hint && <HintModal />}
          <Board />
          <button className="hint-btn" onClick={getHint}>{language.translations.hint}</button>
          <Keyboard />
          {gameOver.gameOver && (<GameOver />)}
        </div>
      </AppContext.Provider>
    </>
  )
}
