import React, { useContext, useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { AppContext } from '../App'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

const Nav = () => {
  const { openModal } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleMobileMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuOptionClick = (modal) => {
    openModal(modal);
    setMobileMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && mobileMenuOpen) {
        // Check if click is not on the hamburger icon
        if (!event.target.closest('.nav-icon-mobile')) {
          setMobileMenuOpen(false);
        }
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="nav" ref={menuRef}>
      <div className="nav-container">
        <div className="nav-section">
          <FontAwesomeIcon 
            icon="fa-regular fa-circle-question" 
            className="nav-icon" 
            onClick={() => openModal('onboarding')}
            style={{ cursor: 'pointer' }}
          />
          <FontAwesomeIcon 
            icon="fa-solid fa-earth-americas" 
            className="nav-icon-desktop" 
            onClick={() => openModal('lang')}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <h1 className="nav-title">Wordly</h1>
        <div className="nav-section">
          <FontAwesomeIcon 
            icon="fa-solid fa-bars-staggered" 
            className="nav-icon-mobile" 
            onClick={handleMobileMenuClick}
            style={{ cursor: 'pointer' }}
          />
          <FontAwesomeIcon 
            icon="fa-solid fa-dice" 
            className="nav-icon-desktop"
            onClick={() => openModal('modes')}  
            style={{ cursor: 'pointer'}}
          />
          <FontAwesomeIcon icon="fa-solid fa-chart-simple" className="nav-icon-desktop" />
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div 
            className="mobile-menu-item"
            onClick={() => handleMenuOptionClick('lang')}
          >
            <FontAwesomeIcon icon="fa-solid fa-earth-americas" className="mobile-menu-icon" />
            <span>Languages</span>
          </div>
          <div 
            className="mobile-menu-item"
            onClick={() => handleMenuOptionClick('modes')}
          >
            <FontAwesomeIcon icon="fa-solid fa-dice" className="mobile-menu-icon" />
            <span>Gamemodes</span>
          </div>
          <div 
            className="mobile-menu-item"
            onClick={() => handleMenuOptionClick('stats')}
          >
            <FontAwesomeIcon icon="fa-solid fa-chart-simple" className="mobile-menu-icon" />
            <span>Stats</span>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav