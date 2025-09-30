import React from 'react'
import './Navbar.css'
import { useState } from 'react'

const Navbar = () => {

  const [activeCategory, setActiveCategory] = useState('Overview');

  return (
    <div className='navbar'>
      <ul className='nav-menu'>
        <li className={activeCategory === 'Overview' ? 'active' : ''} onClick={() => setActiveCategory('Overview')}>Overview</li>
        <li className={activeCategory === 'Nature' ? 'active' : ''} onClick={() => setActiveCategory('Nature')}>Nature</li>
        <li className={activeCategory === 'People' ? 'active' : ''} onClick={() => setActiveCategory('People')}>People</li>
        <li className={activeCategory === 'Still Life' ? 'active' : ''} onClick={() => setActiveCategory('Still Life')}>Still Life</li>
        <li className={activeCategory === 'Travel' ? 'active' : ''} onClick={() => setActiveCategory('Travel')}>Travel</li>
      </ul>
    </div>
  )
}

export default Navbar
