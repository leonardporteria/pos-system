import { BrowserRouter, Route, Routes, Link, useMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Employees from './pages/Employees';
import Products from './pages/Products';
import Inventory from './pages/Inventory';

import './Admin.scss';

const NavLink = ({ to, label }) => {
  const match = useMatch(to);
  return (
    <Link
      to={to}
      className={match ? 'currentpage' : 'Admin__Sidebar__Links__Link'}
    >
      {label}
    </Link>
  );
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const Admin = () => {
  return (
    <div className='Admin'>
      <BrowserRouter>
        <nav className='Admin__Sidebar'>
          <h1 className='Admin__Sidebar__Title'>SnapShot Admin Dashboard</h1>

          <div className='Admin__Sidebar__Links'>
            <NavLink to='/admin/dashboard' label='Dashboard'>
              Dashboard
            </NavLink>
            <NavLink to='/admin/sales' label='Sales'>
              Sales
            </NavLink>
            <NavLink to='/admin/employees' label='Employees'>
              Employees
            </NavLink>
            <NavLink to='/admin/products' label='Products'>
              Products
            </NavLink>
            <NavLink to='/admin/inventory' label='Inventory'>
              Inventory
            </NavLink>
          </div>
        </nav>

        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/sales' element={<Sales />} />
          <Route path='/admin/employees' element={<Employees />} />
          <Route path='/admin/products' element={<Products />} />
          <Route path='/admin/inventory' element={<Inventory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Admin;
