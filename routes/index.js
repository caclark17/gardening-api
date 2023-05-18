const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/plants', require('./plants'))

module.exports = router;