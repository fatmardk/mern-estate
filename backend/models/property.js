const connection = require('../config/db');

const createProperty = async (property) => {
  const [result] = await connection.execute(
    `INSERT INTO properties (title, description, address, city, price, bedrooms, bathrooms, image1, image2, image3, location_type, longitude, latitude, furnished, parking, security) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Point', ?, ?, ?, ?, ?)`,
    [
      property.title, property.description, property.address, property.city,
      property.price, property.bedrooms, property.bathrooms, property.image1,
      property.image2, property.image3, property.location.coordinates[0],
      property.location.coordinates[1], property.furnished, property.parking,
      property.security
    ]
  );
  return result.insertId;
};

const getPropertyById = async (id) => {
  const [rows] = await connection.execute('SELECT * FROM properties WHERE id = ?', [id]);
  return rows[0];
};

const updateProperty = async (id, updates) => {
  const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updates);
  values.push(id);

  const [result] = await connection.execute(
    `UPDATE properties SET ${fields} WHERE id = ?`,
    values
  );
  return result;
};

const deleteProperty = async (id) => {
  const [result] = await connection.execute('DELETE FROM properties WHERE id = ?', [id]);
  return result;
};

module.exports = { createProperty, getPropertyById, updateProperty, deleteProperty };
