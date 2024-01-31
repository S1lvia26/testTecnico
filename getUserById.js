'use strict';
const AWS = require('aws-sdk');

module.exports.getUserById = async (event) => {
  
  // Get userId from the path parameters of the HTTP request
  const userId = parseInt(event.pathParameters.userId);
  //retrieving data from the DynamoDB table
  const getParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Key: {
        id: userId,
    },
  };

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.get(getParams).promise();

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'User not found' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
        name: result.Item.username,
        email: result.Item.email,
      }),
  };
};