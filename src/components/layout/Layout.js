import Header from './Header';
import Footer from './Footer';
import Container from '../common/Container';
import useScrollToTop from '../../hooks/useScrollToTop';
import './Layout.css';

function Layout({ children }) {
  useScrollToTop();

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Container>
          {children}
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;