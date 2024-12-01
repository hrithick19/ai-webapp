import { useLanguage } from '../contexts/LanguageContext';
import './Navbar.css';

function Navbar() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-logo">
          Aharathi
        </a>
      </div>

      <div className="navbar-menu">
        <a href="/works" className="navbar-link">Works</a>
        <a href="/books" className="navbar-link">Books</a>
        <a href="/about" className="navbar-link">About</a>
        <a href="/contact" className="navbar-link">Contact</a>
        <button 
          onClick={toggleLanguage}
          className="navbar-language-toggle"
          aria-label={language === 'en' ? 'Switch to Tamil' : 'Switch to English'}
        >
          {language === 'en' ? 'தமிழ்' : 'English'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 