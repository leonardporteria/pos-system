import { Route, Routes, Link, useMatch, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';

import Dashboard from './pages/Dashboard/Dashboard';
import Sales from './pages/Sales/Sales';
import Employees from './pages/Employees/Employees';
import TransactionManager from './pages/Transactions/TransactionManager';
import Inventory from './pages/Inventory/Inventory';
import Procurement from './pages/Procurement/Procurement';

import './Admin.scss';

const Admin = () => {
  const navigate = useNavigate();
  const initialLocation = localStorage.getItem('currentPage') || 'Dashboard';
  const [location, setLocation] = useState(initialLocation);
  const [currentDate, setCurrentDate] = useState('');
  const [username, setUsername] = useState('');

  const NavLink = ({ to, label }) => {
    const match = useMatch(to);

    return (
      <Link
        to={to}
        className={match ? 'currentpage' : 'Admin__Sidebar__Links__Link'}
        onClick={() => {
          setLocation(label);
          localStorage.setItem('currentPage', label);
        }}
      >
        <p>{label}</p>
      </Link>
    );
  };

  NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const getCurrentDate = () => {
      const now = new Date();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const year = now.getFullYear();

      const formattedDate = `${month}/${day}/${year}`;
      setCurrentDate(formattedDate);
    };

    getCurrentDate();

    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.username;
      setUsername(userRole);
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className='Admin'>
      <nav className='Admin__Sidebar'>
        <h1 className='Admin__Sidebar__Title'>SnapShop Admin Dashboard</h1>

        <div className='Admin__Sidebar__Links'>
          <NavLink to='/admin/dashboard' label='Dashboard'>
            Dashboard
          </NavLink>
          <NavLink to='/admin/sales' label='Sales'>
            Sales
          </NavLink>
          <NavLink to='/admin/transactions' label='Transcations'>
            Transcations
          </NavLink>
          <NavLink to='/admin/inventory' label='Inventory'>
            Inventory
          </NavLink>
          <NavLink to='/admin/employees' label='Employees'>
            Employees
          </NavLink>
          <NavLink to='/admin/procurement' label='Procurement'>
            Procurement
          </NavLink>
        </div>
      </nav>

      <div className='Admin__Dashboard'>
        <div className='Admin__Dashboard__Utils'>
          <h1>{location}</h1>
          <select name='' id='' onChange={handleLogout}>
            <option value=''>{username}</option>
            <option value='logout'>Log Out</option>
          </select>
          <p>Date: {currentDate}</p>
        </div>
        <Routes>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='sales' element={<Sales />} />
          <Route path='employees/*' element={<Employees />} />
          <Route path='transactions' element={<TransactionManager />} />
          <Route path='procurement/*' element={<Procurement />} />
          <Route path='inventory/*' element={<Inventory />} />
          <Route path='*' element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
