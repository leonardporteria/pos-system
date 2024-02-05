import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './ProductInventory.scss';

// * ADD PRODUCT INVENTORY MODAL
const AddProductInventory = ({ onClose, onInsert }) => {
  const [productInventoryData, setProductInventoryData] = useState({
    inventory_id: '',
    product_id: '',
    current_stock: '',
    minimum_stock_level: '',
    maximum_stock_level: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/admin/products');
        const data = await response.json();
        setProductOptions(data);
      } catch (error) {
        console.error('Error fetching product options:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInventoryData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    Object.entries(productInventoryData).forEach(([key, value]) => {
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
      onInsert(productInventoryData);
      onClose();
    }
  };

  return (
    <div className='ProductInventory__Modal__Add Modal'>
      <h1>Add Product Inventory</h1>

      <form className='ProductInventory__Add' onSubmit={handleConfirm}>
        <div>
          <label htmlFor='inventory_id'>Inventory ID [INV-######]</label>
          <input
            type='text'
            name='inventory_id'
            onChange={handleChange}
            pattern='^INV-\d{6}$'
            placeholder='Format: INV-######'
            required
          />
          <span>{formErrors.inventory_id}</span>
        </div>

        <div>
          <label htmlFor='product_id'>Product ID</label>
          <select
            name='product_id'
            onChange={handleChange}
            value={productInventoryData.product_id}
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
          <label>Current Stock</label>
          <input
            type='number'
            name='current_stock'
            onChange={handleChange}
            required
          />
          <span>{formErrors.current_stock}</span>
        </div>

        <div>
          <label>Minimum Stock Level</label>
          <input
            type='number'
            name='minimum_stock_level'
            onChange={handleChange}
            required
          />
          <span>{formErrors.minimum_stock_level}</span>
        </div>

        <div>
          <label>Maximum Stock Level</label>
          <input
            type='number'
            name='maximum_stock_level'
            onChange={handleChange}
            required
          />
          <span>{formErrors.maximum_stock_level}</span>
        </div>

        <span>
          <input type='submit' value='Confirm' />
          <input type='submit' value='Close' onClick={onClose} />
        </span>
      </form>
    </div>
  );
};

AddProductInventory.propTypes = {
  onClose: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired,
};

// * EDIT PRODUCT INVENTORY MODAL
const EditProductInventory = ({ onClose, productInventoryData, onSave }) => {
  const [editedData, setEditedData] = useState(productInventoryData);
  const [formErrors, setFormErrors] = useState({});
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    setEditedData(productInventoryData);

    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/admin/products');
        const data = await response.json();
        setProductOptions(data);
      } catch (error) {
        console.error('Error fetching product options:', error);
      }
    };

    fetchProducts();
  }, [productInventoryData]);

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
      if (typeof value === 'string' && value.trim() === '') {
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
    <div className='ProductInventory__Modal__Edit Modal'>
      <h1>Edit Product Inventory</h1>

      <form className='ProductInventory__Edit'>
        <div>
          <label htmlFor='inventory_id'>Inventory ID</label>
          <input
            type='text'
            name='inventory_id'
            value={editedData.inventory_id}
            onChange={handleChange}
            disabled
          />
          <span>{formErrors.inventory_id}</span>
        </div>

        <div>
          <label htmlFor='product_id'>Product ID</label>
          <select
            name='product_id'
            onChange={handleChange}
            value={editedData.product_id}
            required
            disabled
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
          <label htmlFor='current_stock'>Current Stock</label>
          <input
            type='number'
            name='current_stock'
            value={editedData.current_stock}
            onChange={handleChange}
            required
          />
          <span>{formErrors.current_stock}</span>
        </div>

        <div>
          <label htmlFor='minimum_stock_level'>Minimum Stock Level</label>
          <input
            type='number'
            name='minimum_stock_level'
            value={editedData.minimum_stock_level}
            onChange={handleChange}
            required
          />
          <span>{formErrors.minimum_stock_level}</span>
        </div>

        <div>
          <label htmlFor='maximum_stock_level'>Maximum Stock Level</label>
          <input
            type='number'
            name='maximum_stock_level'
            value={editedData.maximum_stock_level}
            onChange={handleChange}
            required
          />
          <span>{formErrors.maximum_stock_level}</span>
        </div>

        <span>
          <input type='submit' value='Confirm' onClick={handleConfirm} />
          <input type='submit' value='Close' onClick={onClose} />
        </span>
      </form>
    </div>
  );
};

EditProductInventory.propTypes = {
  onClose: PropTypes.func.isRequired,
  productInventoryData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

// * REMOVE PRODUCT INVENTORY MODAL
const RemoveProductInventory = ({
  onClose,
  onDelete,
  selectedProductInventory,
}) => {
  const handleConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <div className='ProductInventory__Modal__Remove Modal'>
      <p>
        Are you sure you want to delete this product inventory with &quot;
        {selectedProductInventory}&quot; inventory id?
      </p>
      <span>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </span>
    </div>
  );
};

RemoveProductInventory.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedProductInventory: PropTypes.string,
};

// ProductInventory Component
const ProductInventory = () => {
  const [isAddProductInventoryModalOpen, setAddProductInventoryModalOpen] =
    useState(false);
  const [isEditProductInventoryModalOpen, setEditProductInventoryModalOpen] =
    useState(false);
  const [
    isRemoveProductInventoryModalOpen,
    setRemoveProductInventoryModalOpen,
  ] = useState(false);
  const [selectedProductInventory, setSelectedProductInventory] =
    useState(null);
  const [productInventoryData, setProductInventoryData] = useState([]);

  const toggleAddProductInventoryModal = () => {
    setAddProductInventoryModalOpen(!isAddProductInventoryModalOpen);
  };

  const toggleEditProductInventoryModal = (productInventory) => {
    setSelectedProductInventory(productInventory);
    setEditProductInventoryModalOpen(!isEditProductInventoryModalOpen);
  };

  const toggleRemoveProductInventoryModal = (productInventory) => {
    setSelectedProductInventory(productInventory);
    setRemoveProductInventoryModalOpen(!isRemoveProductInventoryModalOpen);
  };

  const handleInsert = (insertData) => {
    const requiredFields = [
      'inventory_id',
      'product_id',
      'current_stock',
      'minimum_stock_level',
      'maximum_stock_level',
    ];

    const hasEmptyField = requiredFields.some((field) => !insertData[field]);

    if (hasEmptyField) {
      alert('Please fill in all required fields.');
    } else {
      fetch('/api/admin/product_inventory', {
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
          fetchProductInventoryData();
        })
        .catch((error) =>
          console.error('Error during POST request:', error.message)
        );
    }
  };

  const handleEditSave = (editedData) => {
    delete editedData.last_stock_update;

    console.log(`/api/admin/product_inventory/${editedData.inventory_id}`);
    fetch(`/api/admin/product_inventory/${editedData.inventory_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('PUT request successful:', data);
        fetchProductInventoryData();
      })
      .catch((error) => console.error('Error during PUT request:', error));
  };

  const handleDelete = () => {
    fetch(
      `/api/admin/product_inventory/${selectedProductInventory.inventory_id}`,
      {
        method: 'DELETE',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('DELETE request successful:', data);
        fetchProductInventoryData();
      })
      .catch((error) => console.error('Error during DELETE request:', error));
  };

  const fetchProductInventoryData = () => {
    fetch('/api/admin/product_inventory')
      .then((response) => response.json())
      .then((data) => {
        setProductInventoryData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchProductInventoryData();
  }, []);

  return (
    <div className='ProductInventory'>
      <div className='ProductInventory__Filter'>
        <p>All Product Inventory</p>
        <div className='ProductInventory__Filter__Add'>
          <button onClick={toggleAddProductInventoryModal}>
            add product inventory
          </button>
        </div>
      </div>

      <div className='ProductInventory__Table'>
        <table>
          <thead>
            <tr>
              <th>Inventory ID</th>
              <th>Product ID</th>
              <th>Current Stock</th>
              <th>Minimum Stock Level</th>
              <th>Maximum Stock Level</th>
              <th>Last Stock Update</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productInventoryData.map((productInventory) => (
              <tr key={productInventory.inventory_id}>
                <td>{productInventory.inventory_id}</td>
                <td>{productInventory.product_id}</td>
                <td>{productInventory.current_stock}</td>
                <td>{productInventory.minimum_stock_level}</td>
                <td>{productInventory.maximum_stock_level}</td>
                <td>{productInventory.last_stock_update}</td>
                <td>
                  <button
                    onClick={() =>
                      toggleEditProductInventoryModal(productInventory)
                    }
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      toggleRemoveProductInventoryModal(productInventory)
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
      {isAddProductInventoryModalOpen && (
        <AddProductInventory
          onClose={toggleAddProductInventoryModal}
          onInsert={handleInsert}
        />
      )}
      {isEditProductInventoryModalOpen && (
        <EditProductInventory
          onClose={() => setEditProductInventoryModalOpen(false)}
          productInventoryData={selectedProductInventory}
          onSave={handleEditSave}
        />
      )}
      {isRemoveProductInventoryModalOpen && (
        <RemoveProductInventory
          onClose={() => setRemoveProductInventoryModalOpen(false)}
          onDelete={handleDelete}
          selectedProductInventory={selectedProductInventory.inventory_id}
        />
      )}
    </div>
  );
};

export default ProductInventory;
