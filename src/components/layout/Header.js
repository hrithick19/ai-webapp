import { Link, useLocation } from 'react-router-dom';
import Container from '../common/Container';
import './Header.css';

function Header() {
  const location = useLocation();

  // Function to check if link is active
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <Container>
        <nav className="nav">
          <div className="brand">
            <Link to="/" className="brand-link">
              Your Name
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/books" className={`nav-link ${isActive('/books')}`}>
              Books
            </Link>
            <Link to="/works" className={`nav-link ${isActive('/works')}`}>
              Works
            </Link>
            <Link to="/about" className={`nav-link ${isActive('/about')}`}>
              About
            </Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
              Contact
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;