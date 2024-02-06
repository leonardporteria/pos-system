import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Suppliers.scss';

// * ADD SUPPLIERS MODAL
const AddSuppliers = ({ onClose, onInsert }) => {
  const [supplierData, setSupplierData] = useState({
    supplier_id: '',
    supplier_name: '',
    supplier_contact: '',
    supplier_telephone: '',
    supplier_email: '',
    supplier_address: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    Object.entries(supplierData).forEach(([key, value]) => {
      if (value.trim() === '') {
        errors[key] = 'This field is required';
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      onInsert(supplierData);
      onClose();
    }
  };

  return (
    <div className='Suppliers__Modal__Add Modal'>
      <h1>Add Suppliers</h1>

      <form className='Suppliers__Add' onSubmit={handleConfirm}>
        <div>
          <label htmlFor='supplier_id'>Supplier ID [Format: SUP-######]</label>
          <input
            type='text'
            name='supplier_id'
            onChange={handleChange}
            required
            pattern='^SUP-\d{6}$'
            placeholder='Format: SUP-######'
          />
          <span>{formErrors.supplier_id}</span>
        </div>

        <div>
          <label>Supplier Name</label>
          <input
            type='text'
            name='supplier_name'
            onChange={handleChange}
            required
            placeholder='Supplier name'
          />
          <span>{formErrors.supplier_name}</span>
        </div>

        <div>
          <label>Supplier Contact Number</label>
          <input
            type='number'
            name='supplier_contact'
            onChange={handleChange}
            required
            placeholder='09XXXXXXXXXX'
          />
          <span>{formErrors.supplier_contact}</span>
        </div>

        <div>
          <label>Supplier Telephone Number</label>
          <input
            type='number'
            name='supplier_telephone'
            onChange={handleChange}
            required
            placeholder='Supplier telephone number'
          />
          <span>{formErrors.supplier_telephone}</span>
        </div>

        <div>
          <label>Supplier Email Address</label>
          <input
            type='email'
            name='supplier_email'
            onChange={handleChange}
            required
            placeholder='address@domain.com'
          />
          <span>{formErrors.supplier_email}</span>
        </div>

        <div>
          <label>Supplier Address</label>
          <input
            type='text'
            name='supplier_address'
            onChange={handleChange}
            required
            placeholder='Somplete address'
          />
          <span>{formErrors.supplier_address}</span>
        </div>

        <span>
          <input type='submit' value='Confirm' />
          <input type='submit' value='Close' onClick={onClose} />
        </span>
      </form>
    </div>
  );
};

AddSuppliers.propTypes = {
  onClose: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired,
};

// * EDIT SUPPLIERS MODAL
const EditSuppliers = ({ onClose, supplierData, onSave }) => {
  const [editedData, setEditedData] = useState(supplierData);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setEditedData(supplierData);
  }, [supplierData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    Object.entries(editedData).forEach(([key, value]) => {
      if (value.trim() === '') {
        errors[key] = 'This field is required';
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(editedData);
      onClose();
    }
  };

  return (
    <div className='Suppliers__Modal__Edit Modal'>
      <h1>Edit Suppliers</h1>

      <form className='Suppliers__Edit'>
        <div>
          <label htmlFor='supplier_id'>Supplier ID</label>
          <input
            type='text'
            name='supplier_id'
            value={editedData.supplier_id}
            onChange={handleChange}
            disabled
          />
          <span>{formErrors.supplier_id}</span>
        </div>

        <div>
          <label>Supplier Name</label>
          <input
            type='text'
            name='supplier_name'
            value={editedData.supplier_name}
            onChange={handleChange}
            required
            placeholder='Supplier name'
          />
          <span>{formErrors.supplier_name}</span>
        </div>

        <div>
          <label>Supplier Contact Number</label>
          <input
            type='number'
            name='supplier_contact'
            value={editedData.supplier_contact}
            onChange={handleChange}
            required
            placeholder='09XXXXXXXXXX'
          />
          <span>{formErrors.supplier_contact}</span>
        </div>

        <div>
          <label>Supplier Telephone Number</label>
          <input
            type='number'
            name='supplier_telephone'
            value={editedData.supplier_telephone}
            onChange={handleChange}
            required
            placeholder='Supplier telephone number'
          />
          <span>{formErrors.supplier_telephone}</span>
        </div>

        <div>
          <label>Supplier Email Address</label>
          <input
            type='email'
            name='supplier_email'
            value={editedData.supplier_email}
            onChange={handleChange}
            required
            placeholder='address@domain.com'
          />
          <span>{formErrors.supplier_email}</span>
        </div>

        <div>
          <label>Supplier Address</label>
          <input
            type='text'
            name='supplier_address'
            value={editedData.supplier_address}
            onChange={handleChange}
            required
            placeholder='Somplete address'
          />
          <span>{formErrors.supplier_address}</span>
        </div>

        <span>
          <input type='submit' value='Confirm' onClick={handleConfirm} />
          <input type='submit' value='Close' onClick={onClose} />
        </span>
      </form>
    </div>
  );
};

EditSuppliers.propTypes = {
  onClose: PropTypes.func.isRequired,
  supplierData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

// * REMOVE SUPPLIERS MODAL
const RemoveSuppliers = ({ onClose, onDelete, selectedSupplier }) => {
  const handleConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <div className='Suppliers__Modal__Remove Modal'>
      <p>
        Are you sure you want to delete this supplier with &quot;
        {selectedSupplier}&quot; supplier id?
      </p>
      <span>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </span>
    </div>
  );
};

RemoveSuppliers.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedSupplier: PropTypes.string,
};

// Suppliers Component
const Suppliers = () => {
  const [isAddSuppliersModalOpen, setAddSuppliersModalOpen] = useState(false);
  const [isEditSuppliersModalOpen, setEditSuppliersModalOpen] = useState(false);
  const [isRemoveSuppliersModalOpen, setRemoveSuppliersModalOpen] =
    useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [suppliersData, setSuppliersData] = useState([]);

  const toggleAddSuppliersModal = () => {
    setAddSuppliersModalOpen(!isAddSuppliersModalOpen);
  };

  const toggleEditSuppliersModal = (supplier) => {
    setSelectedSupplier(supplier);
    setEditSuppliersModalOpen(!isEditSuppliersModalOpen);
  };

  const toggleRemoveSuppliersModal = (supplier) => {
    setSelectedSupplier(supplier);
    setRemoveSuppliersModalOpen(!isRemoveSuppliersModalOpen);
  };

  const handleInsert = (insertData) => {
    const requiredFields = [
      'supplier_id',
      'supplier_name',
      'supplier_contact',
      'supplier_telephone',
      'supplier_email',
      'supplier_address',
    ];

    const hasEmptyField = requiredFields.some((field) => !insertData[field]);

    if (hasEmptyField) {
      alert('Please fill in all required fields.');
    } else {
      fetch('/api/admin/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(insertData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('POST request successful:', data);
          fetchSuppliersData();
        })
        .catch((error) =>
          console.error('Error during POST request:', error.message)
        );
    }
  };

  const handleEditSave = (editedData) => {
    console.log(`/api/admin/suppliers/${editedData.supplier_id}`);
    fetch(`/api/admin/suppliers/${editedData.supplier_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('PUT request successful:', data);
        fetchSuppliersData();
      })
      .catch((error) => console.error('Error during PUT request:', error));
  };

  const handleDelete = () => {
    fetch(`/api/admin/suppliers/${selectedSupplier.supplier_id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('DELETE request successful:', data);
        fetchSuppliersData();
      })
      .catch((error) => console.error('Error during DELETE request:', error));
  };

  const fetchSuppliersData = () => {
    fetch('/api/admin/suppliers')
      .then((response) => response.json())
      .then((data) => {
        setSuppliersData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchSuppliersData();
  }, []);

  return (
    <div className='Suppliers'>
      <div className='Suppliers__Filter'>
        <p>All Suppliers</p>
        <div className='Suppliers__Filter__Add'>
          <button onClick={toggleAddSuppliersModal}>add supplier</button>
        </div>
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
                  <button onClick={() => toggleEditSuppliersModal(supplier)}>
                    Edit
                  </button>
                  <button onClick={() => toggleRemoveSuppliersModal(supplier)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {isAddSuppliersModalOpen && (
        <AddSuppliers
          onClose={toggleAddSuppliersModal}
          onInsert={handleInsert}
        />
      )}
      {isEditSuppliersModalOpen && (
        <EditSuppliers
          onClose={() => setEditSuppliersModalOpen(false)}
          supplierData={selectedSupplier}
          onSave={handleEditSave}
        />
      )}
      {isRemoveSuppliersModalOpen && (
        <RemoveSuppliers
          onClose={() => setRemoveSuppliersModalOpen(false)}
          onDelete={handleDelete}
          selectedSupplier={selectedSupplier.supplier_id}
        />
      )}
    </div>
  );
};

export default Suppliers;
