import React from 'react'
import './Navbar.css'
import { useState } from 'react'

const Navbar = ({ activeCategory, setActiveCategory }) => {
  const categories = ['Overview', 'Nature', 'People', 'Still Life', 'Travel'];

  return (
    <div className='navbar'>
      <ul className='nav-menu'>
        {categories.map((category) => (
          <li 
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Navbar
