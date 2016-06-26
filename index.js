'use strict';

const http = require('http');
const DEFAULT_SETTING = {
  port: 8080,
  responseHeader: {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  }
}

const serverConfig = (request, response)=> {

  const chunkData = [];
  let result = {
    header: request.headers,
    method: request.method,
    url: request.url,
    content: [],
  }
  request
  .on('error', (err)=> console.log(err))
  .on('data', (chunk)=> chunkData.push(chunk))
  .on('end', ()=> (result.content = Buffer.concat(chunkData).toString()));

  response.writeHead(200, DEFAULT_SETTING.responseHeader);
  response.write(JSON.stringify(result));
  response.end();
}

http.createServer(serverConfig).listen(DEFAULT_SETTING.port);


console.log("server is run in localhost:8080");
