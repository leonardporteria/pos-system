import dotenv from 'dotenv';
dotenv.config();

import {
  selectData,
  insertData,
  updateData,
  deleteData,
} from '../utils/crudOperations.js';

const tableName = 'roles';

export async function selectRoles(req, res, next) {
  try {
    const roles = await selectData(tableName);
    res.json(roles);
  } catch (error) {
    next(error);
  }
}

export async function insertRole(req, res, next) {
  try {
    const result = await insertData(tableName, req.body);
    res.json({
      message: 'NEW ROLE INSERTED',
      insertedData: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateRole(req, res, next) {
  try {
    const result = await updateData(
      tableName,
      req.body,
      'role_id',
      req.params.role_id
    );

    if (result.affectedRows > 0) {
      res.json({ message: 'ROLE UPDATED', updatedData: req.body });
    } else {
      res.status(404).json({ error: 'Role not found for the given ID' });
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteRole(req, res, next) {
  try {
    const result = await deleteData(tableName, 'role_id', req.params.role_id);

    if (result.affectedRows > 0) {
      res.json({ message: 'ROLE DELETED', deletedId: req.params.role_id });
    } else {
      res.status(404).json({ error: 'Role not found for the given ID' });
    }
  } catch (error) {
    next(error);
  }
}
