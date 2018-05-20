#!/usr/bin/env node

const thrift = require('thrift');
const converterSvc = require('./gen-nodejs/ConverterSvc.js');

const options = {
   transport: thrift.TBufferedTransport,
   protocol: thrift.TJSONProtocol,
   path: '/converter',
   headers: {'Connection': 'close'},
   https: false
};

const value = process.argv[2];
const units = process.argv[3];

if (!value || !parseInt(value) || !units || !units.match(/\w{3}-\w{3}/)) {
  return console.log('Usage example: `another-currency-converter 10 usd-eur`');
}

const host = process.env.HOST || 'another-currency-converter.herokuapp.com';
const port = process.env.PORT || 80;

const connection = thrift.createHttpConnection(host, port, options);
const client = thrift.createHttpClient(converterSvc, connection);

connection.on('error', function(err) {
   console.log('Error: ' + err);
});

client.convert_func(value, units, (error, result) => {
  if (error) {
    return console.log(error.message || error);
  }
   console.log(result);
});
