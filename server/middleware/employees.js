import dotenv from 'dotenv';
dotenv.config();

import executeQuery from '../utils/executeQuery.js';

// Middleware to select all employees
export async function selectEmployees(req, res, next) {
  try {
    const selectQuery = 'SELECT * FROM employees';
    const [rows] = await executeQuery(selectQuery);
    console.log('Data fetched successfully:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Middleware to insert a new employee
export async function insertEmployee(req, res, next) {
  try {
    const {
      employee_id,
      name,
      username,
      password,
      hourly_wage,
      work_schedule,
      role_id,
    } = req.body;
    const query = `
      INSERT INTO employees 
      (employee_id, name, username, password, hourly_wage, work_schedule, role_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const result = await executeQuery(query, [
      employee_id,
      name,
      username,
      password,
      hourly_wage,
      work_schedule,
      role_id,
    ]);

    console.log('Data inserted successfully:', result[0]);
    req.insertedData = result[0];

    res.json({
      message: 'NEW EMPLOYEE INSERTED',
      insertedData: req.insertedData,
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Middleware to update an employee by ID
export async function updateEmployee(req, res, next) {
  try {
    const { name, username, password, hourly_wage, work_schedule, role_id } =
      req.body;
    const { employee_id } = req.params;

    const updateQuery = `
      UPDATE employees 
      SET 
        name = ?,
        username = ?,
        password = ?,
        hourly_wage = ?,
        work_schedule = ?,
        role_id = ?
      WHERE employee_id = ?
    `;
    const [result] = await executeQuery(updateQuery, [
      name,
      username,
      password,
      hourly_wage,
      work_schedule,
      role_id,
      employee_id,
    ]);

    if (result.affectedRows > 0) {
      console.log('Data updated successfully:', result);
      res.json({ message: 'EMPLOYEE UPDATED', updatedData: req.body });
    } else {
      console.log('Employee not found for the given ID');
      res.status(404).json({ error: 'Employee not found for the given ID' });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Middleware to delete an employee by ID
export async function deleteEmployee(req, res, next) {
  try {
    const { employee_id } = req.params;

    const deleteQuery = 'DELETE FROM employees WHERE employee_id = ?';
    const [result] = await executeQuery(deleteQuery, [employee_id]);

    if (result.affectedRows > 0) {
      console.log('Data deleted successfully:', result);
      res.json({ message: 'EMPLOYEE DELETED', deletedId: employee_id });
    } else {
      console.log('Employee not found for the given ID');
      res.status(404).json({ error: 'Employee not found for the given ID' });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
