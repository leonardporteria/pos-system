import executeQuery from '../utils/executeQuery.js';

export async function selectData(tableName) {
  try {
    const selectQuery = `SELECT * FROM ${tableName}`;
    const [rows] = await executeQuery(selectQuery);
    return rows;
  } catch (error) {
    throw error;
  }
}

export async function insertData(tableName, data) {
  try {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data)
      .map(() => '?')
      .join(', ');

    const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
    const result = await executeQuery(insertQuery, Object.values(data));

    return result[0];
  } catch (error) {
    throw error;
  }
}

export async function updateData(
  tableName,
  data,
  identifierField,
  identifierValue
) {
  try {
    const setClause = Object.keys(data)
      .map((column) => `${column} = ?`)
      .join(', ');

    const updateQuery = `UPDATE ${tableName} SET ${setClause} WHERE ${identifierField} = ?`;
    const [result] = await executeQuery(updateQuery, [
      ...Object.values(data),
      identifierValue,
    ]);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteData(tableName, identifierField, identifierValue) {
  try {
    const deleteQuery = `DELETE FROM ${tableName} WHERE ${identifierField} = ?`;
    const [result] = await executeQuery(deleteQuery, [identifierValue]);

    return result;
  } catch (error) {
    throw error;
  }
}
