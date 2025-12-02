import React, { useContext } from 'react'
import { AppContext } from '../App'
import { playSound } from '../utils/sounds';

const LangModal = () => {
  const { closeModal, changeLanguage } = useContext(AppContext);

  const handleLanguage = (lang) => {
    changeLanguage(lang);
    closeModal(lang);
    playSound('chooseMode')
  }

  const handleClose = () => {
    playSound('modalClose');
    closeModal('lang');
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      {/* Prevent closing the modal when clicking the modal */}
      <div className="close-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={handleClose}>X</button>

        <h1>Languages</h1>
        <div className="languages-wrapper">
          {/* English */}
          <div className="language" onClick={() => handleLanguage('EN')}>English <span class="fi fi-us"></span></div>
          {/* Spanish */}
          <div className="language" onClick={() => handleLanguage('ES')}>Spanish <span class="fi fi-es"></span></div>
        </div>
      </div>
    </div>
  )
}

export default LangModal