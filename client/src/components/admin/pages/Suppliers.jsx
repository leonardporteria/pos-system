import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Suppliers.scss';

// * ADD PRODUCTS MODAL
const AddProducts = ({ onClose }) => {
  const [supplierData, setSupplierData] = useState({
    id: '',
    name: '',
    contact: '',
    tel: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirm = async () => {
    const requiredFields = ['id', 'name', 'contact', 'tel', 'email', 'address'];
    const hasEmptyField = requiredFields.some((field) => !supplierData[field]);

    if (hasEmptyField) {
      alert('Please fill in all required fields.');
    } else {
      fetch('/api/admin/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplierData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('POST request successful:', data);

          onClose();
        })
        .catch((error) =>
          console.error('Error during POST request:', error.message)
        );
    }
  };

  return (
    <div className='Suppliers__Modal__Add Modal'>
      <h1>Add Suppliers</h1>

      <div className='Suppliers__Add'>
        <p>Details</p>
        <p>id</p>
        <input
          type='text'
          name='id'
          value={supplierData.id}
          onChange={handleChange}
        />
        <p>name</p>
        <input
          type='text'
          name='name'
          value={supplierData.name}
          onChange={handleChange}
        />
        <p>contact #</p>
        <input
          type='text'
          name='contact'
          value={supplierData.contact}
          onChange={handleChange}
        />
        <p>tel #</p>
        <input
          type='text'
          name='tel'
          value={supplierData.tel}
          onChange={handleChange}
        />
        <p>email</p>
        <input
          type='text'
          name='email'
          value={supplierData.email}
          onChange={handleChange}
        />
        <p>address</p>
        <input
          type='text'
          name='address'
          value={supplierData.address}
          onChange={handleChange}
        />
      </div>
      <button onClick={onClose}>Close</button>
      <button onClick={handleConfirm}>Confirm</button>
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

const Suppliers = () => {
  const [isAddProductsModalOpen, setAddProductsModalOpen] = useState(false);
  const [isRemoveProductsModalOpen, setRemoveProductsModalOpen] =
    useState(false);
  const [suppliersData, setSuppliersData] = useState([]);

  const toggleAddProductsModal = () => {
    setAddProductsModalOpen(!isAddProductsModalOpen);
  };

  const toggleRemoveProductsModal = () => {
    setRemoveProductsModalOpen(!isRemoveProductsModalOpen);
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetch('/api/admin/suppliers')
      .then((response) => response.json())
      .then((data) => {
        setSuppliersData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div className='Suppliers'>
      <div className='Suppliers__Filter'>
        <p>All Suppliers</p>
      </div>

      <div className='Suppliers__Table'>
        <table>
          <thead>
            <tr>
              <th>Supplier ID</th>
              <th>Supplier Name</th>
              <th>Contact Number</th>
              <th>Tel Number</th>
              <th>Email</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliersData.map((supplier) => (
              <tr key={supplier.supplier_id}>
                <td>{supplier.supplier_id}</td>
                <td>{supplier.supplier_name}</td>
                <td>{supplier.supplier_contact}</td>
                <td>{supplier.supplier_tel}</td>
                <td>{supplier.supplier_email}</td>
                <td>{supplier.supplier_address}</td>
                <td>
                  <button>Edit</button>
                </td>
              </tr>
            ))}
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
