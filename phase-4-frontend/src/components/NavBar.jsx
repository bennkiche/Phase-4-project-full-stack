import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Tests</Link></li>
        <li><Link to="/tests/new">Add Test</Link></li>
        <li><Link to="/labs">Manage Labs</Link></li>
        <li><Link to="/prices">Prices</Link></li>
        
        
      </ul>
    </nav>
  );
};

export default NavBar;