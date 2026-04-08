import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { donationAPI } from '../utils/apiClient';
import './AddDonation.css';

export default function AddDonation() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('books');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Only image files are allowed (jpeg, jpg, png, gif, webp)');
        return;
      }

      setImage(file);
      setError('');

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Basic validation
    if (!title || !quantity || !location) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (!isAuthenticated) {
      setError('You must be logged in to add a donation');
      setLoading(false);
      return;
    }

    try {
      const donationData = {
        title,
        category,
        quantity: parseInt(quantity),
        location,
        description,
        image
      };

      const response = await donationAPI.createDonation(donationData);

      if (response.data.success) {
        setSuccess('✅ Donation added successfully! Organizations can now see it.');
        setTimeout(() => {
          navigate('/donor-dashboard');
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to add donation');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to add donation';
      setError(errorMsg);
      console.error('Donation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-donation-page">
      <div className="add-donation-container">
        <div className="add-donation-card">
          <Link to="/donor-dashboard" className="back-link">← Back to Dashboard</Link>
          
          <div className="form-header">
            <h1>📦 Add a New Donation</h1>
            <p>Share an item you'd like to donate</p>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit} className="donation-form">
            <div className="form-group">
              <label htmlFor="title">Item Name *</label>
              <input
                type="text"
                id="title"
                placeholder="e.g., Calculus Textbook, Winter Jacket"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={loading}
              >
                <option value="books">📚 Books</option>
                <option value="clothing">👔 Clothing</option>
                <option value="electronics">💻 Electronics</option>
                <option value="furniture">🪑 Furniture</option>
                <option value="food">🍎 Food & Groceries</option>
                <option value="medical">⚕️ Medical Supplies</option>
                <option value="other">🎁 Other</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quantity">Quantity *</label>
                <input
                  type="number"
                  id="quantity"
                  placeholder="e.g., 5"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Pickup Location *</label>
                <input
                  type="text"
                  id="location"
                  placeholder="e.g., Downtown Campus, Home Address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Item Description</label>
              <textarea
                id="description"
                placeholder="Describe the condition and details of the item"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Upload Photo (Optional)</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
                disabled={loading}
              />
              <p className="file-info">Max file size: 5MB. Supported formats: JPG, PNG, GIF, WebP</p>
              
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="btn-remove-image"
                    disabled={loading}
                  >
                    ✕ Remove Image
                  </button>
                </div>
              )}
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? '⏳ Adding Donation...' : '✅ Add Donation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
      <div className="add-donation-container">
        <div className="add-donation-card">
          <Link to="/donor-dashboard" className="back-link">← Back to Dashboard</Link>
          
          <div className="form-header">
            <h1>Add a New Donation</h1>
            <p>Share an item you'd like to donate</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="donation-form">
            <div className="form-group">
              <label htmlFor="title">Item Name *</label>
              <input
                type="text"
                id="title"
                placeholder="e.g., Calculus Textbook, Winter Jacket"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="books">Books</option>
                <option value="clothing">Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="food">Food & Groceries</option>
                <option value="medical">Medical Supplies</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quantity">Quantity *</label>
                <input
                  type="number"
                  id="quantity"
                  placeholder="e.g., 5"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Pickup Location *</label>
                <input
                  type="text"
                  id="location"
                  placeholder="e.g., Downtown Campus"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Item Description</label>
              <textarea
                id="description"
                placeholder="Describe the condition and details of the item"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Upload Photo (Optional)</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
              <p className="file-info">Max file size: 5MB. Supported formats: JPG, PNG, GIF, WebP</p>
              
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="btn-remove-image"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Donation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
