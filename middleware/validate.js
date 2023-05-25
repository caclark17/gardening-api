const validator = require('../helpers/validate');

const savePlant = (req, res, next) => {
  const validationRule = {
    plantName: 'required|string',
    hoursOfSun: 'string',
    goodNeighbors: 'required|string',
    badNeighbors: 'required|string',
    startIndoors: 'string',
    transplantOutdoors: 'string',
    numPerSqFt: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  savePlant
};