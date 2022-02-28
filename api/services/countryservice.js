const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();
const table = "mw-dynamodb-";

function findCountries(searchName, res) {
  var params = {
    TableName: table,
    KeyConditionExpression: "#PK = :PK and begins_with(#SK,:SK)",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#SK": "SK",
    },
    ExpressionAttributeValues: {
      ":PK": "resource#country",
      ":SK": "SearchName#" + searchName,
    },
    Limit: 20,
  };

  var result = docClient.query(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to read item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("GetItem succeeded:", JSON.stringify(data.Items, null, 2));
      res.send(data.Items);
    }
  });
  return result;
}

function fetchCountries(res) {
  var params = {
    TableName: table,
    KeyConditionExpression: "#PK = :PK and begins_with(#SK,:SK)",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#SK": "SK",
    },
    ExpressionAttributeValues: {
      ":PK": "resource#country",
      ":SK": "Alpha2#",
    },
    Limit: 20,
  };

  var result = docClient.query(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to read item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("GetItem succeeded:", JSON.stringify(data.Items, null, 2));
      res.send(data.Items);
    }
  });
  return result;
}

function fetchCountry(Alpha2, res) {
    var params = {
      TableName: table,
      Key: {
        PK: "resource#country",
        SK: "Alpha2#" + Alpha2,
      },
    };
  
    var result = docClient.get(params, function (err, data) {
      if (err) {
        console.error(
          "Unable to read item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log("GetItem succeeded:", JSON.stringify(data.Item, null, 2));
        res.send(data.Item);
      }
    });
    return result;
  }

module.exports = {
    findCountries,
    fetchCountries,
    fetchCountry
}
