# another-currency-converter
A client-server app using public API for converting values.

## Installation
```
npm i -g another-currency-converter
```

## Usage
```
another-currency-converter <value> <un1-un2>
```
For example:
```
another-currency-converter 10 usd-eur
```

## Contributing
* Install `docker` for your OS
* Build `thrift` definitions using `sh build-thrift.sh`
* Install dependencies for api: `npm i` inside `./api`
* Run api with custom port: `PORT=$PORT npm start`
* Install dependencies for client: `npm i` inside `/client`
* Run client for local api: `HOST=localhost PORT=$PORT npm run convert <value> <un1-un2>`
