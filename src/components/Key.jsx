import React, { useContext } from 'react'
import { AppContext } from '../App';
import { playSound } from '../utils/sounds';

const Key = ({ keyVal, bigKey, disabled, almost, correct, label }) => {
     const {onDelete, onSelectLetter, onEnter } = useContext(AppContext)
     const selectLetter = () => {
          playSound('keyPress');
          if (keyVal === "ENTER") {
               onEnter();
          } else if (keyVal === "DELETE") {
               onDelete();
          } else {
               onSelectLetter(keyVal);
          }
}

  // Build className string with conditional classes
  const keyClasses = [
    "key",
    bigKey && "big",
    disabled && "disabledkey",
    almost && "almost",
    correct && "correct"
  ].filter(Boolean).join(" ");

  return (
    <div 
      className={keyClasses}
      onClick={selectLetter}
      onMouseEnter={() => playSound('keyHover')}
    >{label || keyVal}</div>
  )
}

export default Key