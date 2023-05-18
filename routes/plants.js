const express = require('express');
const router = express.Router();

const plantsController = require('../controllers/gardening');

router.get('/', plantsController.getAll);

router.get('/:id', plantsController.getSingle);

router.post('/', plantsController.createPlant);

router.put('/:id', plantsController.updatePlant);

router.delete('/:id', plantsController.deletePlant);


module.exports = router;