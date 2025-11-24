import React, { useCallback, useEffect, useContext } from 'react'
import Key from './Key';
import { AppContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Keyboard = () => {
     const {onDelete,
          onSelectLetter,
          onEnter,
          disabledLetters,
          almostLetters,
          correctLetters,
          gameOver,
          language } = useContext(AppContext)
     
     const { keys } = language;
     const { line1, line2, line3 } = keys;

     // useCallback to prevent re-updating our components and functions unnecessarily
     const handleKeyboard = useCallback((e) => {
          if (gameOver.gameOver) return;

          if (e.key === "Enter") {
               onEnter();
          } else if (e.key === "Backspace") {
               onDelete();

          // Typing a letter
          // Iterate through each letter
          // If the key press matches the letter, select it 
          } else {
               [...line1, ...line2, ...line3].forEach((key) => {
                    if (e.key.toLowerCase() === key.toLowerCase()) {
                         onSelectLetter(key)
                    }
               })
          }
     }, [onEnter, onDelete, onSelectLetter, gameOver, line1, line2, line3])


     useEffect(() => {
          document.addEventListener("keydown", handleKeyboard)

          return () => {
               document.removeEventListener("keydown", handleKeyboard)
          }
     }, [handleKeyboard])

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
     <div className="line1">
          {line1.map((key) => {
               return <Key 
               key={key}
               keyVal={key}
               disabled={disabledLetters.includes(key)}
               almost={almostLetters.includes(key)}
               correct={correctLetters.includes(key)}
               />
          })}
     </div>
     <div className="line2">
          {line2.map((key) => {
               return <Key 
               key={key}
               keyVal={key}
               disabled={disabledLetters.includes(key)}
               almost={almostLetters.includes(key)}
               correct={correctLetters.includes(key)}
               />
          })}
     </div>
     <div className="line3">
          <Key keyVal={'ENTER'} label={language.translations.enter} bigKey />
          {line3.map((key) => {
               return <Key
               key={key}
               keyVal={key}
               disabled={disabledLetters.includes(key)}
               almost={almostLetters.includes(key)}
               correct={correctLetters.includes(key)}
               />
          })}
          <Key keyVal={'DELETE'} label={<FontAwesomeIcon icon="fa-solid fa-delete-left" className="text-3xl"/>} bigKey />
     </div>
    </div>
  )
}

export default Keyboard