import React, { useContext } from 'react'
import { AppContext } from '../App'

const LangModal = () => {
  const { closeModal } = useContext(AppContext);

  return (
    <div className="modal-overlay" onClick={() => closeModal('lang')}>
      {/* Prevent closing the modal when clicking the modal */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => closeModal('lang')}>X</button>

        <h1>Languages</h1>
        <div className="languages-wrapper">
          {/* English */}
          <div className="language">EN</div>
          {/* Spanish */}
          <div className="language">ES</div>
          {/* French */}
          <div className="language">FR</div>
          {/* German */}
          <div className="language">DE</div>
          {/* Tagalog */}
          <div className="language">PH</div>
        </div>
      </div>
    </div>
  )
}

export default LangModal