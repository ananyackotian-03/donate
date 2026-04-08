import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { organizationAPI } from '../utils/apiClient';
import './CreateOrganization.css';

export default function CreateOrganization() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'ngo',
    registrationNo: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
    website: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRoleConversion, setShowRoleConversion] = useState(false);
  const { user, updateUser, isDonor } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConvertRole = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await organizationAPI.convertToOrganization();
      if (response.data.success) {
        updateUser({ ...user, role: 'organization' });
        setSuccess('Successfully converted to organization role! Now create your organization.');
        setShowRoleConversion(false);
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to convert role');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.description || !formData.address || !formData.contactEmail) {
      setError('Please fill in all required fields marked with *');
      setLoading(false);
      return;
    }

    if (user?.role !== 'organization' && user?.role !== 'admin') {
      setError('You must be an organization to create an organization');
      setLoading(false);
      return;
    }

    try {
      const response = await organizationAPI.createOrganization(formData);

      if (response.data.success) {
        setSuccess('🎉 Organization created successfully! It is now pending admin verification.');
        setFormData({
          name: '',
          description: '',
          category: 'ngo',
          registrationNo: '',
          address: '',
          contactEmail: '',
          contactPhone: '',
          website: ''
        });
        
        setTimeout(() => {
          navigate('/my-organization');
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to create organization');
      }
    } catch (err) {
      console.error('Organization creation error:', err);
      setError(err.response?.data?.message || 'Failed to create organization. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-org-page">
      <div className="create-org-container">
        <div className="org-form-card">
          <div className="form-header">
            <h1>🏢 Register Your Organization</h1>
            <p>Join DaanSetu and help those in need</p>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {isDonor && !showRoleConversion && (
            <div className="info-message">
              <p>💡 As a donor, you need to convert to an organization role first.</p>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => setShowRoleConversion(true)}
              >
                Convert to Organization
              </button>
            </div>
          )}

          {showRoleConversion && (
            <div className="role-conversion-modal">
              <div className="modal-content">
                <h3>Convert Account to Organization</h3>
                <p>This will change your role from Donor to Organization. You'll then be able to create and manage organizations.</p>
                <div className="modal-buttons">
                  <button 
                    className="btn btn-primary"
                    onClick={handleConvertRole}
                    disabled={loading}
                  >
                    {loading ? 'Converting...' : 'Yes, Convert My Account'}
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setShowRoleConversion(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {(user?.role === 'organization' || user?.role === 'admin') && !showRoleConversion && (
            <form onSubmit={handleSubmit} className="org-form">
              <div className="form-group">
                <label htmlFor="name">Organization Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g., Help Foundation"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Tell us about your organization"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <option value="ngo">NGO</option>
                    <option value="trust">Trust</option>
                    <option value="community">Community</option>
                    <option value="government">Government</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="registrationNo">Registration Number</label>
                  <input
                    type="text"
                    id="registrationNo"
                    name="registrationNo"
                    placeholder="e.g., NGO/2024/001"
                    value={formData.registrationNo}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Complete address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactEmail">Contact Email *</label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    placeholder="contact@organization.com"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contactPhone">Contact Phone</label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  placeholder="https://yourorganization.com"
                  value={formData.website}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? '⏳ Registering...' : '✅ Register Organization'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
