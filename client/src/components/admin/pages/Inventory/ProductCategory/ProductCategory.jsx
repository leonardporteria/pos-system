import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './ProductCategory.scss';

// * ADD PRODUCT CATEGORY MODAL
const AddProductCategory = ({ onClose, onInsert }) => {
  const [productCategoryData, setProductCategoryData] = useState({
    product_category_id: '',
    product_category_name: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductCategoryData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    Object.entries(productCategoryData).forEach(([key, value]) => {
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
      onInsert(productCategoryData);
      onClose();
    }
  };

  return (
    <div className='ProductCategory__Modal__Add Modal'>
      <h1>Add Product Category</h1>

      <form className='ProductCategory__Add' onSubmit={handleConfirm}>
        <div>
          <label htmlFor='product_category_id'>id</label>
          <input
            type='text'
            name='product_category_id'
            onChange={handleChange}
            required
          />
          <span>{formErrors.product_category_id}</span>
        </div>

        <div>
          <label>name</label>
          <input
            type='text'
            name='product_category_name'
            onChange={handleChange}
            required
          />
          <span>{formErrors.product_category_name}</span>
        </div>

        <input type='submit' value='Close' onClick={onClose} />
        <input type='submit' value='Confirm' />
      </form>
    </div>
  );
};

AddProductCategory.propTypes = {
  onClose: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired,
};

// * EDIT PRODUCT CATEGORY MODAL
const EditProductCategory = ({ onClose, productCategoryData, onSave }) => {
  const [editedData, setEditedData] = useState(productCategoryData);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setEditedData(productCategoryData);
  }, [productCategoryData]);

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
    <div className='ProductCategory__Modal__Edit Modal'>
      <h1>Edit Product Category</h1>

      <form className='ProductCategory__Edit'>
        <div>
          <label htmlFor='product_category_id'>id</label>
          <input
            type='text'
            name='product_category_id'
            value={editedData.product_category_id}
            onChange={handleChange}
            disabled
          />
          <span>{formErrors.product_category_id}</span>
        </div>

        <div>
          <label htmlFor='product_category_name'>name</label>
          <input
            type='text'
            name='product_category_name'
            value={editedData.product_category_name}
            onChange={handleChange}
            required
          />
          <span>{formErrors.product_category_name}</span>
        </div>

        <input type='submit' value='Close' onClick={onClose} />
        <input type='submit' value='Confirm' onClick={handleConfirm} />
      </form>
    </div>
  );
};

EditProductCategory.propTypes = {
  onClose: PropTypes.func.isRequired,
  productCategoryData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

// * REMOVE PRODUCT CATEGORY MODAL
const RemoveProductCategory = ({
  onClose,
  onDelete,
  selectedProductCategory,
}) => {
  const handleConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <div className='ProductCategory__Modal__Remove Modal'>
      <p>
        Are you sure you want to delete this product category with &quot;
        {selectedProductCategory}&quot; product category id?
      </p>
      <button onClick={onClose}>Cancel</button>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

RemoveProductCategory.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedProductCategory: PropTypes.string,
};

// ProductCategory Component
const ProductCategory = () => {
  const [isAddProductCategoryModalOpen, setAddProductCategoryModalOpen] =
    useState(false);
  const [isEditProductCategoryModalOpen, setEditProductCategoryModalOpen] =
    useState(false);
  const [isRemoveProductCategoryModalOpen, setRemoveProductCategoryModalOpen] =
    useState(false);
  const [selectedProductCategory, setSelectedProductCategory] = useState(null);
  const [productCategoryData, setProductCategoryData] = useState([]);

  const toggleAddProductCategoryModal = () => {
    setAddProductCategoryModalOpen(!isAddProductCategoryModalOpen);
  };

  const toggleEditProductCategoryModal = (productCategory) => {
    setSelectedProductCategory(productCategory);
    setEditProductCategoryModalOpen(!isEditProductCategoryModalOpen);
  };

  const toggleRemoveProductCategoryModal = (productCategory) => {
    setSelectedProductCategory(productCategory);
    setRemoveProductCategoryModalOpen(!isRemoveProductCategoryModalOpen);
  };

  const handleInsert = (insertData) => {
    const requiredFields = ['product_category_id', 'product_category_name'];

    const hasEmptyField = requiredFields.some((field) => !insertData[field]);

    if (hasEmptyField) {
      alert('Please fill in all required fields.');
    } else {
      fetch('/api/admin/product_category', {
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
          fetchProductCategoriesData();
        })
        .catch((error) =>
          console.error('Error during POST request:', error.message)
        );
    }
  };

  const handleEditSave = (editedData) => {
    console.log(
      `/api/admin/product_category/${editedData.product_category_id}`
    );
    fetch(`/api/admin/product_category/${editedData.product_category_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('PUT request successful:', data);
        fetchProductCategoriesData();
      })
      .catch((error) => console.error('Error during PUT request:', error));
  };

  const handleDelete = () => {
    fetch(
      `/api/admin/product_category/${selectedProductCategory.product_category_id}`,
      {
        method: 'DELETE',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('DELETE request successful:', data);
        fetchProductCategoriesData();
      })
      .catch((error) => console.error('Error during DELETE request:', error));
  };

  const fetchProductCategoriesData = () => {
    fetch('/api/admin/product_category')
      .then((response) => response.json())
      .then((data) => {
        setProductCategoryData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchProductCategoriesData();
  }, []);

  return (
    <div className='ProductCategories'>
      <div className='ProductCategories__Filter'>
        <p>All Product Categories</p>
        <div className='ProductCategories__Filter__Add'>
          <button onClick={toggleAddProductCategoryModal}>
            add product category
          </button>
        </div>
      </div>

      <div className='ProductCategories__Table'>
        <table>
          <thead>
            <tr>
              <th>Product Category ID</th>
              <th>Product Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productCategoryData.map((productCategory) => (
              <tr key={productCategory.product_category_id}>
                <td>{productCategory.product_category_id}</td>
                <td>{productCategory.product_category_name}</td>
                <td>
                  <button
                    onClick={() =>
                      toggleEditProductCategoryModal(productCategory)
                    }
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      toggleRemoveProductCategoryModal(productCategory)
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
      {isAddProductCategoryModalOpen && (
        <AddProductCategory
          onClose={toggleAddProductCategoryModal}
          onInsert={handleInsert}
        />
      )}
      {isEditProductCategoryModalOpen && (
        <EditProductCategory
          onClose={() => setEditProductCategoryModalOpen(false)}
          productCategoryData={selectedProductCategory}
          onSave={handleEditSave}
        />
      )}
      {isRemoveProductCategoryModalOpen && (
        <RemoveProductCategory
          onClose={() => setRemoveProductCategoryModalOpen(false)}
          onDelete={handleDelete}
          selectedProductCategory={selectedProductCategory.product_category_id}
        />
      )}
    </div>
  );
};

export default ProductCategory;
