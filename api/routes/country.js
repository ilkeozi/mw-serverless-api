const express = require('express');
const router = express.Router();

const countryController = require('../controllers/countrycontroller');

router.get('/',countryController.getCountries);

router.get('/:Alpha2',countryController.getCountry);


module.exports = router;

