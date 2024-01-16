import { useState } from 'react';
import PropTypes from 'prop-types';

import Roles from './Roles/Roles';
import Workers from './Workers/Workers';

const Employees = () => {
  const [activeTab, setActiveTab] = useState('roles');

  const NavLink = ({ tab, label }) => (
    <div
      className={
        activeTab === tab ? 'currenttab' : 'Employees__Sidebar__Links__Link'
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
      <nav className='Employees__Sidebar'>
        <h1 className='Employees__Sidebar__Title'>
          SnapShop Employees Dashboard
        </h1>

        <div className='Employees__Sidebar__Links'>
          <NavLink tab='roles' label='Roles' />
          <NavLink tab='workers' label='Workers' />
        </div>
      </nav>

      <div className='Employees__Dashboard'>{renderContent()}</div>
    </div>
  );
};

export default Employees;
