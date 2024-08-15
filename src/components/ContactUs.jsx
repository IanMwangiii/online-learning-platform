import { useState } from 'react';
import './ContactUs.css';

function ContactUs() {
  const [showToast, setShowToast] = useState(false);

  const handleContactClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-description">
        If you have any questions or need assistance, please reach out to us:
      </p>
      <p className="contact-info">
        <strong>Email:</strong> <a href="mailto:adidabarackpilly@gmail.com" onClick={handleContactClick}>adidabarackpilly@gmail.com</a>
      </p>
      <p className="contact-info">
        <strong>Phone:</strong> +254 726 532 298
      </p>
      <p className="contact-info">
        <strong>Address:</strong> 123 Learning St, Knowledge City, EduWorld 45678
      </p>

      <h2 className="social-title">Follow Us</h2>
      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluent/48/000000/facebook-new.png" alt="Facebook" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluent/48/000000/twitter.png" alt="Twitter" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluent/48/000000/instagram-new.png" alt="Instagram" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluent/48/000000/linkedin.png" alt="LinkedIn" />
        </a>
      </div>

      {showToast && <div className="toast">Thank you for contacting us!</div>}
    </div>
  );
}

export default ContactUs;