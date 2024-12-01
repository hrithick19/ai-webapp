import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  
  return (
    <header className="header">
      <nav className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">Writer's Portfolio</span>
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/works" 
            className={`nav-link ${location.pathname === '/works' ? 'active' : ''}`}
          >
            Works
          </Link>
          <Link 
            to="/books" 
            className={`nav-link ${location.pathname === '/books' ? 'active' : ''}`}
          >
            Books
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About
          </Link>
          {/* <Link 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link> */}
        </div>
      </nav>
    </header>
  );
}

export default Navigation; 