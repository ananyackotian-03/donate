import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <h3 className="footer-title">🤝 DaanSetu</h3>
          <p className="footer-description">
            Connecting Donors with Organizations. Making a difference, one donation at a time.
          </p>
        </div>
        <div className="footer-links">
          <a href="#about" className="footer-link">About Us</a>
          <a href="#contact" className="footer-link">Contact</a>
          <a href="#privacy" className="footer-link">Privacy</a>
          <a href="#terms" className="footer-link">Terms</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} DaanSetu - Donation Platform. All rights reserved.</p>
      </div>
    </footer>
  );
}
