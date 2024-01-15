import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Suppliers.scss';

// * ADD PRODUCTS MODAL
const AddProducts = ({ onClose }) => {
  const [supplierData, setSupplierData] = useState({
    supplier_id: '',
    supplier_name: '',
    supplier_contact: '',
    supplier_telephone: '',
    supplier_email: '',
    supplier_address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirm = async () => {
    const requiredFields = [
      'supplier_id',
      'supplier_name',
      'supplier_contact',
      'supplier_telephone',
      'supplier_email',
      'supplier_address',
    ];
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
        <input type='text' name='supplier_id' onChange={handleChange} />
        <p>name</p>
        <input type='text' name='supplier_name' onChange={handleChange} />
        <p>contact #</p>
        <input type='text' name='supplier_contact' onChange={handleChange} />
        <p>tel #</p>
        <input type='text' name='supplier_telephone' onChange={handleChange} />
        <p>email</p>
        <input type='text' name='supplier_email' onChange={handleChange} />
        <p>address</p>
        <input type='text' name='supplier_address' onChange={handleChange} />
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
const RemoveProducts = ({ onClose, onDelete }) => {
  const handleConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <div className='Suppliers__Modal__Remove Modal'>
      <p>Are you sure you want to delete this supplier?</p>
      <button onClick={onClose}>Cancel</button>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

RemoveProducts.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// EditProducts Modal
const EditProducts = ({ onClose, supplierData, onSave }) => {
  const [editedData, setEditedData] = useState(supplierData);

  useEffect(() => {
    setEditedData(supplierData);
  }, [supplierData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    onSave(editedData);
    onClose();
  };

  return (
    <div className='Suppliers__Modal__Edit Modal'>
      <h1>Edit Suppliers</h1>

      <div className='Suppliers__Edit'>
        <p>Details</p>
        <p>id</p>
        <input
          type='text'
          name='supplier_id'
          value={editedData.supplier_id}
          onChange={handleChange}
          disabled
        />
        <p>name</p>
        <input
          type='text'
          name='supplier_name'
          value={editedData.supplier_name}
          onChange={handleChange}
        />
        <p>contact #</p>
        <input
          type='text'
          name='supplier_contact'
          value={editedData.supplier_contact}
          onChange={handleChange}
        />
        <p>tel #</p>
        <input
          type='text'
          name='supplier_telephone'
          value={editedData.supplier_telephone}
          onChange={handleChange}
        />
        <p>email</p>
        <input
          type='text'
          name='supplier_email'
          value={editedData.supplier_email}
          onChange={handleChange}
        />
        <p>address</p>
        <input
          type='text'
          name='supplier_address'
          value={editedData.supplier_address}
          onChange={handleChange}
        />
      </div>
      <button onClick={onClose}>Close</button>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

EditProducts.propTypes = {
  onClose: PropTypes.func.isRequired,
  supplierData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

// Suppliers Component
const Suppliers = () => {
  const [isAddProductsModalOpen, setAddProductsModalOpen] = useState(false);
  const [isEditProductsModalOpen, setEditProductsModalOpen] = useState(false);
  const [isRemoveProductsModalOpen, setRemoveProductsModalOpen] =
    useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [suppliersData, setSuppliersData] = useState([]);

  const toggleAddProductsModal = () => {
    setAddProductsModalOpen(!isAddProductsModalOpen);
  };

  const toggleEditProductsModal = (supplier) => {
    setSelectedSupplier(supplier);
    setEditProductsModalOpen(!isEditProductsModalOpen);
  };

  const toggleRemoveProductsModal = (supplier) => {
    setSelectedSupplier(supplier);
    setRemoveProductsModalOpen(!isRemoveProductsModalOpen);
  };

  const handleEditSave = (editedData) => {
    console.log(`/api/admin/suppliers/${editedData.supplier_id}`);
    // Perform the update operation
    fetch(`/api/admin/suppliers/${editedData.supplier_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('PU request successful:', data);
        // Update the state or fetch data again after the edit is successful
      })
      .catch((error) => console.error('Error during PATCH request:', error));
  };

  const handleDelete = () => {
    // Perform the delete operation
    fetch(`/api/admin/suppliers/${selectedSupplier.supplier_id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('DELETE request successful:', data);
        // Update the state or fetch data again after the delete is successful
      })
      .catch((error) => console.error('Error during DELETE request:', error));
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetch('/api/admin/suppliers')
      .then((response) => response.json())
      .then((data) => {
        setSuppliersData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

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
                <td>{supplier.supplier_telephone}</td>
                <td>{supplier.supplier_email}</td>
                <td>{supplier.supplier_address}</td>
                <td>
                  <button onClick={() => toggleEditProductsModal(supplier)}>
                    Edit
                  </button>
                  <button onClick={() => toggleRemoveProductsModal(supplier)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='Suppliers__Modal'>
        <div className='Suppliers__Modal__Toggle'>
          <button onClick={toggleAddProductsModal}>+</button>
        </div>
      </div>

      {/* MODALS */}
      {isAddProductsModalOpen && (
        <AddProducts onClose={toggleAddProductsModal} />
      )}
      {isEditProductsModalOpen && (
        <EditProducts
          onClose={() => setEditProductsModalOpen(false)}
          supplierData={selectedSupplier}
          onSave={handleEditSave}
        />
      )}
      {isRemoveProductsModalOpen && (
        <RemoveProducts
          onClose={() => setRemoveProductsModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Suppliers;
