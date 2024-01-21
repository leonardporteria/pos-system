import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './ProductHistory.scss';

// * ADD PRODUCT HISTORY MODAL
const AddProductHistory = ({ onClose, onInsert }) => {
  const [productHistoryData, setProductHistoryData] = useState({
    product_history_id: '',
    product_id: '',
    old_bought_price: '',
    new_bought_price: '',
    old_selling_price: '',
    new_selling_price: '',
    employee_id: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [productOptions, setProductOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);

  useEffect(() => {
    const fetchProductEmployees = async () => {
      try {
        const response = await fetch('/api/admin/products');
        const data = await response.json();
        setProductOptions(data);
      } catch (error) {
        console.error('Error fetching product options:', error);
      }

      try {
        const response = await fetch('/api/admin/employees');
        const data = await response.json();
        setEmployeeOptions(data);
      } catch (error) {
        console.error('Error fetching employee options:', error);
      }
    };

    fetchProductEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductHistoryData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    Object.entries(productHistoryData).forEach(([key, value]) => {
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
      onInsert(productHistoryData);
      onClose();
    }
  };

  return (
    <div className='ProductHistory__Modal__Add Modal'>
      <h1>Add Product History</h1>

      <form className='ProductHistory__Add' onSubmit={handleConfirm}>
        <div>
          <label htmlFor='product_history_id'>ID</label>
          <input
            type='text'
            name='product_history_id'
            onChange={handleChange}
            required
          />
          <span>{formErrors.product_history_id}</span>
        </div>

        <div>
          <label htmlFor='product_id'>Product ID</label>
          <select
            name='product_id'
            onChange={handleChange}
            value={productHistoryData.product_id}
            required
          >
            <option value='' disabled>
              Select Product ID
            </option>
            {productOptions.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_id}
              </option>
            ))}
          </select>
          <span>{formErrors.product_id}</span>
        </div>

        <div>
          <label htmlFor='old_bought_price'>Old Bought Price</label>
          <input
            type='number'
            name='old_bought_price'
            onChange={handleChange}
            required
          />
          <span>{formErrors.old_bought_price}</span>
        </div>

        <div>
          <label htmlFor='new_bought_price'>New Bought Price</label>
          <input
            type='number'
            name='new_bought_price'
            onChange={handleChange}
            required
          />
          <span>{formErrors.new_bought_price}</span>
        </div>

        <div>
          <label htmlFor='old_selling_price'>Old Selling Price</label>
          <input
            type='number'
            name='old_selling_price'
            onChange={handleChange}
            required
          />
          <span>{formErrors.old_selling_price}</span>
        </div>

        <div>
          <label htmlFor='new_selling_price'>New Selling Price</label>
          <input
            type='number'
            name='new_selling_price'
            onChange={handleChange}
            required
          />
          <span>{formErrors.new_selling_price}</span>
        </div>

        <div>
          <label htmlFor='employee_id'>Employee ID</label>
          <select
            name='employee_id'
            onChange={handleChange}
            value={productHistoryData.employee_id}
            required
          >
            <option value='' disabled>
              Select Employee ID
            </option>
            {employeeOptions.map((employee) => (
              <option key={employee.employee_id} value={employee.employee_id}>
                {employee.employee_id}
              </option>
            ))}
          </select>
          <span>{formErrors.employee_id}</span>
        </div>

        <span>
          <input type='submit' value='Confirm' />
          <input type='submit' value='Close' onClick={onClose} />
        </span>
      </form>
    </div>
  );
};

AddProductHistory.propTypes = {
  onClose: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired,
};

// * EDIT PRODUCT HISTORY MODAL
const EditProductHistory = ({ onClose, productHistoryData, onSave }) => {
  const [editedData, setEditedData] = useState(productHistoryData);
  const [formErrors, setFormErrors] = useState({});
  const [productOptions, setProductOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);

  useEffect(() => {
    setEditedData(productHistoryData);

    const fetchProductEmployees = async () => {
      try {
        const productResponse = await fetch('/api/admin/products');
        const productData = await productResponse.json();
        setProductOptions(productData);
      } catch (error) {
        console.error('Error fetching product options:', error);
      }

      try {
        const employeeResponse = await fetch('/api/admin/employees');
        const employeeData = await employeeResponse.json();
        setEmployeeOptions(employeeData);
      } catch (error) {
        console.error('Error fetching employee options:', error);
      }
    };

    fetchProductEmployees();
  }, [productHistoryData]);

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
    <div className='ProductHistory__Modal__Edit Modal'>
      <h1>Edit Product History</h1>

      <form className='ProductHistory__Edit'>
        <div>
          <label htmlFor='product_history_id'>ID</label>
          <input
            type='text'
            name='product_history_id'
            value={editedData.product_history_id}
            onChange={handleChange}
            disabled
          />
          <span>{formErrors.product_history_id}</span>
        </div>

        <div>
          <label htmlFor='product_id'>Product ID</label>
          <select
            name='product_id'
            onChange={handleChange}
            value={editedData.product_id}
            required
          >
            <option value='' disabled>
              Select Product ID
            </option>
            {productOptions.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_id}
              </option>
            ))}
          </select>
          <span>{formErrors.product_id}</span>
        </div>

        <div>
          <label htmlFor='old_bought_price'>Old Bought Price</label>
          <input
            type='number'
            name='old_bought_price'
            value={editedData.old_bought_price}
            onChange={handleChange}
            required
          />
          <span>{formErrors.old_bought_price}</span>
        </div>

        <div>
          <label htmlFor='new_bought_price'>New Bought Price</label>
          <input
            type='number'
            name='new_bought_price'
            value={editedData.new_bought_price}
            onChange={handleChange}
            required
          />
          <span>{formErrors.new_bought_price}</span>
        </div>

        <div>
          <label htmlFor='old_selling_price'>Old Selling Price</label>
          <input
            type='number'
            name='old_selling_price'
            value={editedData.old_selling_price}
            onChange={handleChange}
            required
          />
          <span>{formErrors.old_selling_price}</span>
        </div>

        <div>
          <label htmlFor='new_selling_price'>New Selling Price</label>
          <input
            type='number'
            name='new_selling_price'
            value={editedData.new_selling_price}
            onChange={handleChange}
            required
          />
          <span>{formErrors.new_selling_price}</span>
        </div>

        <div>
          <label htmlFor='employee_id'>Employee ID</label>
          <select
            name='employee_id'
            onChange={handleChange}
            value={editedData.employee_id}
            required
          >
            <option value='' disabled>
              Select Employee ID
            </option>
            {employeeOptions.map((employee) => (
              <option key={employee.employee_id} value={employee.employee_id}>
                {employee.employee_id}
              </option>
            ))}
          </select>
          <span>{formErrors.employee_id}</span>
        </div>

        <span>
          <input type='submit' value='Confirm' onClick={handleConfirm} />
          <input type='submit' value='Close' onClick={onClose} />
        </span>
      </form>
    </div>
  );
};

EditProductHistory.propTypes = {
  onClose: PropTypes.func.isRequired,
  productHistoryData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

// * REMOVE PRODUCT HISTORY MODAL
const RemoveProductHistory = ({
  onClose,
  onDelete,
  selectedProductHistory,
}) => {
  const handleConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <div className='ProductHistory__Modal__Remove Modal'>
      <p>
        Are you sure you want to delete this product history with &quot;
        {selectedProductHistory}&quot; ID?
      </p>
      <span>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </span>
    </div>
  );
};

RemoveProductHistory.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedProductHistory: PropTypes.string,
};

// ProductHistory Component
const ProductHistory = () => {
  const [isAddProductHistoryModalOpen, setAddProductHistoryModalOpen] =
    useState(false);
  const [isEditProductHistoryModalOpen, setEditProductHistoryModalOpen] =
    useState(false);
  const [isRemoveProductHistoryModalOpen, setRemoveProductHistoryModalOpen] =
    useState(false);
  const [selectedProductHistory, setSelectedProductHistory] = useState(null);
  const [productHistoryData, setProductHistoryData] = useState([]);

  const toggleAddProductHistoryModal = () => {
    setAddProductHistoryModalOpen(!isAddProductHistoryModalOpen);
  };

  const toggleEditProductHistoryModal = (productHistory) => {
    setSelectedProductHistory(productHistory);
    setEditProductHistoryModalOpen(!isEditProductHistoryModalOpen);
  };

  const toggleRemoveProductHistoryModal = (productHistory) => {
    setSelectedProductHistory(productHistory);
    setRemoveProductHistoryModalOpen(!isRemoveProductHistoryModalOpen);
  };

  const handleInsert = (insertData) => {
    const requiredFields = [
      'product_history_id',
      'product_id',
      'old_bought_price',
      'new_bought_price',
      'old_selling_price',
      'new_selling_price',
      'employee_id',
    ];

    const hasEmptyField = requiredFields.some((field) => !insertData[field]);

    if (hasEmptyField) {
      alert('Please fill in all required fields.');
    } else {
      fetch('/api/admin/product_history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(insertData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('POST request successful:', data);
          fetchProductHistoryData();
        })
        .catch((error) =>
          console.error('Error during POST request:', error.message)
        );
    }
  };

  const handleEditSave = (editedData) => {
    delete editedData.change_datetime;

    fetch(`/api/admin/product_history/${editedData.product_history_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('PUT request successful:', data);
        fetchProductHistoryData();
      })
      .catch((error) => console.error('Error during PUT request:', error));
  };

  const handleDelete = () => {
    fetch(
      `/api/admin/product_history/${selectedProductHistory.product_history_id}`,
      {
        method: 'DELETE',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('DELETE request successful:', data);
        fetchProductHistoryData();
      })
      .catch((error) => console.error('Error during DELETE request:', error));
  };

  const fetchProductHistoryData = () => {
    fetch('/api/admin/product_history')
      .then((response) => response.json())
      .then((data) => {
        setProductHistoryData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchProductHistoryData();
  }, []);

  return (
    <div className='ProductHistory'>
      <div className='ProductHistory__Filter'>
        <p>All Product History</p>
        <div className='ProductHistory__Filter__Add'>
          <button onClick={toggleAddProductHistoryModal}>
            add product history
          </button>
        </div>
      </div>

      <div className='ProductHistory__Table'>
        <table>
          <thead>
            <tr>
              <th>History ID</th>
              <th>Product ID</th>
              <th>Old Bought Price</th>
              <th>New Bought Price</th>
              <th>Old Selling Price</th>
              <th>New Selling Price</th>
              <th>Change Datetime</th>
              <th>Employee ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productHistoryData.map((history) => (
              <tr key={history.product_history_id}>
                <td>{history.product_history_id}</td>
                <td>{history.product_id}</td>
                <td>{history.old_bought_price}</td>
                <td>{history.new_bought_price}</td>
                <td>{history.old_selling_price}</td>
                <td>{history.new_selling_price}</td>
                <td>{history.change_datetime}</td>
                <td>{history.employee_id}</td>
                <td>
                  <button
                    onClick={() => toggleEditProductHistoryModal(history)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleRemoveProductHistoryModal(history)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {isAddProductHistoryModalOpen && (
        <AddProductHistory
          onClose={toggleAddProductHistoryModal}
          onInsert={handleInsert}
        />
      )}
      {isEditProductHistoryModalOpen && (
        <EditProductHistory
          onClose={() => setEditProductHistoryModalOpen(false)}
          productHistoryData={selectedProductHistory}
          onSave={handleEditSave}
        />
      )}
      {isRemoveProductHistoryModalOpen && (
        <RemoveProductHistory
          onClose={() => setRemoveProductHistoryModalOpen(false)}
          onDelete={handleDelete}
          selectedProductHistory={selectedProductHistory.product_history_id}
        />
      )}
    </div>
  );
};

export default ProductHistory;
