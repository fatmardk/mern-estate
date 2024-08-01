const { createProperty, getPropertyById, updateProperty, deleteProperty } = require('../models/property');

const addProperty = async (req, res) => {
  const { title, description, address, city, price, bedrooms, bathrooms, image1, image2, image3, location, furnished, parking, security } = req.body;
  try {
    const propertyId = await createProperty({ title, description, address, city, price, bedrooms, bathrooms, image1, image2, image3, location, furnished, parking, security });
    res.status(201).json({ id: propertyId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await getPropertyById(id);
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editProperty = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const result = await updateProperty(id, updates);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Property updated successfully' });
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteProperty(id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Property deleted successfully' });
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProperty, getProperty, editProperty, deleteProperty };
