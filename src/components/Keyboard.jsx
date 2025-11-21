import React, { useCallback, useEffect, useContext } from 'react'
import Key from './Key';
import { AppContext } from '../App';

const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

const Keyboard = () => {
     const {onDelete, onSelectLetter, onEnter, disabledLetters } = useContext(AppContext)

     // useCallback to prevent re-updating our components and functions unnecessarily
     const handleKeyboard = useCallback((e) => {
          if (e.key === "Enter") {
               onEnter();
          } else if (e.key === "Backspace") {
               onDelete();

          // Typing a letter
          // Iterate through each letter
          // If the key press matches the letter, select it 
          } else {
               keys1.forEach((key) => {
                    if (e.key.toLowerCase() === key.toLowerCase()) {
                         onSelectLetter(key)
                    }
               })
               keys2.forEach((key) => {
                    if (e.key.toLowerCase() === key.toLowerCase()) {
                         onSelectLetter(key)
                    }
               })
               keys3.forEach((key) => {
                    if (e.key.toLowerCase() === key.toLowerCase()) {
                         onSelectLetter(key)
                    }
               })
          }
     }, [onEnter, onDelete, onSelectLetter])


     useEffect(() => {
          document.addEventListener("keydown", handleKeyboard)

          return () => {
               document.removeEventListener("keydown", handleKeyboard)
          }
     }, [handleKeyboard])

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
     <div className="line1">
          {keys1.map((key) => {
               return <Key keyVal={key} disabled={disabledLetters.includes(key)} />
          })}
     </div>
     <div className="line2">
          {keys2.map((key) => {
               return <Key keyVal={key} disabled={disabledLetters.includes(key)}/>
          })}
     </div>
     <div className="line3">
          <Key keyVal={'ENTER'} bigKey />
          {keys3.map((key) => {
               return <Key keyVal={key} disabled={disabledLetters.includes(key)}/>
          })}
          <Key keyVal={'DELETE'} bigKey />
     </div>
    </div>
  )
}

export default Keyboard