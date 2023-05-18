const express = require('express');
const router = express.Router();

const plantsController = require('../controllers/gardening');

router.get('/', plantsController.getAll);

router.get('/:id', plantsController.getSingle);

module.exports = router;