import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddDonation.css';

export default function AddDonation() {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('books');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!itemName || !quantity || !location) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/donations', {
        itemName,
        category,
        quantity: parseInt(quantity),
        location,
        description
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      alert('Donation added successfully!');
      navigate('/my-donations');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add donation');
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
            <h1>Add a New Donation</h1>
            <p>Share an item you'd like to donate</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="donation-form">
            <div className="form-group">
              <label htmlFor="itemName">Item Name</label>
              <input
                type="text"
                id="itemName"
                placeholder="e.g., Calculus Textbook, Winter Jacket"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
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
                <label htmlFor="quantity">Quantity</label>
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
                <label htmlFor="location">Pickup Location</label>
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

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Donation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
