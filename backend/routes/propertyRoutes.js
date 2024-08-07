const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { addProperty, getProperty, editProperty, deleteProperty,fetchAllProperties } = require('../controller/propertyController');
router.post('/admin/new-property',addProperty);

router.get('/properties/:id', getProperty);
router.put('/admin/properties/edit/:id', editProperty);
router.delete('/admin/properties/delete/:id', deleteProperty);
router.get('/admin/properties', fetchAllProperties);

module.exports = router;
