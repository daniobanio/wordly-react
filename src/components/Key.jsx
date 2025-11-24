import React, { useContext } from 'react'
import { AppContext } from '../App';

const Key = ({ keyVal, bigKey, disabled, almost, correct, label }) => {
     const {onDelete, onSelectLetter, onEnter } = useContext(AppContext)
     const selectLetter = () => {
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
    disabled && "disabled",
    almost && "almost",
    correct && "correct"
  ].filter(Boolean).join(" ");

  return (
    <div 
      className={keyClasses}
      onClick={selectLetter}
    >{label || keyVal}</div>
  )
}

export default Key