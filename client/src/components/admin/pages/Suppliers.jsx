import { useState } from 'react';
import PropTypes from 'prop-types';

import './Suppliers.scss';

const Suppliers = () => {
  const [isAddProductsModalOpen, setAddProductsModalOpen] = useState(false);
  const [isRemoveProductsModalOpen, setRemoveProductsModalOpen] =
    useState(false);

  // * ADD PRODUCTS MODAL
  const AddProducts = ({ onClose }) => {
    return (
      <div className='Suppliers__Modal__Add Modal'>
        <h1>Add Suppliers</h1>

        <div className='Suppliers__Add'>
          <p>Details</p>
          <p>id</p>
          <input type='text' name='' id='' />
          <p>name</p>
          <input type='text' name='' id='' />
          <p>contact #</p>
          <input type='text' name='' id='' />
          <p>tel #</p>
          <input type='text' name='' id='' />
          <p>email</p>
          <input type='text' name='' id='' />
          <p>address</p>
          <input type='text' name='' id='' />
        </div>
        <button onClick={onClose}>Close</button>
        <button>Confirm</button>
      </div>
    );
  };
  AddProducts.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  // * REMOVE PRODUCTS MODAL
  const RemoveProducts = ({ onClose }) => {
    return (
      <div className='Suppliers__Modal__Remove Modal'>
        <p>Modal Content</p>

        <button onClick={onClose}>Close</button>
        <button>Confirm</button>
      </div>
    );
  };
  RemoveProducts.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  const toggleAddProductsModal = () => {
    setAddProductsModalOpen(!isAddProductsModalOpen);
  };

  const toggleRemoveProductsModal = () => {
    setRemoveProductsModalOpen(!isRemoveProductsModalOpen);
  };

  return (
    <div className='Suppliers'>
      <div className='Suppliers__Filter'>
        <p>All Suppliers</p>
      </div>

      <div className='Suppliers__Table'>
        <table>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
              <th>Column 4</th>
              <th>Column 5</th>
              <th>Column 6</th>
              <th>Column 7</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data 1</td>
              <td>Data 2</td>
              <td>Data 3</td>
              <td>Data 4</td>
              <td>Data 5</td>
              <td>Data 6</td>
              <td>Data 7</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='Suppliers__Modal'>
        <div className='Suppliers__Modal__Toggle'>
          <button onClick={toggleAddProductsModal}>+</button>
          <div className='Suppliers__Modal__Toggle__Separator'></div>
          <button onClick={toggleRemoveProductsModal}>-</button>
        </div>
      </div>

      {/* MODALS */}
      {isAddProductsModalOpen && (
        <AddProducts onClose={toggleAddProductsModal} />
      )}
      {isRemoveProductsModalOpen && (
        <RemoveProducts onClose={toggleRemoveProductsModal} />
      )}
    </div>
  );
};

export default Suppliers;
