import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

const Nav = () => {
  return (
    <nav className="border-b border-[#2F2F2F]">
      <div className="max-w-xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">
        <div className="flex items-center gap-3 md:gap-4">
          <FontAwesomeIcon icon="fa-regular fa-circle-question" className="text-white text-3xl" />
          <FontAwesomeIcon icon="fa-solid fa-earth-americas" className="text-white text-3xl hidden md:block" />
        </div>
        <h1 className="text-5xl font-bold text-white">Lettrs</h1>
        <div className="flex items-center gap-3 md:gap-4">
          <FontAwesomeIcon icon="fa-solid fa-gear" className="text-white text-3xl" />
          <FontAwesomeIcon icon="fa-solid fa-chart-simple" className="text-white text-3xl hidden md:block" />
        </div>
      </div>
    </nav>
  )
}

export default Nav