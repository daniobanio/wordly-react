import React, { useContext } from 'react'
import { AppContext } from '../App';

const Key = ({ keyVal, bigKey }) => {
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

  return (
     // If bigKey === true, ID => "big"
    <div className="key" id={bigKey && "big"} onClick={selectLetter}>{keyVal}</div>
  )
}

export default Key