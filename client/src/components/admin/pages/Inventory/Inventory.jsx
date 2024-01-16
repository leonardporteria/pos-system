import { useState } from 'react';
import PropTypes from 'prop-types';

import ProductCategory from './ProductCategory/ProductCategory';
import Products from './Products/Products';

const Inventory = () => {
  const [activeTab, setActiveTab] = useState('product_category');

  const NavLink = ({ tab, label }) => (
    <div
      className={
        activeTab === tab ? 'currenttab' : 'Inventory__Sidebar__Links__Link'
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
      default:
        return <div>*asd</div>;
    }
  };

  return (
    <div className='Inventory'>
      <nav className='Inventory__Sidebar'>
        <h1 className='Inventory__Sidebar__Title'>
          SnapShop Inventory Dashboard
        </h1>

        <div className='Inventory__Sidebar__Links'>
          <NavLink tab='product_category' label='Product Category' />
          <NavLink tab='products' label='Products' />
        </div>
      </nav>

      <div className='Inventory__Dashboard'>{renderContent()}</div>
    </div>
  );
};

export default Inventory;
