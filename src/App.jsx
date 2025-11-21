import Nav from "./components/Nav";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault } from "./Words";
import { createContext, useState } from "react";

export const AppContext = createContext();

export default function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({letterPos: 0, attemptVal: 0})
  
  const correctWord = "RIGHT";

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
      // increment attemptVal to move to next line
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


  return (
    <>
      <Nav />
      {/* Through the context API, the board and setBoard states are accessable to all of our components */}
      <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onEnter, onDelete, correctWord}}>
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </>
  )
}