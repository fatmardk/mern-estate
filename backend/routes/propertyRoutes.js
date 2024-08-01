const express = require('express');
const router = express.Router();
const { addProperty, getProperty, editProperty, deleteProperty } = require('../controllers/property');

router.post('/properties', addProperty);
router.get('/properties/:id', getProperty);
router.put('/properties/:id', editProperty);
router.delete('/properties/:id', deleteProperty);

module.exports = router;
