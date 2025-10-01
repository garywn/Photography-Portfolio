import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import './Gallery.css';
import { supabase } from '../../utils/supabase';

const Gallery = ({ activeCategory }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

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
        {filteredImages.map((image) => (
          <div key={image.id} className="gallery-item">
            <img src={image.url} alt={`Photography ${image.id}`} />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default Gallery;