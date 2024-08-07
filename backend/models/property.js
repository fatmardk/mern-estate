const connectDB = require('../config/db');
const connection = require('../config/db');

const createProperty = async (property) => {
  const connection = await connectDB();
  if (!property.location || !property.location.coordinates || property.location.coordinates.length !== 2) {
    throw new Error("Invalid location data");
  }

  try {
    const [result] = await connection.execute(
      `INSERT INTO properties (title, description, address, city, price, bedrooms, bathrooms, image1, image2, image3, location_type, longitude, latitude, furnished, parking, security, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Point', ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        property.title, property.description, property.address, property.city,
        property.price, property.bedrooms, property.bathrooms, property.image1,
        property.image2, property.image3, property.location.coordinates[0],
        property.location.coordinates[1], property.furnished, property.parking,
        property.security
      ]
    );
    console.log('Property inserted with ID:', result.insertId);
    return result.insertId;
  } catch (error) {
    console.error('Error inserting property:', error.message);
    throw new Error('Error saving property');
  }
};


const getPropertyById = async (id) => {
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM properties WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching property by ID:', error.message);
    throw new Error('Error fetching property by ID');
  }
};


const updateProperty = async (id, updates) => {
  const connection = await connectDB();
  try {
    // Construct the SET clause dynamically
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(updates), id]; // Append the id to the end of values array

    // Execute the update query
    const [result] = await connection.execute(
      `UPDATE properties SET ${fields} WHERE id = ?`,
      values
    );

    return result; // Return result to check the outcome in controller
  } catch (error) {
    throw new Error(`Error updating property: ${error.message}`);
  } finally {
    connection.end(); // Ensure connection is closed
  }
};



const deletePropertyFromModel = async (id) => {
  const connection = await connectDB();
  try {
    const [result] = await connection.execute('DELETE FROM properties WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.error('Error deleting property:', error.message);
    throw new Error('Error deleting property');
  }
};
const getAllProperties = async () => {
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM properties');
    return rows;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw new Error('Error fetching properties');
  }
};

module.exports = { createProperty, getPropertyById, updateProperty, deletePropertyFromModel, getAllProperties};
