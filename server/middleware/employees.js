import dotenv from 'dotenv';
dotenv.config();

import {
  selectData,
  insertData,
  updateData,
  deleteData,
} from '../utils/crudOperations.js';

const tableName = 'employees';

export async function selectEmployees(req, res, next) {
  try {
    const employees = await selectData(tableName);
    res.json(employees);
  } catch (error) {
    next(error);
  }
}

export async function insertEmployee(req, res, next) {
  try {
    const result = await insertData(tableName, req.body);
    res.json({
      message: 'NEW EMPLOYEE INSERTED',
      insertedData: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateEmployee(req, res, next) {
  try {
    const result = await updateData(
      tableName,
      req.body,
      'employee_id',
      req.params.employee_id
    );

    if (result.affectedRows > 0) {
      res.json({ message: 'EMPLOYEE UPDATED', updatedData: req.body });
    } else {
      res.status(404).json({ error: 'Employee not found for the given ID' });
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteEmployee(req, res, next) {
  try {
    const result = await deleteData(
      tableName,
      'employee_id',
      req.params.employee_id
    );

    if (result.affectedRows > 0) {
      res.json({
        message: 'EMPLOYEE DELETED',
        deletedId: req.params.employee_id,
      });
    } else {
      res.status(404).json({ error: 'Employee not found for the given ID' });
    }
  } catch (error) {
    next(error);
  }
}
