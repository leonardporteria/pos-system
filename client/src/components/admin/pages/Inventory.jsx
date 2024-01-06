import { useState } from 'react';
import PropTypes from 'prop-types';

const Inventory = () => {
  const [isAddProductsModalOpen, setAddProductsModalOpen] = useState(false);

  const AddProducts = ({ onClose }) => {
    return (
      <div className='Inventory__Add'>
        <p>Modal Content</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
  AddProducts.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  const toggleAddProductsModal = () => {
    setAddProductsModalOpen(!isAddProductsModalOpen);
  };

  return (
    <div className='Inventory'>
      Inventory
      <button onClick={toggleAddProductsModal}>Add Product</button>
      {isAddProductsModalOpen && (
        <AddProducts onClose={toggleAddProductsModal} />
      )}
    </div>
  );
};

export default Inventory;
