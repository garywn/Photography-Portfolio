import React, { useState } from 'react';
import './Upload.css';
import { supabase } from '../../utils/supabase';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('NATURE');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const categories = ['OVERVIEW', 'NATURE', 'PEOPLE', 'STILL LIFE', 'TRAVEL'];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      // Generate unique filename
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('Pictures')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('Pictures')
        .getPublicUrl(filePath);

      // Insert into database
      const { error: dbError } = await supabase
        .from('photos')
        .insert([
          { 
            url: publicUrl, 
            category: category 
          }
        ]);

      if (dbError) throw dbError;

      setMessage('Photo uploaded successfully!');
      setSelectedFile(null);
      
      // Reset file input
      document.getElementById('fileInput').value = '';

    } catch (error) {
      console.error('Error uploading:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Photo</h2>
      
      <div className="upload-form">
        <div className="form-group">
          <label>Select Image:</label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
          />
          {selectedFile && (
            <p className="file-name">Selected: {selectedFile.name}</p>
          )}
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            disabled={uploading}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleUpload} 
          disabled={uploading || !selectedFile}
          className="upload-button"
        >
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </button>

        {message && (
          <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Upload;