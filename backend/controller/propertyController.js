const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const PropertyModel = require("../models/Property");
const { validationResult } = require('express-validator');

class PropertyController {
  // Create a new property
  async create(req, res) {
    const form = new formidable.IncomingForm({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        return res.status(500).json({ errors: [{ msg: "Internal server error" }] });
      }

      const parsedData = JSON.parse(fields.data);
      const errors = [];

      // Validate fields
      if (parsedData.title.trim().length === 0) {
        errors.push({ msg: 'The title field cannot be left blank!' });
      }
      if (parseInt(parsedData.price) < 1) {
        errors.push({ msg: 'The price must be above $1' });
      }
      if (parseInt(parsedData.bedrooms) < 0) {
        errors.push({ msg: 'The number of bedrooms cannot be negative!' });
      }
      if (parseInt(parsedData.bathrooms) < 0) {
        errors.push({ msg: 'The number of bathrooms cannot be negative!' });
      }
      if (parsedData.address.trim().length === 0) {
        errors.push({ msg: 'The address field cannot be left blank!' });
      }
      if (parsedData.city.trim().length === 0) {
        errors.push({ msg: 'The city field cannot be left blank!' });
      }

      if (errors.length === 0) {
        if (!files['image1'] || !files['image2'] || !files['image3']) {
          errors.push({ msg: 'All images are required!' });
        }

        if (errors.length === 0) {
          const images = {};
          for (let i = 1; i <= 3; i++) {
            const mimeType = files[`image${i}`][0].mimetype;
            const extension = mimeType.split('/')[1].toLowerCase();
            if (['jpeg', 'jpg', 'png'].includes(extension)) {
              const imageName = uuidv4() + `.${extension}`;
              const __dirname = path.resolve();
              const newPath = __dirname + `/../client/public/images/${imageName}`;
              images[`image${i}`] = imageName;
              fs.copyFile(files[`image${i}`][0].filepath, newPath, (err) => {
                if (err) console.error(`Error copying ${imageName}:`, err);
              });
            } else {
              errors.push({ msg: `image${i} has invalid ${extension} type!` });
            }
          }
          if (errors.length === 0) {
            try {
              const response = await PropertyModel.create({
                title: parsedData.title,
                description: fields.description,
                address: parsedData.address,
                city: parsedData.city,
                price: parseInt(parsedData.price),
                bedrooms: parseInt(parsedData.bedrooms),
                bathrooms: parseInt(parsedData.bathrooms),
                image1: images['image1'],
                image2: images['image2'],
                image3: images['image3'],
                location: {
                  type: 'Point',
                  coordinates: parsedData.coordinates
                },
                furnished: parsedData.furnished === 'true',
                parking: parsedData.parking === 'true',
                security: parsedData.security === 'true'
              });
              return res.status(201).json({ msg: 'Property has been created', response });
            } catch (error) {
              console.error(error);
              return res.status(500).json({ errors: [{ msg: 'Failed to create property' }] });
            }
          } else {
            return res.status(400).json({ errors });
          }
        } else {
          return res.status(400).json({ errors });
        }
      } else {
        return res.status(400).json({ errors });
      }
    });
  }

  // Get properties with pagination
  async get(req, res) {
    const { page } = req.params;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    try {
      const count = await PropertyModel.countDocuments();
      const properties = await PropertyModel.find({})
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });
      return res.status(200).json({ properties, perPage, count });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errors: [{ msg: 'Failed to fetch properties' }] });
    }
  }

  // Fetch a single property by ID
  async fetch(req, res) {
    const { id } = req.params;
    try {
      const property = await PropertyModel.findById(id);
      if (!property) {
        return res.status(404).json({ errors: [{ msg: 'Property not found' }] });
      }
      return res.status(200).json(property);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errors: [{ msg: 'Failed to fetch property' }] });
    }
  }

  // Update a property
  async update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const {
      title, description, address, city, price, bedrooms, bathrooms, location,
      furnished, parking, security
    } = req.body;

    try {
      const updatedProperty = await PropertyModel.findByIdAndUpdate(id, {
        $set: {
          title, description, address, city, price, bedrooms, bathrooms,
          location, furnished, parking, security
        }
      }, { new: true });

      if (!updatedProperty) {
        return res.status(404).json({ errors: [{ msg: 'Property not found' }] });
      }

      return res.status(200).json({ msg: "Property has been updated", updatedProperty });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errors: [{ msg: 'Failed to update property' }] });
    }
  }

  // Delete a property
  async delete(req, res) {
    const { id } = req.params;
    try {
      const property = await PropertyModel.findByIdAndDelete(id);
      if (!property) {
        return res.status(404).json({ errors: [{ msg: 'Property not found' }] });
      }

      // Delete associated images
      const __dirname = path.resolve();
      ['image1', 'image2', 'image3'].forEach((image) => {
        if (property[image]) {
          const imagePath = __dirname + `/../client/public/images/${property[image]}`;
          fs.unlink(imagePath, (err) => {
            if (err) console.error(`Error deleting ${image}:`, err);
          });
        }
      });

      return res.status(200).json({ msg: 'Property has been deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errors: [{ msg: 'Failed to delete property' }] });
    }
  }
}

module.exports = new PropertyController();
