'use strict'

const config = {
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY
  },
  client: {
    endpoints: {
      pictures: 'http://api.instafap.com/picture',
      users: 'http://api.instafap.com/user',
      auth: 'http://api.instafap.com/auth'
    }
  },
  secret: process.env.INSTAFAP_SECRET || '1nst4fap'
}

if (process.env.NODE_ENV !== 'production') {
  config.client.endpoints = {
    pictures: 'http://localhost:5000',
    users: 'http://localhost:5001',
    auth: 'http://localhost:5002'
  }
}

module.exports = config;
