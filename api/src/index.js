const thrift = require('thrift');
const converterSvcOpt = require('./converter');

const serverOpt = {
   services: {
      '/converter': converterSvcOpt
   }
}

const port = process.env.PORT || 9090;
thrift.createWebServer(serverOpt).listen(port);
console.log('Http/Thrift Server running on port: ' + port);
