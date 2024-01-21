import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './OrderDetails.scss';

// * ADD ORDER DETAILS MODAL
const AddOrderDetails = ({ onClose, onInsert }) => {
  const [orderDetailsData, setOrderDetailsData] = useState({
    order_id: '',
    inventory_id: '',
    expected_date: '',
    actual_date: '',
    order_quantity: '',
    supplier_id: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [orderOptions, setOrderOptions] = useState([]);
  const [inventoryOptions, setInventoryOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const orderResponse = await fetch('/api/admin/orders');
        const orderData = await orderResponse.json();
        setOrderOptions(orderData);

        const inventoryResponse = await fetch('/api/admin/product_inventory');
        const inventoryData = await inventoryResponse.json();
        setInventoryOptions(inventoryData);

        const supplierResponse = await fetch('/api/admin/suppliers');
        const supplierData = await supplierResponse.json();
        setSupplierOptions(supplierData);
      } catch (error) {
        console.error('Error fetching dropdown options:', error);
      }
    };

    fetchDropdownOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetailsData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    Object.entries(orderDetailsData).forEach(([key, value]) => {
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
      onInsert(orderDetailsData);
      onClose();
    }
  };

  return (
    <div className='OrderDetails__Modal__Add Modal'>
      <h1>Add Order Details</h1>

      <form className='OrderDetails__Add' onSubmit={handleConfirm}>
        <div>
          <label htmlFor='order_id'>Order ID</label>
          <select
            name='order_id'
            onChange={handleChange}
            value={orderDetailsData.order_id}
            required
          >
            <option value='' disabled>
              Select Order ID
            </option>
            {orderOptions.map((order) => (
              <option key={order.order_id} value={order.order_id}>
                {order.order_id}
              </option>
            ))}
          </select>
          <span>{formErrors.order_id}</span>
        </div>

        <div>
          <label htmlFor='inventory_id'>Inventory ID</label>
          <select
            name='inventory_id'
            onChange={handleChange}
            value={orderDetailsData.inventory_id}
            required
          >
            <option value='' disabled>
              Select Inventory ID
            </option>
            {inventoryOptions.map((inventory) => (
              <option
                key={inventory.inventory_id}
                value={inventory.inventory_id}
              >
                {inventory.inventory_id}
              </option>
            ))}
          </select>
          <span>{formErrors.inventory_id}</span>
        </div>

        <div>
          <label>Expected Date</label>
          <input
            type='date'
            name='expected_date'
            onChange={handleChange}
            required
          />
          <span>{formErrors.expected_date}</span>
        </div>

        <div>
          <label>Actual Date</label>
          <input
            type='date'
            name='actual_date'
            onChange={handleChange}
            required
          />
          <span>{formErrors.actual_date}</span>
        </div>

        <div>
          <label>Order Quantity</label>
          <input
            type='number'
            name='order_quantity'
            onChange={handleChange}
            required
          />
          <span>{formErrors.order_quantity}</span>
        </div>

        <div>
          <label htmlFor='supplier_id'>Supplier ID</label>
          <select
            name='supplier_id'
            onChange={handleChange}
            value={orderDetailsData.supplier_id}
            required
          >
            <option value='' disabled>
              Select Supplier ID
            </option>
            {supplierOptions.map((supplier) => (
              <option key={supplier.supplier_id} value={supplier.supplier_id}>
                {supplier.supplier_id}
              </option>
            ))}
          </select>
          <span>{formErrors.supplier_id}</span>
        </div>

        <span>
          <input type='submit' value='Confirm' />
          <input type='submit' value='Close' onClick={onClose} />
        </span>
      </form>
    </div>
  );
};

AddOrderDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired,
};

// * EDIT ORDER DETAILS MODAL
const EditOrderDetails = ({ onClose, orderDetailsData, onSave }) => {
  const [editedData, setEditedData] = useState(orderDetailsData);
  const [formErrors, setFormErrors] = useState({});
  const [orderOptions, setOrderOptions] = useState([]);
  const [inventoryOptions, setInventoryOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);

  useEffect(() => {
    setEditedData(orderDetailsData);

    const fetchDropdownOptions = async () => {
      try {
        const orderResponse = await fetch('/api/admin/orders');
        const orderData = await orderResponse.json();
        setOrderOptions(orderData);

        const inventoryResponse = await fetch('/api/admin/product_inventory');
        const inventoryData = await inventoryResponse.json();
        setInventoryOptions(inventoryData);

        const supplierResponse = await fetch('/api/admin/suppliers');
        const supplierData = await supplierResponse.json();
        setSupplierOptions(supplierData);
      } catch (error) {
        console.error('Error fetching dropdown options:', error);
      }
    };

    fetchDropdownOptions();
  }, [orderDetailsData]);

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
    <div className='OrderDetails__Modal__Edit Modal'>
      <h1>Edit Order Details</h1>

      <form className='OrderDetails__Edit'>
        <div>
          <label htmlFor='order_id'>Order ID</label>
          <select
            name='order_id'
            onChange={handleChange}
            value={editedData.order_id}
            disabled
          >
            <option value='' disabled>
              Select Order ID
            </option>
            {orderOptions.map((order) => (
              <option key={order.order_id} value={order.order_id}>
                {order.order_id}
              </option>
            ))}
          </select>
          <span>{formErrors.order_id}</span>
        </div>

        <div>
          <label htmlFor='inventory_id'>Inventory ID</label>
          <select
            name='inventory_id'
            onChange={handleChange}
            value={editedData.inventory_id}
            required
          >
            <option value='' disabled>
              Select Inventory ID
            </option>
            {inventoryOptions.map((inventory) => (
              <option
                key={inventory.inventory_id}
                value={inventory.inventory_id}
              >
                {inventory.inventory_id}
              </option>
            ))}
          </select>
          <span>{formErrors.inventory_id}</span>
        </div>

        <div>
          <label htmlFor='expected_date'>Expected Date</label>
          <input
            type='date'
            name='expected_date'
            value={editedData.expected_date}
            onChange={handleChange}
            required
          />
          <span>{formErrors.expected_date}</span>
        </div>

        <div>
          <label htmlFor='actual_date'>Actual Date</label>
          <input
            type='date'
            name='actual_date'
            value={editedData.actual_date}
            onChange={handleChange}
            required
          />
          <span>{formErrors.actual_date}</span>
        </div>

        <div>
          <label htmlFor='order_quantity'>Order Quantity</label>
          <input
            type='number'
            name='order_quantity'
            value={editedData.order_quantity}
            onChange={handleChange}
            required
          />
          <span>{formErrors.order_quantity}</span>
        </div>

        <div>
          <label htmlFor='supplier_id'>Supplier ID</label>
          <select
            name='supplier_id'
            onChange={handleChange}
            value={editedData.supplier_id}
            required
          >
            <option value='' disabled>
              Select Supplier ID
            </option>
            {supplierOptions.map((supplier) => (
              <option key={supplier.supplier_id} value={supplier.supplier_id}>
                {supplier.supplier_id}
              </option>
            ))}
          </select>
          <span>{formErrors.supplier_id}</span>
        </div>

        <span>
          <input type='submit' value='Confirm' onClick={handleConfirm} />
          <input type='submit' value='Close' onClick={onClose} />
        </span>
      </form>
    </div>
  );
};

EditOrderDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  orderDetailsData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

// * REMOVE ORDER DETAILS MODAL
const RemoveOrderDetails = ({ onClose, onDelete, selectedOrderDetails }) => {
  const handleConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <div className='OrderDetails__Modal__Remove Modal'>
      <p>
        Are you sure you want to delete this order with &quot;
        {selectedOrderDetails}&quot; order ID?
      </p>
      <span>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </span>
    </div>
  );
};

RemoveOrderDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedOrderDetails: PropTypes.string,
};

// OrderDetails Component
const OrderDetails = () => {
  const [isAddOrderDetailsModalOpen, setAddOrderDetailsModalOpen] =
    useState(false);
  const [isEditOrderDetailsModalOpen, setEditOrderDetailsModalOpen] =
    useState(false);
  const [isRemoveOrderDetailsModalOpen, setRemoveOrderDetailsModalOpen] =
    useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [orderDetailsData, setOrderDetailsData] = useState([]);

  const toggleAddOrderDetailsModal = () => {
    setAddOrderDetailsModalOpen(!isAddOrderDetailsModalOpen);
  };

  const toggleEditOrderDetailsModal = (orderDetails) => {
    setSelectedOrderDetails(orderDetails);
    setEditOrderDetailsModalOpen(!isEditOrderDetailsModalOpen);
  };

  const toggleRemoveOrderDetailsModal = (orderDetails) => {
    setSelectedOrderDetails(orderDetails);
    setRemoveOrderDetailsModalOpen(!isRemoveOrderDetailsModalOpen);
  };

  const handleInsert = (insertData) => {
    const requiredFields = [
      'order_id',
      'inventory_id',
      'expected_date',
      'actual_date',
      'order_quantity',
      'supplier_id',
    ];

    const hasEmptyField = requiredFields.some((field) => !insertData[field]);

    if (hasEmptyField) {
      alert('Please fill in all required fields.');
    } else {
      fetch('/api/admin/order_details', {
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
          fetchOrderDetailsData();
        })
        .catch((error) =>
          console.error('Error during POST request:', error.message)
        );
    }
  };

  const handleEditSave = (editedData) => {
    console.log(`/api/admin/order_details/${editedData.order_id}`);
    fetch(
      `/api/admin/order_details/${editedData.order_id}/${editedData.inventory_id}`,
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
        fetchOrderDetailsData();
      })
      .catch((error) => console.error('Error during PUT request:', error));
  };

  const handleDelete = () => {
    fetch(
      `/api/admin/order_details/${selectedOrderDetails.order_id}/${selectedOrderDetails.inventory_id}`,
      {
        method: 'DELETE',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('DELETE request successful:', data);
        fetchOrderDetailsData();
      })
      .catch((error) => console.error('Error during DELETE request:', error));
  };

  const fetchOrderDetailsData = () => {
    fetch('/api/admin/order_details')
      .then((response) => response.json())
      .then((data) => {
        setOrderDetailsData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchOrderDetailsData();
  }, []);

  return (
    <div className='OrderDetails'>
      <div className='OrderDetails__Filter'>
        <p>All Order Details</p>
        <div className='OrderDetails__Filter__Add'>
          <button onClick={toggleAddOrderDetailsModal}>
            add order details
          </button>
        </div>
      </div>

      <div className='OrderDetails__Table'>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Inventory ID</th>
              <th>Expected Date</th>
              <th>Actual Date</th>
              <th>Order Quantity</th>
              <th>Supplier ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderDetailsData.map((orderDetails) => (
              <tr key={`${orderDetails.order_id}-${orderDetails.inventory_id}`}>
                <td>{orderDetails.order_id}</td>
                <td>{orderDetails.inventory_id}</td>
                <td>{orderDetails.expected_date}</td>
                <td>{orderDetails.actual_date}</td>
                <td>{orderDetails.order_quantity}</td>
                <td>{orderDetails.supplier_id}</td>
                <td>
                  <button
                    onClick={() => toggleEditOrderDetailsModal(orderDetails)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleRemoveOrderDetailsModal(orderDetails)}
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
      {isAddOrderDetailsModalOpen && (
        <AddOrderDetails
          onClose={toggleAddOrderDetailsModal}
          onInsert={handleInsert}
        />
      )}
      {isEditOrderDetailsModalOpen && (
        <EditOrderDetails
          onClose={() => setEditOrderDetailsModalOpen(false)}
          orderDetailsData={selectedOrderDetails}
          onSave={handleEditSave}
        />
      )}
      {isRemoveOrderDetailsModalOpen && (
        <RemoveOrderDetails
          onClose={() => setRemoveOrderDetailsModalOpen(false)}
          onDelete={handleDelete}
          selectedOrderDetails={selectedOrderDetails.order_id}
        />
      )}
    </div>
  );
};

export default OrderDetails;
