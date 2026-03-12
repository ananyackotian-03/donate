import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">DaanSetu – Connecting Donors with Organizations</h1>
          <p className="hero-subtitle">
            Transform unwanted items into meaningful contributions. Help organizations in need 
            and reduce waste while making a real difference in your community.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">How DaanSetu Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Donate Items</h3>
            <p>
              Post items you want to donate. Whether it's books, clothes, or other essentials, 
              give them a second life.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏢</div>
            <h3>Help NGOs</h3>
            <p>
              Organizations can browse available donations and request items that match their 
              community needs.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">♻️</div>
            <h3>Reduce Waste</h3>
            <p>
              By donating instead of discarding, you help reduce waste and create a sustainable 
              future for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready to Make a Difference?</h2>
        <p>Join our community of donors and organizations working together to help those in need.</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-accent">Join Now</Link>
          <Link to="/login" className="btn btn-outline">Sign In</Link>
        </div>
      </section>
    </div>
  );
}