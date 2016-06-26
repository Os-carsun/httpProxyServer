'use strict';

module.exports = {
  port: 8080,
  responseHeader: {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  },
  LogFileFormate: ['host', 'url', 'method'],
}
