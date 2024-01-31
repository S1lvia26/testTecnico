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
      /*  It seems that DynamoDB doesn't provide a native auto-incrementing ID system like traditional RDBMS.
          For this example a random ID is used, but of course it's not suitable for production.
          Consider implementing a proper ID generation mechanism, such as a separate counter table,
          or explore services like Amazon DynamoDB Auto-Increment for a more scalable solution.
      */
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