const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { addProperty, getProperty, editProperty, deleteProperty,getAllProperties } = require('../controller/propertyController');
router.post('/admin/new-property',addProperty);

router.get('/properties/:id', getProperty);
router.put('/properties/:id', editProperty);
router.delete('/properties/:id', deleteProperty);
router.get('/properties', getAllProperties);

module.exports = router;
