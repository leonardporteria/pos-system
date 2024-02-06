import { useState } from 'react';
import PropTypes from 'prop-types';

import Roles from './Roles/Roles';
import Workers from './Workers/Workers';

import './Employees.scss';

const Employees = () => {
  const [activeTab, setActiveTab] = useState('roles');

  const NavLink = ({ tab, label }) => (
    <div
      className={
        activeTab === tab ? 'currenttab' : 'Employees__Navbar__Links__Link'
      }
      onClick={() => setActiveTab(tab)}
    >
      <p>{label}</p>
    </div>
  );

  NavLink.propTypes = {
    tab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'roles':
        return <Roles />;
      case 'workers':
        return <Workers />;
      default:
        return <div>*asd</div>;
    }
  };

  return (
    <div className='Employees'>
      <nav className='Employees__Navbar'>
        <div className='Employees__Navbar__Links'>
          <NavLink tab='roles' label='Roles' />
          <NavLink tab='workers' label='Workers' />
        </div>
      </nav>

      <div className='Employees__Dashboard'>{renderContent()}</div>
    </div>
  );
};

export default Employees;
