import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Roles.scss';

// * ADD ROLES MODAL
const AddRoles = ({ onClose, onInsert }) => {
  const [roleData, setRoleData] = useState({
    role_id: '',
    role_name: '',
    description: '',
    permission: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    Object.entries(roleData).forEach(([key, value]) => {
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
      onInsert(roleData);
      onClose();
    }
  };

  return (
    <div className='Roles__Modal__Add Modal'>
      <h1>Add Roles</h1>

      <form className='Roles__Add' onSubmit={handleConfirm}>
        <div>
          <label htmlFor='role_id'>id</label>
          <input type='text' name='role_id' onChange={handleChange} required />
          <span>{formErrors.role_id}</span>
        </div>

        <div>
          <label>name</label>
          <input
            type='text'
            name='role_name'
            onChange={handleChange}
            required
          />
          <span>{formErrors.role_name}</span>
        </div>

        <div>
          <label>description</label>
          <input
            type='text'
            name='description'
            onChange={handleChange}
            required
          />
          <span>{formErrors.description}</span>
        </div>

        <div>
          <label>permission</label>
          <input
            type='text'
            name='permission'
            onChange={handleChange}
            required
          />
          <span>{formErrors.permission}</span>
        </div>

        <span>
          <input type='submit' value='Confirm' />
          <input type='submit' value='Close' onClick={onClose} />
        </span>
      </form>
    </div>
  );
};

AddRoles.propTypes = {
  onClose: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired,
};

// * EDIT ROLES MODAL
const EditRoles = ({ onClose, roleData, onSave }) => {
  const [editedData, setEditedData] = useState(roleData);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setEditedData(roleData);
  }, [roleData]);

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
    <div className='Roles__Modal__Edit Modal'>
      <h1>Edit Roles</h1>

      <form className='Roles__Edit'>
        <div>
          <label htmlFor='role_id'>id</label>
          <input
            type='text'
            name='role_id'
            value={editedData.role_id}
            onChange={handleChange}
            disabled
          />
          <span>{formErrors.role_id}</span>
        </div>

        <div>
          <label htmlFor='role_name'>name</label>
          <input
            type='text'
            name='role_name'
            value={editedData.role_name}
            onChange={handleChange}
            required
          />
          <span>{formErrors.role_name}</span>
        </div>

        <div>
          <label htmlFor='description'>description</label>
          <input
            type='text'
            name='description'
            value={editedData.description}
            onChange={handleChange}
            required
          />
          <span>{formErrors.description}</span>
        </div>

        <div>
          <label htmlFor='permission'>permission</label>
          <input
            type='text'
            name='permission'
            value={editedData.permission}
            onChange={handleChange}
            required
          />
          <span>{formErrors.permission}</span>
        </div>

        <span>
          <input type='submit' value='Confirm' onClick={handleConfirm} />
          <input type='submit' value='Close' onClick={onClose} />
        </span>
      </form>
    </div>
  );
};

EditRoles.propTypes = {
  onClose: PropTypes.func.isRequired,
  roleData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

// * REMOVE ROLES MODAL
const RemoveRoles = ({ onClose, onDelete, selectedRole }) => {
  const handleConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <div className='Roles__Modal__Remove Modal'>
      <p>
        Are you sure you want to delete this role with &quot;
        {selectedRole}&quot; role id?
      </p>
      <span>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </span>
    </div>
  );
};

RemoveRoles.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedRole: PropTypes.string,
};

// Roles Component
const Roles = () => {
  const [isAddRolesModalOpen, setAddRolesModalOpen] = useState(false);
  const [isEditRolesModalOpen, setEditRolesModalOpen] = useState(false);
  const [isRemoveRolesModalOpen, setRemoveRolesModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [rolesData, setRolesData] = useState([]);

  const toggleAddRolesModal = () => {
    setAddRolesModalOpen(!isAddRolesModalOpen);
  };

  const toggleEditRolesModal = (role) => {
    setSelectedRole(role);
    setEditRolesModalOpen(!isEditRolesModalOpen);
  };

  const toggleRemoveRolesModal = (role) => {
    setSelectedRole(role);
    setRemoveRolesModalOpen(!isRemoveRolesModalOpen);
  };

  const handleInsert = (insertData) => {
    const requiredFields = [
      'role_id',
      'role_name',
      'description',
      'permission',
    ];

    const hasEmptyField = requiredFields.some((field) => !insertData[field]);

    if (hasEmptyField) {
      alert('Please fill in all required fields.');
    } else {
      fetch('/api/admin/roles', {
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
          fetchRolesData();
        })
        .catch((error) =>
          console.error('Error during POST request:', error.message)
        );
    }
  };

  const handleEditSave = (editedData) => {
    fetch(`/api/admin/roles/${editedData.role_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('PUT request successful:', data);
        fetchRolesData();
      })
      .catch((error) => console.error('Error during PUT request:', error));
  };

  const handleDelete = () => {
    fetch(`/api/admin/roles/${selectedRole.role_id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('DELETE request successful:', data);
        fetchRolesData();
      })
      .catch((error) => console.error('Error during DELETE request:', error));
  };

  const fetchRolesData = () => {
    fetch('/api/admin/roles')
      .then((response) => response.json())
      .then((data) => {
        setRolesData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchRolesData();
  }, []);

  return (
    <div className='Roles'>
      <div className='Roles__Filter'>
        <p>All Roles</p>
        <div className='Roles__Filter__Add'>
          <button onClick={toggleAddRolesModal}>add role</button>
        </div>
      </div>

      <div className='Roles__Table'>
        <table>
          <thead>
            <tr>
              <th>Role ID</th>
              <th>Role Name</th>
              <th>Description</th>
              <th>Permission</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rolesData.map((role) => (
              <tr key={role.role_id}>
                <td>{role.role_id}</td>
                <td>{role.role_name}</td>
                <td>{role.description}</td>
                <td>{role.permission}</td>
                <td>
                  <button onClick={() => toggleEditRolesModal(role)}>
                    Edit
                  </button>
                  <button onClick={() => toggleRemoveRolesModal(role)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {isAddRolesModalOpen && (
        <AddRoles onClose={toggleAddRolesModal} onInsert={handleInsert} />
      )}
      {isEditRolesModalOpen && (
        <EditRoles
          onClose={() => setEditRolesModalOpen(false)}
          roleData={selectedRole}
          onSave={handleEditSave}
        />
      )}
      {isRemoveRolesModalOpen && (
        <RemoveRoles
          onClose={() => setRemoveRolesModalOpen(false)}
          onDelete={handleDelete}
          selectedRole={selectedRole.role_id}
        />
      )}
    </div>
  );
};

export default Roles;
