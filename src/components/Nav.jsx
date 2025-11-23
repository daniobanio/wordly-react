import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { AppContext } from '../App'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

const Nav = () => {
  const { openModal } = useContext(AppContext);

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-section">
          <FontAwesomeIcon icon="fa-regular fa-circle-question" className="nav-icon" />
          <FontAwesomeIcon 
            icon="fa-solid fa-earth-americas" 
            className="nav-icon-desktop" 
            onClick={() => openModal('lang')}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <h1 className="nav-title">Wordly</h1>
        <div className="nav-section">
          <FontAwesomeIcon icon="fa-solid fa-gear" className="nav-icon" />
          <FontAwesomeIcon icon="fa-solid fa-chart-simple" className="nav-icon-desktop" />
        </div>
      </div>
    </nav>
  )
}

export default Nav