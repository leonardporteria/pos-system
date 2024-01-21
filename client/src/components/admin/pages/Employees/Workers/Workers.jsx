import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Workers.scss';

// * ADD WORKERS MODAL
const AddWorkers = ({ onClose, onInsert }) => {
  const [workerData, setWorkerData] = useState({
    employee_id: '',
    name: '',
    username: '',
    password: '',
    hourly_wage: '',
    work_schedule: '',
    role_id: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = () => {
      fetch('/api/admin/roles')
        .then((response) => response.json())
        .then((data) => {
          setRoles(data);
        })
        .catch((error) => console.error('Error fetching data:', error));
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkerData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    Object.entries(workerData).forEach(([key, value]) => {
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
      onInsert(workerData);
      onClose();
    }
  };

  return (
    <div className='Workers__Modal__Add Modal'>
      <h1>Add Workers</h1>

      <form className='Workers__Add' onSubmit={handleConfirm}>
        <div>
          <label htmlFor='employee_id'>Employee ID</label>
          <input
            type='text'
            name='employee_id'
            onChange={handleChange}
            required
          />
          <span>{formErrors.employee_id}</span>
        </div>

        <div>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' onChange={handleChange} required />
          <span>{formErrors.name}</span>
        </div>

        <div>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' onChange={handleChange} required />
          <span>{formErrors.username}</span>
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            onChange={handleChange}
            required
          />
          <span>{formErrors.password}</span>
        </div>

        <div>
          <label htmlFor='hourly_wage'>Hourly Wage</label>
          <input
            type='text'
            name='hourly_wage'
            onChange={handleChange}
            required
          />
          <span>{formErrors.hourly_wage}</span>
        </div>

        <div>
          <label htmlFor='work_schedule'>Work Schedule</label>
          <input
            type='time'
            name='work_schedule'
            onChange={handleChange}
            required
          />
          <span>{formErrors.work_schedule}</span>
        </div>

        <div>
          <label htmlFor='role_id'>Role ID</label>
          <select
            name='role_id'
            onChange={handleChange}
            value={workerData.role_id}
            required
          >
            <option value='' disabled>
              Select Role ID
            </option>
            {roles.map((role) => (
              <option key={role.role_id} value={role.role_id}>
                {role.role_id}
              </option>
            ))}
          </select>
          <span>{formErrors.role_id}</span>
        </div>

        <span>
          <input type='submit' value='Confirm' />
          <input type='submit' value='Close' onClick={onClose} />
        </span>
      </form>
    </div>
  );
};

AddWorkers.propTypes = {
  onClose: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired,
};

// * EDIT WORKERS MODAL
const EditWorkers = ({ onClose, workerData, onSave }) => {
  const [editedData, setEditedData] = useState(workerData);
  const [roles, setRoles] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setEditedData(workerData);

    const fetchRoles = () => {
      fetch('/api/admin/roles')
        .then((response) => response.json())
        .then((data) => {
          setRoles(data);
        })
        .catch((error) => console.error('Error fetching data:', error));
    };

    fetchRoles();
  }, [workerData]);

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
    <div className='Workers__Modal__Edit Modal'>
      <h1>Edit Workers</h1>

      <form className='Workers__Edit'>
        <div>
          <label htmlFor='employee_id'>Employee ID</label>
          <input
            type='text'
            name='employee_id'
            value={editedData.employee_id}
            onChange={handleChange}
            disabled
          />
          <span>{formErrors.employee_id}</span>
        </div>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={editedData.name}
            onChange={handleChange}
            required
          />
          <span>{formErrors.name}</span>
        </div>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            value={editedData.username}
            onChange={handleChange}
            required
          />
          <span>{formErrors.username}</span>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={editedData.password}
            onChange={handleChange}
            required
          />
          <span>{formErrors.password}</span>
        </div>
        <div>
          <label htmlFor='hourly_wage'>Hourly Wage</label>
          <input
            type='text'
            name='hourly_wage'
            value={editedData.hourly_wage}
            onChange={handleChange}
            required
          />
          <span>{formErrors.hourly_wage}</span>
        </div>
        <div>
          <label htmlFor='work_schedule'>Work Schedule</label>
          <input
            type='time'
            name='work_schedule'
            value={editedData.work_schedule}
            onChange={handleChange}
            required
          />
          <span>{formErrors.work_schedule}</span>
        </div>

        <div>
          <label htmlFor='role_id'>Role ID</label>
          <select
            name='role_id'
            onChange={handleChange}
            value={editedData.role_id}
            required
          >
            <option value='' disabled>
              Select Role ID
            </option>
            {roles.map((role) => (
              <option key={role.role_id} value={role.role_id}>
                {role.role_id}
              </option>
            ))}
          </select>
          <span>{formErrors.role_id}</span>
        </div>

        <span>
          <input type='submit' value='Confirm' onClick={handleConfirm} />
          <input type='submit' value='Close' onClick={onClose} />
        </span>
      </form>
    </div>
  );
};

EditWorkers.propTypes = {
  onClose: PropTypes.func.isRequired,
  workerData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

// * REMOVE WORKERS MODAL
const RemoveWorkers = ({ onClose, onDelete, selectedWorker }) => {
  const handleConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <div className='Workers__Modal__Remove Modal'>
      <p>
        Are you sure you want to delete this worker with &quot;{selectedWorker}
        &quot; employee ID?
      </p>
      <span>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </span>
    </div>
  );
};

RemoveWorkers.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedWorker: PropTypes.string,
};

// Workers Component
const Workers = () => {
  const [isAddWorkersModalOpen, setAddWorkersModalOpen] = useState(false);
  const [isEditWorkersModalOpen, setEditWorkersModalOpen] = useState(false);
  const [isRemoveWorkersModalOpen, setRemoveWorkersModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [workersData, setWorkersData] = useState([]);

  const toggleAddWorkersModal = () => {
    setAddWorkersModalOpen(!isAddWorkersModalOpen);
  };

  const toggleEditWorkersModal = (worker) => {
    setSelectedWorker(worker);
    setEditWorkersModalOpen(!isEditWorkersModalOpen);
  };

  const toggleRemoveWorkersModal = (worker) => {
    setSelectedWorker(worker);
    setRemoveWorkersModalOpen(!isRemoveWorkersModalOpen);
  };

  const handleInsert = (insertData) => {
    const requiredFields = [
      'employee_id',
      'name',
      'username',
      'password',
      'hourly_wage',
      'work_schedule',
      'role_id',
    ];

    const hasEmptyField = requiredFields.some((field) => !insertData[field]);

    if (hasEmptyField) {
      alert('Please fill in all required fields.');
    } else {
      fetch('/api/admin/employees', {
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
          fetchWorkersData();
        })
        .catch((error) =>
          console.error('Error during POST request:', error.message)
        );
    }
  };

  const handleEditSave = (editedData) => {
    fetch(`/api/admin/employees/${editedData.employee_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('PUT request successful:', data);
        fetchWorkersData();
      })
      .catch((error) => console.error('Error during PUT request:', error));
  };

  const handleDelete = () => {
    fetch(`/api/admin/employees/${selectedWorker.employee_id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('DELETE request successful:', data);
        fetchWorkersData();
      })
      .catch((error) => console.error('Error during DELETE request:', error));
  };

  const fetchWorkersData = () => {
    fetch('/api/admin/employees')
      .then((response) => response.json())
      .then((data) => {
        setWorkersData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchWorkersData();
  }, []);

  return (
    <div className='Workers'>
      <div className='Workers__Filter'>
        <p>All Workers</p>
        <div className='Workers__Filter__Add'>
          <button onClick={toggleAddWorkersModal}>add worker</button>
        </div>
      </div>
      <div className='Workers__Table'>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Hourly Wage</th>
              <th>Work Schedule</th>
              <th>Role ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {workersData.map((worker) => (
              <tr key={worker.employee_id}>
                <td>{worker.employee_id}</td>
                <td>{worker.name}</td>
                <td>{worker.username}</td>
                <td>{worker.password}</td>
                <td>{worker.hourly_wage}</td>
                <td>{worker.work_schedule}</td>
                <td>{worker.role_id}</td>
                <td>
                  <button onClick={() => toggleEditWorkersModal(worker)}>
                    Edit
                  </button>
                  <button onClick={() => toggleRemoveWorkersModal(worker)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* MODALS */}
      {isAddWorkersModalOpen && (
        <AddWorkers onClose={toggleAddWorkersModal} onInsert={handleInsert} />
      )}
      {isEditWorkersModalOpen && (
        <EditWorkers
          onClose={() => setEditWorkersModalOpen(false)}
          workerData={selectedWorker}
          onSave={handleEditSave}
        />
      )}
      {isRemoveWorkersModalOpen && (
        <RemoveWorkers
          onClose={() => setRemoveWorkersModalOpen(false)}
          onDelete={handleDelete}
          selectedWorker={selectedWorker.employee_id}
        />
      )}
    </div>
  );
};

export default Workers;
