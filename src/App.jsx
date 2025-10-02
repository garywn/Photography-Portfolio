import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './Components/Menu/Menu.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import Hero from './Components/Hero/Hero.jsx'
import Gallery from './Components/Gallery/Gallery.jsx'
import Upload from './Components/Upload/Upload.jsx'

const App = () => {
  const [activeCategory, setActiveCategory] = useState('Overview');

  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        {/* Main portfolio page */}
        <Route path="/" element={
          <>
            <Hero />
            <Navbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <Gallery activeCategory={activeCategory} />
          </>
        } />
        
        {/* Upload page */}
        <Route path="/upload" element={<Upload />} />
        
        {/* About page - create later */}
        <Route path="/about" element={
          <div style={{ padding: '4rem' }}>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App