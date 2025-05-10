import { Link } from 'react-router-dom';
import { House, People } from 'react-bootstrap-icons';

const Sidebar = () => {
  return (
    <div
      className="bg-light"
      style={{
        width: '200px',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '1rem',
        borderRight: '1px solid #ddd',
      }}
    >
      <h4 className="mb-4">Menu</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/dashboard" className="nav-link d-flex align-items-center">
            <House className="me-2" /> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/users" className="nav-link d-flex align-items-center">
            <People className="me-2" /> Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;  