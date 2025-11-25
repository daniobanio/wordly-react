import React, { useContext } from 'react'
import { AppContext } from '../App'

const LangModal = () => {
  const { closeModal, changeLanguage } = useContext(AppContext);

  return (
    <div className="modal-overlay" onClick={() => closeModal('lang')}>
      {/* Prevent closing the modal when clicking the modal */}
      <div className="close-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={() => closeModal('lang')}>X</button>

        <h1>Languages</h1>
        <div className="languages-wrapper">
          {/* English */}
          <div className="language" onClick={() => changeLanguage('EN')}>EN</div>
          {/* Spanish */}
          <div className="language" onClick={() => changeLanguage('ES')}>ES</div>
        </div>
      </div>
    </div>
  )
}

export default LangModal