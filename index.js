'use strict';

const http = require('http');
const fs = require('fs');
const DEFAULT_SETTING = require('./defaultConfig');

const logFile = (data) => {
  let fileName = "";
  try {
    DEFAULT_SETTING.LogFileFormate.forEach((props)=> fileName += (`${data[`${props}`]} `) );
    fileName += new Date().getTime();
  } catch (e) {
    console.error(e, "LogFileFormate Wrong");
    return;
  }
  fs.writeFile(fileName, data.content, 'utf8', ()=> console.log(`log ${fileName} success`));
}

const serverConfig = (request, response)=> {

  const chunkData = [];
  let result = {
    header: request.headers,
    method: request.method,
    host: request.headers.host,
    url: request.url,
    content: [],
  }
  request
  .on('error', (err)=> console.log(err))
  .on('data', (chunk)=> chunkData.push(chunk))
  .on('end', ()=> (result.content = Buffer.concat(chunkData).toString('utf-8')));

  response.writeHead(200, DEFAULT_SETTING.responseHeader);
  response.write(JSON.stringify(result));
  logFile(result);
  response.end();
}

http.createServer(serverConfig).listen(DEFAULT_SETTING.port);


console.log("server is run in localhost:8080");
