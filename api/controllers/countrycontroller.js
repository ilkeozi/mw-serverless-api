const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();
const table = "mw-dynamodb-";
const countryService = require('../services/countryservice');

exports.getCountries = (req, res, next) => {
  var searchName = req.query.searchName;

  if (searchName == undefined) {
    return countryService.fetchCountries(res);
  } else {
    return countryService.findCountries(searchName, res);
  }
};

exports.getCountry = (req, res, next) => {
  const Alpha2 = req.params.Alpha2;
  
  return countryService.fetchCountry(Alpha2, res);
};

