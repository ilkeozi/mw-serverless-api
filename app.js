const serverless = require("serverless-http");
const express = require("express");



const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-central-1" });

const app = express();
const countryroutes = require('./api/routes/country');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/countries',countryroutes);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api/swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => console.log(`Listening on: 3000`));

module.exports.handler = serverless(app);
