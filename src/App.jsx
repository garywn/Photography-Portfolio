import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar.jsx'
import Hero from './Components/Hero/Hero.jsx'
import Gallery from './Components/Gallery/Gallery.jsx'
import Upload from './Components/Upload/Upload.jsx'

const App = () => {
  const [activeCategory, setActiveCategory] = useState('Overview');

  return (
    <div>
      <Hero />
      <Navbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <Gallery activeCategory={activeCategory} />
      <Upload />
    </div>
  )
}

export default App