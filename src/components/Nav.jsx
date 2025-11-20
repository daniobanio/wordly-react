import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

const Nav = () => {
  return (
    <nav>
     <div className="nav-left">
          <FontAwesomeIcon icon="fa-regular fa-circle-question" />
          <FontAwesomeIcon icon="fa-solid fa-earth-americas" />
     </div>
     <div className="text-3xl text-black">
          <h1>Lettrs</h1>
     </div>
     <div className="nav-right">
          <FontAwesomeIcon icon="fa-solid fa-gear" />
          <FontAwesomeIcon icon="fa-solid fa-chart-simple" />
     </div>
    </nav>
  )
}

export default Nav