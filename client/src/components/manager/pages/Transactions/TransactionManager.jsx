import { useState } from 'react';
import PropTypes from 'prop-types';

import Transactions from './Transactions/Transactions';
import TransactionDetails from './TransactionDetails/TransactionDetails';

import './TransactionManager.scss';

const TransactionManager = () => {
  const [activeTab, setActiveTab] = useState('transactions');

  const NavLink = ({ tab, label }) => (
    <div
      className={
        activeTab === tab
          ? 'currenttab'
          : 'TransactionManager__Navbar__Links__Link'
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
      case 'transactions':
        return <Transactions />;
      case 'transaction_details':
        return <TransactionDetails />;
      default:
        return <div>*asd</div>;
    }
  };

  return (
    <div className='TransactionManager'>
      <nav className='TransactionManager__Navbar'>
        <div className='TransactionManager__Navbar__Links'>
          <NavLink tab='transactions' label='Transactions' />
          <NavLink tab='transaction_details' label='Transaction Details' />
        </div>
      </nav>

      <div className='TransactionManager__Dashboard'>{renderContent()}</div>
    </div>
  );
};

export default TransactionManager;
