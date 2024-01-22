import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Transactions.scss';

// * ADD TRANSACTIONS MODAL
const AddTransactions = ({ onClose, onInsert }) => {
  const [transactionData, setTransactionData] = useState({
    transaction_id: '',
    payment_method: '',
    total_amount: '',
    employee_id: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const [employeeOptions, setEmployeeOptions] = useState([]);

  useEffect(() => {
    const fetchEmployeeOptions = async () => {
      try {
        const employeeResponse = await fetch('/api/admin/employees');
        const employeeData = await employeeResponse.json();
        setEmployeeOptions(employeeData);
      } catch (error) {
        console.error('Error fetching employee options:', error);
      }
    };

    fetchEmployeeOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    Object.entries(transactionData).forEach(([key, value]) => {
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
      onInsert(transactionData);
      onClose();
    }
  };

  return (
    <div className='Transactions__Modal__Add Modal'>
      <h1>Add Transactions</h1>

      <form className='Transactions__Add' onSubmit={handleConfirm}>
        <div>
          <label htmlFor='transaction_id'>ID</label>
          <input
            type='text'
            name='transaction_id'
            onChange={handleChange}
            required
          />
          <span>{formErrors.transaction_id}</span>
        </div>

        <div>
          <label htmlFor='payment_method'>Payment Method</label>
          <input
            type='text'
            name='payment_method'
            onChange={handleChange}
            required
          />
          <span>{formErrors.payment_method}</span>
        </div>

        <div>
          <label htmlFor='total_amount'>Total Amount</label>
          <input
            type='number'
            name='total_amount'
            onChange={handleChange}
            required
          />
          <span>{formErrors.total_amount}</span>
        </div>

        <div>
          <label htmlFor='employee_id'>Employee ID</label>
          <select
            name='employee_id'
            onChange={handleChange}
            value={transactionData.employee_id}
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

AddTransactions.propTypes = {
  onClose: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired,
};

// * EDIT TRANSACTIONS MODAL
const EditTransactions = ({ onClose, transactionData, onSave }) => {
  const [editedData, setEditedData] = useState(transactionData);
  const [formErrors, setFormErrors] = useState({});
  const [employeeOptions, setEmployeeOptions] = useState([]);

  useEffect(() => {
    setEditedData(transactionData);

    const fetchEmployeeOptions = async () => {
      try {
        const employeeResponse = await fetch('/api/admin/employees');
        const employeeData = await employeeResponse.json();
        setEmployeeOptions(employeeData);
      } catch (error) {
        console.error('Error fetching employee options:', error);
      }
    };

    fetchEmployeeOptions();
  }, [transactionData]);

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
    <div className='Transactions__Modal__Edit Modal'>
      <h1>Edit Transactions</h1>

      <form className='Transactions__Edit'>
        <div>
          <label htmlFor='transaction_id'>ID</label>
          <input
            type='text'
            name='transaction_id'
            value={editedData.transaction_id}
            onChange={handleChange}
            disabled
          />
          <span>{formErrors.transaction_id}</span>
        </div>

        <div>
          <label htmlFor='payment_method'>Payment Method</label>
          <input
            type='text'
            name='payment_method'
            value={editedData.payment_method}
            onChange={handleChange}
            required
          />
          <span>{formErrors.payment_method}</span>
        </div>

        <div>
          <label htmlFor='total_amount'>Total Amount</label>
          <input
            type='number'
            name='total_amount'
            value={editedData.total_amount}
            onChange={handleChange}
            required
          />
          <span>{formErrors.total_amount}</span>
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

EditTransactions.propTypes = {
  onClose: PropTypes.func.isRequired,
  transactionData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

// * REMOVE TRANSACTIONS MODAL
const RemoveTransactions = ({ onClose, onDelete, selectedTransaction }) => {
  const handleConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <div className='Transactions__Modal__Remove Modal'>
      <p>
        Are you sure you want to delete this transaction with &quot;
        {selectedTransaction}&quot; transaction id?
      </p>
      <span>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </span>
    </div>
  );
};

RemoveTransactions.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedTransaction: PropTypes.string,
};

// Transactions Component
const Transactions = () => {
  const [isAddTransactionsModalOpen, setAddTransactionsModalOpen] =
    useState(false);
  const [isEditTransactionsModalOpen, setEditTransactionsModalOpen] =
    useState(false);
  const [isRemoveTransactionsModalOpen, setRemoveTransactionsModalOpen] =
    useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactionsData, setTransactionsData] = useState([]);

  const toggleAddTransactionsModal = () => {
    setAddTransactionsModalOpen(!isAddTransactionsModalOpen);
  };

  const toggleEditTransactionsModal = (transaction) => {
    setSelectedTransaction(transaction);
    setEditTransactionsModalOpen(!isEditTransactionsModalOpen);
  };

  const toggleRemoveTransactionsModal = (transaction) => {
    setSelectedTransaction(transaction);
    setRemoveTransactionsModalOpen(!isRemoveTransactionsModalOpen);
  };

  const handleInsert = (insertData) => {
    const requiredFields = [
      'transaction_id',
      'payment_method',
      'total_amount',
      'employee_id',
    ];

    const hasEmptyField = requiredFields.some((field) => !insertData[field]);

    if (hasEmptyField) {
      alert('Please fill in all required fields.');
    } else {
      fetch('/api/admin/transactions', {
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
          fetchTransactionsData();
        })
        .catch((error) =>
          console.error('Error during POST request:', error.message)
        );
    }
  };

  const handleEditSave = (editedData) => {
    delete editedData.transaction_datetime;

    fetch(`/api/admin/transactions/${editedData.transaction_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('PUT request successful:', data);
        fetchTransactionsData();
      })
      .catch((error) => console.error('Error during PUT request:', error));
  };

  const handleDelete = () => {
    fetch(`/api/admin/transactions/${selectedTransaction.transaction_id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('DELETE request successful:', data);
        fetchTransactionsData();
      })
      .catch((error) => console.error('Error during DELETE request:', error));
  };

  const fetchTransactionsData = () => {
    fetch('/api/admin/transactions')
      .then((response) => response.json())
      .then((data) => {
        setTransactionsData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchTransactionsData();
  }, []);

  return (
    <div className='Transactions'>
      <div className='Transactions__Filter'>
        <p>All Transactions</p>
        <div className='Transactions__Filter__Add'>
          <button onClick={toggleAddTransactionsModal}>add transaction</button>
        </div>
      </div>

      <div className='Transactions__Table'>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Datetime</th>
              <th>Payment Method</th>
              <th>Total Amount</th>
              <th>Employee ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactionsData.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td>{transaction.transaction_id}</td>
                <td>{transaction.transaction_datetime}</td>
                <td>{transaction.payment_method}</td>
                <td>{transaction.total_amount}</td>
                <td>{transaction.employee_id}</td>
                <td>
                  <button
                    onClick={() => toggleEditTransactionsModal(transaction)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleRemoveTransactionsModal(transaction)}
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
      {isAddTransactionsModalOpen && (
        <AddTransactions
          onClose={toggleAddTransactionsModal}
          onInsert={handleInsert}
        />
      )}
      {isEditTransactionsModalOpen && (
        <EditTransactions
          onClose={() => setEditTransactionsModalOpen(false)}
          transactionData={selectedTransaction}
          onSave={handleEditSave}
        />
      )}
      {isRemoveTransactionsModalOpen && (
        <RemoveTransactions
          onClose={() => setRemoveTransactionsModalOpen(false)}
          onDelete={handleDelete}
          selectedTransaction={selectedTransaction.transaction_id}
        />
      )}
    </div>
  );
};

export default Transactions;
