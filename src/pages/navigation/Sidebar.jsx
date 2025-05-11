import { Link } from 'react-router-dom';
import { House, People, BoxArrowRight, List } from 'react-bootstrap-icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../../services/AuthContext';
import './Sidebar.scss';

const Sidebar = ({ title = 'Menu' }) => {
  const { logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
   
      <header className="app-header">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <List />
        </button>
        <h4>{title}</h4>
        <div></div> 
      </header>

    
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} 
        onClick={toggleSidebar}
      />

     
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h4>{title}</h4>
        </div>

        <div className="nav-container">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link 
                to="/dashboard" 
                className="nav-link d-flex align-items-center"
                onClick={() => setSidebarOpen(false)}
              >
                <House className="me-2" /> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/users" 
                className="nav-link d-flex align-items-center"
                onClick={() => setSidebarOpen(false)}
              >
                <People className="me-2" /> Users
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-auto mb-3">
          <button 
            onClick={logout}
            className="btn btn-outline-light logout-btn w-100 d-flex align-items-center justify-content-center"
          >
            <BoxArrowRight className="me-2" /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;