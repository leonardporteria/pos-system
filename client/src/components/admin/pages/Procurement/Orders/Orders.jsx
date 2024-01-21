import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Orders.scss';

// * ADD ORDERS MODAL
const AddOrders = ({ onClose, onInsert }) => {
  const [orderData, setOrderData] = useState({
    order_id: '',
    employee_id: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const [employeeOptions, setEmployeeOptions] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/admin/employees');
        const data = await response.json();
        setEmployeeOptions(data);
      } catch (error) {
        console.error('Error fetching employee options:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    Object.entries(orderData).forEach(([key, value]) => {
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
      onInsert(orderData);
      onClose();
    }
  };

  return (
    <div className='Orders__Modal__Add Modal'>
      <h1>Add Orders</h1>

      <form className='Orders__Add' onSubmit={handleConfirm}>
        <div>
          <label htmlFor='order_id'>Order ID</label>
          <input type='text' name='order_id' onChange={handleChange} required />
          <span>{formErrors.order_id}</span>
        </div>

        <div>
          <label htmlFor='employee_id'>Employee ID</label>
          <select
            name='employee_id'
            onChange={handleChange}
            value={orderData.employee_id}
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

AddOrders.propTypes = {
  onClose: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired,
};

// * EDIT ORDERS MODAL
const EditOrders = ({ onClose, orderData, onSave }) => {
  const [editedData, setEditedData] = useState(orderData);
  const [formErrors, setFormErrors] = useState({});
  const [employeeOptions, setEmployeeOptions] = useState([]);

  useEffect(() => {
    setEditedData(orderData);

    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/admin/employees');
        const data = await response.json();
        setEmployeeOptions(data);
      } catch (error) {
        console.error('Error fetching employee options:', error);
      }
    };

    fetchEmployees();
  }, [orderData]);

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
    <div className='Orders__Modal__Edit Modal'>
      <h1>Edit Orders</h1>

      <form className='Orders__Edit'>
        <div>
          <label htmlFor='order_id'>Order ID</label>
          <input
            type='text'
            name='order_id'
            value={editedData.order_id}
            onChange={handleChange}
            disabled
          />
          <span>{formErrors.order_id}</span>
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

EditOrders.propTypes = {
  onClose: PropTypes.func.isRequired,
  orderData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

// * REMOVE ORDERS MODAL
const RemoveOrders = ({ onClose, onDelete, selectedOrder }) => {
  const handleConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <div className='Orders__Modal__Remove Modal'>
      <p>
        Are you sure you want to delete this order with &quot;
        {selectedOrder}&quot; order id?
      </p>
      <span>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </span>
    </div>
  );
};

RemoveOrders.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedOrder: PropTypes.string,
};

// Orders Component
const Orders = () => {
  const [isAddOrdersModalOpen, setAddOrdersModalOpen] = useState(false);
  const [isEditOrdersModalOpen, setEditOrdersModalOpen] = useState(false);
  const [isRemoveOrdersModalOpen, setRemoveOrdersModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ordersData, setOrdersData] = useState([]);

  const toggleAddOrdersModal = () => {
    setAddOrdersModalOpen(!isAddOrdersModalOpen);
  };

  const toggleEditOrdersModal = (order) => {
    setSelectedOrder(order);
    setEditOrdersModalOpen(!isEditOrdersModalOpen);
  };

  const toggleRemoveOrdersModal = (order) => {
    setSelectedOrder(order);
    setRemoveOrdersModalOpen(!isRemoveOrdersModalOpen);
  };

  const handleInsert = (insertData) => {
    const requiredFields = ['order_id', 'employee_id'];

    const hasEmptyField = requiredFields.some((field) => !insertData[field]);

    if (hasEmptyField) {
      alert('Please fill in all required fields.');
    } else {
      fetch('/api/admin/orders', {
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
          fetchOrdersData();
        })
        .catch((error) =>
          console.error('Error during POST request:', error.message)
        );
    }
  };

  const handleEditSave = (editedData) => {
    delete editedData.order_date;

    console.log(`/api/admin/orders/${editedData.order_id}`);
    fetch(`/api/admin/orders/${editedData.order_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('PUT request successful:', data);
        fetchOrdersData();
      })
      .catch((error) => console.error('Error during PUT request:', error));
  };

  const handleDelete = () => {
    fetch(`/api/admin/orders/${selectedOrder.order_id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('DELETE request successful:', data);
        fetchOrdersData();
      })
      .catch((error) => console.error('Error during DELETE request:', error));
  };

  const fetchOrdersData = () => {
    fetch('/api/admin/orders')
      .then((response) => response.json())
      .then((data) => {
        setOrdersData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchOrdersData();
  }, []);

  return (
    <div className='Orders'>
      <div className='Orders__Filter'>
        <p>All Orders</p>
        <div className='Orders__Filter__Add'>
          <button onClick={toggleAddOrdersModal}>add order</button>
        </div>
      </div>

      <div className='Orders__Table'>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Employee ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.order_date}</td>
                <td>{order.employee_id}</td>
                <td>
                  <button onClick={() => toggleEditOrdersModal(order)}>
                    Edit
                  </button>
                  <button onClick={() => toggleRemoveOrdersModal(order)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {isAddOrdersModalOpen && (
        <AddOrders onClose={toggleAddOrdersModal} onInsert={handleInsert} />
      )}
      {isEditOrdersModalOpen && (
        <EditOrders
          onClose={() => setEditOrdersModalOpen(false)}
          orderData={selectedOrder}
          onSave={handleEditSave}
        />
      )}
      {isRemoveOrdersModalOpen && (
        <RemoveOrders
          onClose={() => setRemoveOrdersModalOpen(false)}
          onDelete={handleDelete}
          selectedOrder={selectedOrder.order_id}
        />
      )}
    </div>
  );
};

export default Orders;
