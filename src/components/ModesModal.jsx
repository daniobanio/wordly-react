import React, { useContext } from 'react'
import { AppContext } from '../App'

const ModesModal = () => {
  const { closeModal } = useContext(AppContext);

  return (
    <div className="modal-overlay" onClick={() => closeModal('modes')}>
      <div className="close-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={() => closeModal('modes')}>X</button>
        <h1>Gamemodes</h1>
        <div className="flex flex-row gap-5">
          <div className="mode-card bg-[url('./assets/img/gamemodes/mode_classic.png')] h-screen bg-cover bg-center bg-no-repeat">
            <h1>Classic</h1>
            <p>Endless Mode. <br /> Try to build your best streak!</p>
          </div>
          <div className="disabled mode-card bg-[url('./assets/img/gamemodes/mode_daily.png')] h-screen bg-cover bg-center bg-no-repeat">
            <h1>Daily</h1>
            <p>Guess the word of the day!</p>
          </div>
          <div className="disabled mode-card bg-[url('./assets/img/gamemodes/mode_versus.png')] h-screen bg-cover bg-center bg-no-repeat">
            <h1>Versus</h1>
            <p>Compete against another player!</p>
          </div>
          <div className="mode-card bg-[url('./assets/img/gamemodes/mode_octa.png')] h-screen bg-cover bg-center bg-no-repeat">
            <h1>Octa Wordly</h1>
            <p>Solve eight words at the same time!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModesModal