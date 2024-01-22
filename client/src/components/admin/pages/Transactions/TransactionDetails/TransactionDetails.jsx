import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './TransactionDetails.scss';

// * ADD TRANSACTION DETAILS MODAL
const AddTransactionDetails = ({ onClose, onInsert }) => {
  const [transactionDetailsData, setTransactionDetailsData] = useState({
    transaction_id: '',
    product_id: '',
    quantity: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [transactionOptions, setTransactionOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    const fetchTransactionProducts = async () => {
      try {
        const transactionResponse = await fetch('/api/admin/transactions');
        const transactionData = await transactionResponse.json();
        setTransactionOptions(transactionData);
      } catch (error) {
        console.error('Error fetching transaction options:', error);
      }

      try {
        const productResponse = await fetch('/api/admin/products');
        const productData = await productResponse.json();
        setProductOptions(productData);
      } catch (error) {
        console.error('Error fetching product options:', error);
      }
    };

    fetchTransactionProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionDetailsData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    Object.entries(transactionDetailsData).forEach(([key, value]) => {
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
      onInsert(transactionDetailsData);
      onClose();
    }
  };

  return (
    <div className='TransactionDetails__Modal__Add Modal'>
      <h1>Add Transaction Details</h1>

      <form className='TransactionDetails__Add' onSubmit={handleConfirm}>
        <div>
          <label htmlFor='transaction_id'>Transaction ID</label>
          <select
            name='transaction_id'
            onChange={handleChange}
            value={transactionDetailsData.transaction_id}
            required
          >
            <option value='' disabled>
              Select Transaction ID
            </option>
            {transactionOptions.map((transaction) => (
              <option
                key={transaction.transaction_id}
                value={transaction.transaction_id}
              >
                {transaction.transaction_id}
              </option>
            ))}
          </select>
          <span>{formErrors.transaction_id}</span>
        </div>

        <div>
          <label htmlFor='product_id'>Product ID</label>
          <select
            name='product_id'
            onChange={handleChange}
            value={transactionDetailsData.product_id}
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
          <label htmlFor='quantity'>Quantity</label>
          <input
            type='number'
            name='quantity'
            onChange={handleChange}
            required
          />
          <span>{formErrors.quantity}</span>
        </div>

        <span>
          <input type='submit' value='Confirm' />
          <input type='submit' value='Close' onClick={onClose} />
        </span>
      </form>
    </div>
  );
};

AddTransactionDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired,
};

// * EDIT TRANSACTION DETAILS MODAL
const EditTransactionDetails = ({
  onClose,
  transactionDetailsData,
  onSave,
}) => {
  const [editedData, setEditedData] = useState(transactionDetailsData);
  const [formErrors, setFormErrors] = useState({});
  const [transactionOptions, setTransactionOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    setEditedData(transactionDetailsData);

    const fetchTransactionProducts = async () => {
      try {
        const transactionResponse = await fetch('/api/admin/transactions');
        const transactionData = await transactionResponse.json();
        setTransactionOptions(transactionData);
      } catch (error) {
        console.error('Error fetching transaction options:', error);
      }

      try {
        const productResponse = await fetch('/api/admin/products');
        const productData = await productResponse.json();
        setProductOptions(productData);
      } catch (error) {
        console.error('Error fetching product options:', error);
      }
    };

    fetchTransactionProducts();
  }, [transactionDetailsData]);

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
    <div className='TransactionDetails__Modal__Edit Modal'>
      <h1>Edit Transaction Details</h1>

      <form className='TransactionDetails__Edit'>
        <div>
          <label htmlFor='transaction_id'>Transaction ID</label>
          <select
            name='transaction_id'
            onChange={handleChange}
            value={editedData.transaction_id}
            disabled
          >
            {transactionOptions.map((transaction) => (
              <option
                key={transaction.transaction_id}
                value={transaction.transaction_id}
              >
                {transaction.transaction_id}
              </option>
            ))}
          </select>
          <span>{formErrors.transaction_id}</span>
        </div>

        <div>
          <label htmlFor='product_id'>Product ID</label>
          <select
            name='product_id'
            onChange={handleChange}
            value={editedData.product_id}
            required
          >
            {productOptions.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_id}
              </option>
            ))}
          </select>
          <span>{formErrors.product_id}</span>
        </div>

        <div>
          <label htmlFor='quantity'>Quantity</label>
          <input
            type='number'
            name='quantity'
            value={editedData.quantity}
            onChange={handleChange}
            required
          />
          <span>{formErrors.quantity}</span>
        </div>

        <span>
          <input type='submit' value='Confirm' onClick={handleConfirm} />
          <input type='submit' value='Close' onClick={onClose} />
        </span>
      </form>
    </div>
  );
};

EditTransactionDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  transactionDetailsData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

// * REMOVE TRANSACTION DETAILS MODAL
const RemoveTransactionDetails = ({
  onClose,
  onDelete,
  selectedTransactionDetails,
}) => {
  const handleConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <div className='TransactionDetails__Modal__Remove Modal'>
      <p>
        Are you sure you want to delete this transaction detail with &quot;
        {selectedTransactionDetails}&quot; transaction id?
      </p>
      <span>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </span>
    </div>
  );
};

RemoveTransactionDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedTransactionDetails: PropTypes.string,
};

// TransactionDetails Component
const TransactionDetails = () => {
  const [isAddTransactionDetailsModalOpen, setAddTransactionDetailsModalOpen] =
    useState(false);
  const [
    isEditTransactionDetailsModalOpen,
    setEditTransactionDetailsModalOpen,
  ] = useState(false);
  const [
    isRemoveTransactionDetailsModalOpen,
    setRemoveTransactionDetailsModalOpen,
  ] = useState(false);
  const [selectedTransactionDetails, setSelectedTransactionDetails] =
    useState(null);
  const [transactionDetailsData, setTransactionDetailsData] = useState([]);

  const toggleAddTransactionDetailsModal = () => {
    setAddTransactionDetailsModalOpen(!isAddTransactionDetailsModalOpen);
  };

  const toggleEditTransactionDetailsModal = (transactionDetails) => {
    setSelectedTransactionDetails(transactionDetails);
    setEditTransactionDetailsModalOpen(!isEditTransactionDetailsModalOpen);
  };

  const toggleRemoveTransactionDetailsModal = (transactionDetails) => {
    setSelectedTransactionDetails(transactionDetails);
    setRemoveTransactionDetailsModalOpen(!isRemoveTransactionDetailsModalOpen);
  };

  const handleInsert = (insertData) => {
    const requiredFields = ['transaction_id', 'product_id', 'quantity'];

    const hasEmptyField = requiredFields.some((field) => !insertData[field]);

    if (hasEmptyField) {
      alert('Please fill in all required fields.');
    } else {
      fetch('/api/admin/transaction_details', {
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
          fetchTransactionDetailsData();
        })
        .catch((error) =>
          console.error('Error during POST request:', error.message)
        );
    }
  };

  const handleEditSave = (editedData) => {
    fetch(
      `/api/admin/transaction_details/${editedData.transaction_id}/${editedData.product_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('PUT request successful:', data);
        fetchTransactionDetailsData();
      })
      .catch((error) => console.error('Error during PUT request:', error));
  };

  const handleDelete = () => {
    fetch(
      `/api/admin/transaction_details/${selectedTransactionDetails.transaction_id}/${selectedTransactionDetails.product_id}`,
      {
        method: 'DELETE',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('DELETE request successful:', data);
        fetchTransactionDetailsData();
      })
      .catch((error) => console.error('Error during DELETE request:', error));
  };

  const fetchTransactionDetailsData = () => {
    fetch('/api/admin/transaction_details')
      .then((response) => response.json())
      .then((data) => {
        setTransactionDetailsData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchTransactionDetailsData();
  }, []);

  return (
    <div className='TransactionDetails'>
      <div className='TransactionDetails__Filter'>
        <p>All Transaction Details</p>
        <div className='TransactionDetails__Filter__Add'>
          <button onClick={toggleAddTransactionDetailsModal}>
            add transaction detail
          </button>
        </div>
      </div>

      <div className='TransactionDetails__Table'>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactionDetailsData.map((transactionDetails) => (
              <tr
                key={`${transactionDetails.transaction_id}-${transactionDetails.product_id}`}
              >
                <td>{transactionDetails.transaction_id}</td>
                <td>{transactionDetails.product_id}</td>
                <td>{transactionDetails.quantity}</td>
                <td>{transactionDetails.subtotal}</td>
                <td>
                  <button
                    onClick={() =>
                      toggleEditTransactionDetailsModal(transactionDetails)
                    }
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      toggleRemoveTransactionDetailsModal(transactionDetails)
                    }
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
      {isAddTransactionDetailsModalOpen && (
        <AddTransactionDetails
          onClose={toggleAddTransactionDetailsModal}
          onInsert={handleInsert}
        />
      )}
      {isEditTransactionDetailsModalOpen && (
        <EditTransactionDetails
          onClose={() => setEditTransactionDetailsModalOpen(false)}
          transactionDetailsData={selectedTransactionDetails}
          onSave={handleEditSave}
        />
      )}
      {isRemoveTransactionDetailsModalOpen && (
        <RemoveTransactionDetails
          onClose={() => setRemoveTransactionDetailsModalOpen(false)}
          onDelete={handleDelete}
          selectedTransactionDetails={selectedTransactionDetails.transaction_id}
        />
      )}
    </div>
  );
};

export default TransactionDetails;
