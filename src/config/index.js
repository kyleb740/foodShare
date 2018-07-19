// src/config/index.js

require('dotenv').config();

module.exports = {
  appName: 'FoodShare',
  port: 3033,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:     process.env.DB_HOST,
    dbName:   process.env.DB_NAME,
  },
  API_Key: {
    usda: process.env.API_Key,
    mailjetpub: process.env.MJ_APIKEY_PUBLIC,
    mailjetpriv: process.env.MJ_APIKEY_PRIVATE,
  }
};
