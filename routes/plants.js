const express = require('express');
const router = express.Router();

const plantsController = require('../controllers/gardening');
const validation = require('../middleware/validate');

router.get('/', plantsController.getAll);

router.get('/:id', plantsController.getSingle);

router.post('/', validation.savePlant, plantsController.createPlant);

router.put('/:id', validation.savePlant, plantsController.updatePlant);

router.delete('/:id', plantsController.deletePlant);


module.exports = router;