import { useState } from 'react';
import PropTypes from 'prop-types';

import ProductCategory from './ProductCategory/ProductCategory';
import Products from './Products/Products';
import ProductHistory from './ProductHistory/ProductHistory';
import ProductInventory from './ProductInventory/ProductInventory';

import './Inventory.scss';

const Inventory = () => {
  const [activeTab, setActiveTab] = useState('product_category');

  const NavLink = ({ tab, label }) => (
    <div
      className={
        activeTab === tab ? 'currenttab' : 'Inventory__Navbar__Links__Link'
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
      case 'product_category':
        return <ProductCategory />;
      case 'products':
        return <Products />;
      case 'product_history':
        return <ProductHistory />;
      case 'product_inventory':
        return <ProductInventory />;
      default:
        return <div>*asd</div>;
    }
  };

  return (
    <div className='Inventory'>
      <nav className='Inventory__Navbar'>
        <div className='Inventory__Navbar__Links'>
          <NavLink tab='product_category' label='Product Category' />
          <NavLink tab='products' label='Products' />
          <NavLink tab='product_history' label='Product History' />
          <NavLink tab='product_inventory' label='Product Inventory' />
        </div>
      </nav>

      <div className='Inventory__Dashboard'>{renderContent()}</div>
    </div>
  );
};

export default Inventory;
