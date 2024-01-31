'use strict';
const AWS = require('aws-sdk');  //npm modul to install

module.exports.createUser = async (event) => {
  //get parsed HTTP requeste data from event.body and create JSON object
  const body = JSON.parse(Buffer.from(event.body, 'base64').toString());
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  
  // data validation
  if (!body.username || !body.email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'User end email are required' }),
    };
  }

  // User creation and data saving in the DynamoDB database with id field.
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    // create table fields
    Item: {
      id: Math.floor(Math.random() * 1000),
      username:body.username,
      email: body.email,
    },
  };
  await dynamoDb.put(putParams).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'User created successfully!' }),
  };
};