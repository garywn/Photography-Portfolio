import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="menu-button" onClick={toggleMenu}>
        {isOpen ? 'CLOSE' : 'MENU'}
      </button>

      {isOpen && (
        <div className="menu-overlay" onClick={toggleMenu}>
          <div className="menu-sidebar" onClick={(e) => e.stopPropagation()}>
            <nav className="menu-nav">
              <Link to="/" className="menu-link" onClick={toggleMenu}>Home</Link>
              <Link to="/upload" className="menu-link" onClick={toggleMenu}>Upload</Link>
              <Link to="/about" className="menu-link" onClick={toggleMenu}>About Me</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;