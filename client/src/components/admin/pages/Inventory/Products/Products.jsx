import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Products.scss';

// * ADD PRODUCTS MODAL
const AddProducts = ({ onClose, onInsert }) => {
  const [productData, setProductData] = useState({
    product_id: '',
    barcode_id: '',
    barcode_type: '',
    product_name: '',
    unit_price: '',
    brand: '',
    classification: '',
    product_category_id: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const response = await fetch('/api/admin/product_category');
        const data = await response.json();
        setProductCategories(data);
      } catch (error) {
        console.error('Error fetching product categories:', error);
      }
    };

    fetchProductCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    Object.entries(productData).forEach(([key, value]) => {
      if (value === null || value === '') {
        errors[key] = 'This field is required';
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      onInsert(productData);
      onClose();
    }
  };

  return (
    <div className='Products__Modal__Add Modal'>
      <h1>Add Products</h1>

      <form className='Products__Add' onSubmit={handleConfirm}>
        <div>
          <label htmlFor='product_id'>ID</label>
          <input
            type='text'
            name='product_id'
            value={productData.product_id}
            onChange={handleChange}
            pattern='^PROD-\d{6}$'
            placeholder='Format: PROD-######'
            required
          />
          <span>{formErrors.product_id}</span>
        </div>

        <div>
          <label htmlFor='barcode_id'>Barcode ID</label>
          <input
            type='text'
            name='barcode_id'
            value={productData.barcode_id}
            onChange={handleChange}
            required
          />
          <span>{formErrors.barcode_id}</span>
        </div>

        <div>
          <label htmlFor='barcode_type'>Barcode Type</label>
          <input
            type='text'
            name='barcode_type'
            value={productData.barcode_type}
            onChange={handleChange}
            required
          />
          <span>{formErrors.barcode_type}</span>
        </div>

        <div>
          <label htmlFor='product_name'>Product Name</label>
          <input
            type='text'
            name='product_name'
            value={productData.product_name}
            onChange={handleChange}
            required
          />
          <span>{formErrors.product_name}</span>
        </div>

        <div>
          <label htmlFor='unit_price'>Unit Price</label>
          <input
            type='text'
            name='unit_price'
            value={productData.unit_price}
            onChange={handleChange}
            required
          />
          <span>{formErrors.unit_price}</span>
        </div>

        <div>
          <label htmlFor='brand'>Brand</label>
          <input
            type='text'
            name='brand'
            value={productData.brand}
            onChange={handleChange}
            required
          />
          <span>{formErrors.brand}</span>
        </div>

        <div>
          <label htmlFor='classification'>Classification</label>
          <input
            type='text'
            name='classification'
            value={productData.classification}
            onChange={handleChange}
            required
          />
          <span>{formErrors.classification}</span>
        </div>

        <div>
          <label htmlFor='product_category_id'>Product Category ID</label>
          <select
            name='product_category_id'
            onChange={handleChange}
            value={productData.product_category_id}
            required
          >
            <option value='' disabled>
              Select Product Category ID
            </option>
            {productCategories.map((category) => (
              <option
                key={category.product_category_id}
                value={category.product_category_id}
              >
                {category.product_category_id}
              </option>
            ))}
          </select>
          <span>{formErrors.product_category_id}</span>
        </div>

        <span>
          <input type='submit' value='Confirm' />
          <input type='submit' value='Close' onClick={onClose} />
        </span>
      </form>
    </div>
  );
};

AddProducts.propTypes = {
  onClose: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired,
};

// * EDIT PRODUCTS MODAL
const EditProducts = ({ onClose, productData, onSave }) => {
  const [editedData, setEditedData] = useState(productData);
  const [productCategories, setProductCategories] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setEditedData(productData);

    const fetchProductCategories = async () => {
      try {
        const response = await fetch('/api/admin/product_category');
        const data = await response.json();
        setProductCategories(data);
      } catch (error) {
        console.error('Error fetching product categories:', error);
      }
    };

    fetchProductCategories();
  }, [productData]);

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
      if (value === null || value === '') {
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
    <div className='Products__Modal__Edit Modal'>
      <h1>Edit Products</h1>

      <form className='Products__Edit'>
        <div>
          <label htmlFor='product_id'>ID</label>
          <input
            type='text'
            name='product_id'
            value={editedData.product_id}
            onChange={handleChange}
            disabled
          />
          <span>{formErrors.product_id}</span>
        </div>

        <div>
          <label htmlFor='product_id'>ID</label>
          <input
            type='text'
            name='product_id'
            value={editedData.product_id}
            onChange={handleChange}
            required
          />
          <span>{formErrors.product_id}</span>
        </div>

        <div>
          <label htmlFor='barcode_id'>Barcode ID</label>
          <input
            type='text'
            name='barcode_id'
            value={editedData.barcode_id}
            onChange={handleChange}
            required
          />
          <span>{formErrors.barcode_id}</span>
        </div>

        <div>
          <label htmlFor='barcode_type'>Barcode Type</label>
          <input
            type='text'
            name='barcode_type'
            value={editedData.barcode_type}
            onChange={handleChange}
            required
          />
          <span>{formErrors.barcode_type}</span>
        </div>

        <div>
          <label htmlFor='product_name'>Product Name</label>
          <input
            type='text'
            name='product_name'
            value={editedData.product_name}
            onChange={handleChange}
            required
          />
          <span>{formErrors.product_name}</span>
        </div>

        <div>
          <label htmlFor='unit_price'>Unit Price</label>
          <input
            type='text'
            name='unit_price'
            value={editedData.unit_price}
            onChange={handleChange}
            required
          />
          <span>{formErrors.unit_price}</span>
        </div>

        <div>
          <label htmlFor='brand'>Brand</label>
          <input
            type='text'
            name='brand'
            value={editedData.brand}
            onChange={handleChange}
            required
          />
          <span>{formErrors.brand}</span>
        </div>

        <div>
          <label htmlFor='classification'>Classification</label>
          <input
            type='text'
            name='classification'
            value={editedData.classification}
            onChange={handleChange}
            required
          />
          <span>{formErrors.classification}</span>
        </div>

        <div>
          <label htmlFor='product_category_id'>Product Category ID</label>
          <select
            name='product_category_id'
            onChange={handleChange}
            value={editedData.product_category_id}
            required
          >
            <option value='' disabled>
              Select Product Category ID
            </option>
            {productCategories.map((category) => (
              <option
                key={category.product_category_id}
                value={category.product_category_id}
              >
                {category.product_category_id}
              </option>
            ))}
          </select>
          <span>{formErrors.product_category_id}</span>
        </div>

        <span>
          <input type='submit' value='Confirm' onClick={handleConfirm} />
          <input type='submit' value='Close' onClick={onClose} />
        </span>
      </form>
    </div>
  );
};

EditProducts.propTypes = {
  onClose: PropTypes.func.isRequired,
  productData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

// * REMOVE PRODUCTS MODAL
const RemoveProducts = ({ onClose, onDelete, selectedProduct }) => {
  const handleConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <div className='Products__Modal__Remove Modal'>
      <p>
        Are you sure you want to delete this product with &quot;
        {selectedProduct}&quot; product id?
      </p>
      <span>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </span>
    </div>
  );
};

RemoveProducts.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedProduct: PropTypes.string,
};

// Products Component
const Products = () => {
  const [isAddProductsModalOpen, setAddProductsModalOpen] = useState(false);
  const [isEditProductsModalOpen, setEditProductsModalOpen] = useState(false);
  const [isRemoveProductsModalOpen, setRemoveProductsModalOpen] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsData, setProductsData] = useState([]);

  const toggleAddProductsModal = () => {
    setAddProductsModalOpen(!isAddProductsModalOpen);
  };

  const toggleEditProductsModal = (product) => {
    setSelectedProduct(product);
    setEditProductsModalOpen(!isEditProductsModalOpen);
  };

  const toggleRemoveProductsModal = (product) => {
    setSelectedProduct(product);
    setRemoveProductsModalOpen(!isRemoveProductsModalOpen);
  };

  const handleInsert = (insertData) => {
    const requiredFields = [
      'product_id',
      'barcode_id',
      'product_name',
      'unit_price',
      'brand',
      'classification',
      'product_category_id',
    ];

    const hasEmptyField = requiredFields.some((field) => !insertData[field]);

    if (hasEmptyField) {
      alert('Please fill in all required fields.');
    } else {
      fetch('/api/admin/products', {
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
          fetchProductsData();
        })
        .catch((error) =>
          console.error('Error during POST request:', error.message)
        );
    }
  };

  const handleEditSave = (editedData) => {
    console.log(`/api/admin/products/${editedData.product_id}`);
    fetch(`/api/admin/products/${editedData.product_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('PUT request successful:', data);
        fetchProductsData();
      })
      .catch((error) => console.error('Error during PUT request:', error));
  };

  const handleDelete = () => {
    fetch(`/api/admin/products/${selectedProduct.product_id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('DELETE request successful:', data);
        fetchProductsData();
      })
      .catch((error) => console.error('Error during DELETE request:', error));
  };

  const fetchProductsData = () => {
    fetch('/api/admin/products')
      .then((response) => response.json())
      .then((data) => {
        setProductsData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <div className='Products'>
      <div className='Products__Filter'>
        <p>All Products</p>
        <div className='Products__Filter__Add'>
          <button onClick={toggleAddProductsModal}>add product</button>
        </div>
      </div>

      <div className='Products__Table'>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Barcode ID</th>
              <th>Barcode Type</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Brand</th>
              <th>Classification</th>
              <th>Category ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.barcode_id}</td>
                <td>{product.barcode_type}</td>
                <td>{product.product_name}</td>
                <td>{product.unit_price}</td>
                <td>{product.brand}</td>
                <td>{product.classification}</td>
                <td>{product.product_category_id}</td>
                <td>
                  <button onClick={() => toggleEditProductsModal(product)}>
                    Edit
                  </button>
                  <button onClick={() => toggleRemoveProductsModal(product)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {isAddProductsModalOpen && (
        <AddProducts onClose={toggleAddProductsModal} onInsert={handleInsert} />
      )}
      {isEditProductsModalOpen && (
        <EditProducts
          onClose={() => setEditProductsModalOpen(false)}
          productData={selectedProduct}
          onSave={handleEditSave}
        />
      )}
      {isRemoveProductsModalOpen && (
        <RemoveProducts
          onClose={() => setRemoveProductsModalOpen(false)}
          onDelete={handleDelete}
          selectedProduct={selectedProduct.product_id}
        />
      )}
    </div>
  );
};

export default Products;
