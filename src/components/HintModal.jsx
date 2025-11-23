import React, { useContext } from 'react'
import { AppContext } from '../App'

const HintModal = () => {
  const { hints, closeModal } = useContext(AppContext);

  return (
    // Click outside the modal to close it
    <div className="modal-overlay" onClick={() => closeModal('hint')}>
      {/* Prevent closing the modal when clicking the modal */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1>Hints</h1>

        <div className="hint-row">
          {/* Display revealed letters or "?" for unrevealed positions */}
          {hints.map((letter, index) => (
            // Add the "correct" id styling to revealed letters
            <div key={index} className="letter" id={letter ? "correct" : undefined}>
              {letter || '?'}
            </div>
          ))}
        </div>

        <button onClick={() => closeModal('hint')}>Continue</button>
      </div>
    </div>
  )
}

export default HintModal