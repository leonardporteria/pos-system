import { Route, Routes, Link, useMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Dashboard from './pages/Dashboard/Dashboard';
import Sales from './pages/Sales/Sales';
import Employees from './pages/Employees/Employees';
import Transactions from './pages/Transactions/Transactions';
import Suppliers from './pages/Suppliers/Suppliers';
import Inventory from './pages/Inventory/Inventory';

import './Admin.scss';

const Admin = () => {
  const initialLocation = localStorage.getItem('currentPage') || 'Dashboard';
  const [location, setLocation] = useState(initialLocation);
  const [currentDate, setCurrentDate] = useState('');

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
  }, []);

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
          <NavLink to='/admin/suppliers' label='Suppliers'>
            Suppliers
          </NavLink>
        </div>
      </nav>

      <div className='Admin__Dashboard'>
        <div className='Admin__Dashboard__Utils'>
          <h1>{location}</h1>
          <input type='text' placeholder='Search' />
          <select name='' id=''>
            <option value=''>leonard porteria</option>
          </select>
          <p>Date: {currentDate}</p>
        </div>
        <Routes>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='sales' element={<Sales />} />
          <Route path='employees/*' element={<Employees />} />
          <Route path='transactions' element={<Transactions />} />
          <Route path='suppliers' element={<Suppliers />} />
          <Route path='inventory/*' element={<Inventory />} />
          <Route path='*' element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
