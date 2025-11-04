import React, { useState } from 'react';
import axios from 'axios';
import TopSearchesBanner from './TopSearchesBanner';
import SearchBar from './SearchBar';
import ImageGrid from './ImageGrid';
import SearchHistory from './SearchHistory';
import Header from './Header';
import Spinner from './Spinner';
import Message from './Message';
import './DashboardPage.css';

const DashboardPage = ({ user, setUser }) => {
  const [images, setImages] = useState([]);
  const [lastSearch, setLastSearch] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      await axios.get('https://image-search-x84b.onrender.com/auth/logout', { withCredentials: true });
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      setError('Logout failed. Please try again.');
      console.error('Logout error:', err);
    }
  };

  const handleSearch = async (term) => {
    if (!term) {
      setError('Please enter a search term.');
      return;
    }
    setLoading(true);
    setError(null);
    setImages([]);
    try {
      const res = await axios.post(
        'https://image-search-x84b.onrender.com/api/search',
        { term },
        { withCredentials: true }
      );
      setImages(res.data.results || []);
      setLastSearch(term);
      setSelectedImages([]);
      if ((res.data.results || []).length === 0) {
        setError('No images found for your search.');
      }
    } catch (err) {
      setError('Error searching images. Please try again later.');
      console.error('Error searching images:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectImage = (id) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((imageId) => imageId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div>
      <Header user={user} onLogout={handleLogout} />
      {loading && <Spinner />}
      
      <div className="dashboard-container">
        <TopSearchesBanner onSearch={handleSearch} />
        <h1 className="dashboard-title">Image Search</h1>
        <SearchBar onSearch={handleSearch} />

        {error && <Message text={error} type="error" />}

        {lastSearch && !error && (
          <div className="search-results-info">
            <h3>
              Showing results for "{lastSearch}"
            </h3>
            <h4>
              {selectedImages.length > 0
                ? `${selectedImages.length} image${selectedImages.length > 1 ? 's' : ''} selected`
                : `${images.length} image${images.length !== 1 ? 's' : ''} found`
              }
            </h4>
          </div>
        )}

        <div className="dashboard-content">
          <div className="image-grid-section">
            {images.length > 0 ? (
              <ImageGrid
                images={images}
                onSelect={handleSelectImage}
                selectedImages={selectedImages}
              />
            ) : (
              !loading && !error && <Message text="Search for images to see results." type="info" />
            )}
          </div>
          <div className="search-history-section">
            <SearchHistory onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
