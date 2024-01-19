import { useState } from 'react';
import PropTypes from 'prop-types';

import Suppliers from './Suppliers/Suppliers';
import Order from './Orders/Orders';
import OrderDetails from './OrderDetails/OrderDetails';

import './Procurement.scss';

const Procurement = () => {
  const [activeTab, setActiveTab] = useState('suppliers');

  const NavLink = ({ tab, label }) => (
    <div
      className={
        activeTab === tab ? 'currenttab' : 'Procurement__Navbar__Links__Link'
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
      case 'suppliers':
        return <Suppliers />;
      case 'order':
        return <Order />;
      case 'orderDetails':
        return <OrderDetails />;
      default:
        return <div>*asd</div>;
    }
  };

  return (
    <div className='Procurement'>
      <nav className='Procurement__Navbar'>
        <div className='Procurement__Navbar__Links'>
          <NavLink tab='suppliers' label='Suppliers' />
          <NavLink tab='order' label='Order' />
          <NavLink tab='orderDetails' label='Order Details' />
        </div>
      </nav>

      <div className='Procurement__Dashboard'>{renderContent()}</div>
    </div>
  );
};

export default Procurement;
