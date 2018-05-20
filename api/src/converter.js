const thrift = require('thrift');
const converterSvc = require('./gen-nodejs/ConverterSvc');
const { BadFormat, NotFound, BadConnection } = require('./gen-nodejs/converter_types');
const axios = require('axios');

const url = 'http://free.currencyconverterapi.com/api/v5/convert';

const converterHandler = {
  convert_func: async function (value, unitsStr, result) {
    try {
      if (!value || !parseInt(value) || !unitsStr || !unitsStr.match(/\w{3}-\w{3}/)) {
        const bf = new BadFormat({ message: 'Usage example: `another-currency-converter 10 usd-eur`' });
        return result(bf);
      }
      const units = unitsStr.toUpperCase().split('-');
      const response = await axios.get(url, {
        params: {
          compact: 'y',
          q: units.join('_'),
        },
      });
      const data = response.data[units.join('_')];
      if (!data) {
        const nf = new NotFound({ message: `Rate for ${unitsStr} not found` });
        return result(nf);
      }
      const rate = data.val;
      const res = `${value} ${units[0]} = ${value*rate} ${units[1]} (1 ${units[0]} = ${rate} ${units[1]})`;
      result(null, res);
    } catch (err) {
        console.log(err.response || err);
        const bc = new BadConnection({ message: 'Bad connection' });
        result(bc);
    }
  }
};

module.exports = {
    handler: converterHandler,
    processor: converterSvc,
    protocol: thrift.TJSONProtocol,
    transport: thrift.TBufferedTransport
};
