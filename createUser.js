'use strict';
const AWS = require('aws-sdk');  //npm modul to install

module.exports.createUser = async (event) => {
  const body = JSON.parse(Buffer.from(event.body, 'base64').toString());
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  
  // Validazione dei dati
  if (!body.username || !body.email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'User e email sono obbligatori' }),
    };
  }

  // Creazione dell'utente e salvataggio nel database DynamoDB
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
      id: Math.floor(Math.random() * 1000),
      username:body.username,
      email: body.email,
    },
  };
  await dynamoDb.put(putParams).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Utente creato con successo' }),
  };
};