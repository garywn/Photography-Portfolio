import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import './Gallery.css';
import { supabase } from '../../utils/supabase';
// LIGHTBOX UPDATE: Import the Lightbox component for full-screen image viewing
import Lightbox from '../Lightbox/Lightbox';

const Gallery = ({ activeCategory }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  // LIGHTBOX UPDATE: State to track which image is currently selected in the lightbox
  const [selectedImage, setSelectedImage] = useState(null);
  // LIGHTBOX UPDATE: State to track the index of the current image for navigation
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  // Refresh images every 5 seconds to catch new uploads
  useEffect(() => {
    const interval = setInterval(() => {
      fetchImages();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter images based on active category
  const filteredImages = activeCategory === 'Overview' 
    ? images 
    : images.filter(img => img.category === activeCategory.toUpperCase());

  // LIGHTBOX UPDATE: Handler to open lightbox when an image is clicked
  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  // LIGHTBOX UPDATE: Navigate to the next image in the lightbox
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  // LIGHTBOX UPDATE: Navigate to the previous image in the lightbox
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  // LIGHTBOX UPDATE: Close the lightbox
  const handleClose = () => {
    setSelectedImage(null);
  };

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1
  };

  if (loading) {
    return <div className="gallery-container">Loading...</div>;
  }

  if (filteredImages.length === 0) {
    return (
      <div className="gallery-container">
        <p style={{ textAlign: 'center', color: '#9ca3af', padding: '4rem' }}>
          No photos in this category yet. Upload some photos to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <Masonry
        breakpointCols={breakpointColumns}
        className="gallery-masonry"
        columnClassName="gallery-masonry-column"
      >
        {/* LIGHTBOX UPDATE: Added onClick handler to each image and pass index for navigation */}
        {filteredImages.map((image, index) => (
          <div 
            key={image.id} 
            className="gallery-item"
            onClick={() => handleImageClick(image, index)}
          >
            <img src={image.url} alt={`Photography ${image.id}`} />
          </div>
        ))}
      </Masonry>

      {/* LIGHTBOX UPDATE: Render Lightbox component when an image is selected */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
};

export default Gallery;