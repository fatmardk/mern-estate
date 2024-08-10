const {
  createProperty,
  getPropertyById,
  updateProperty,
  deletePropertyFromModel,
  getAllProperties,
} = require("../models/property");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const formidable = require("formidable");
const PropertyModel = require("../models/property");

const addProperty = async (req, res) => {
  const form = new formidable.IncomingForm({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ message: "Error parsing form" });
    }

    const {
      title = [],
      description = [],
      address = [],
      city = [],
      price = [],
      bedrooms = [],
      bathrooms = [],
      location = [],
      furnished = [],
      parking = [],
      security = [],
    } = fields;

    const errors = [];
    const locationData =
      location.length > 0 ? JSON.parse(location[0]) : undefined;

    if (
      !locationData ||
      !locationData.coordinates ||
      locationData.coordinates.length !== 2
    ) {
      errors.push("Invalid location data");
    }

    if (!title[0] || title[0].trim().length === 0)
      errors.push("Title is required");
    if (!description[0] || description[0].trim().length === 0)
      errors.push("Description is required");
    if (isNaN(price[0]) || parseFloat(price[0]) <= 0)
      errors.push("Price must be a positive number");

    const imageFiles = [];
    try {
      for (let i = 1; i <= 3; i++) {
        if (files[`image${i}`]) {
          const file = files[`image${i}`][0];
          const mimeType = file.mimetype.split("/")[1].toLowerCase();
          if (!["jpeg", "jpg", "png", "webp"].includes(mimeType)) {
            errors.push(`Invalid file type for image${i}`);
          } else {
            const imageName = uuidv4() + `.${mimeType}`;
            const __dirname = path.resolve();
            const newPath = __dirname + `/../client/public/house/${imageName}`;
            imageFiles.push(imageName);
            await fs.promises.copyFile(file.filepath, newPath);
          }
        } else {
          errors.push(`Image${i} is required`);
        }
      }
    } catch (err) {
      console.error("Error handling file uploads:", err);
      return res.status(500).json({ message: "Error handling file uploads" });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      const propertyId = await createProperty({
        title: title[0],
        description: description[0],
        address: address[0],
        city: city[0],
        price: parseFloat(price[0]),
        bedrooms: parseInt(bedrooms[0], 10),
        bathrooms: parseInt(bathrooms[0], 10),
        location: locationData,
        furnished: parseInt(furnished[0]) || 0,
        parking: parseInt(parking[0]) || 0,
        security: parseInt(security[0]) || 0,
        image1: imageFiles[0],
        image2: imageFiles[1],
        image3: imageFiles[2],
      });

      res.status(201).json({ id: propertyId });
    } catch (error) {
      console.error("Error saving property:", error);
      res.status(500).json({ message: "Error saving property" });
    }
  });
};

const fetchAllProperties = async (req, res) => {
  try {
    const properties = await getAllProperties();
    if (properties.length > 0) {
      res.status(200).json(properties);
    } else {
      res.status(404).json({ message: "No properties found" });
    }
  } catch (error) {
    console.error("Error fetching properties:", error);
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
      res.status(404).json({ message: "Property not found" });
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
      res.status(200).json({ message: "Property updated successfully" });
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deletePropertyFromModel(id);
    return res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addProperty,
  getProperty,
  editProperty,
  deleteProperty,
  fetchAllProperties,
};
