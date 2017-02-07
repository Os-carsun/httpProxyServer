'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const DEFAULT_SETTING = require('./defaultConfig');

const logFile = (data) => {
  let fileName = "";

  try {
    DEFAULT_SETTING.LogFileFormate.forEach((props)=> fileName += (`${data[`${props}`]}_`) );
    fileName += new Date().getTime();

  } catch (e) {
    console.error(e, "LogFileFormate Wrong");
    return;
  }
  fileName=fileName.replace(/\//g,"");
  fileName=fileName.replace(/\\/g,"");
  fileName=fileName.replace(/\:/g,"_");
  fileName=`${path.dirname(__filename)}\\${fileName}`;
  fs.open(fileName, 'a+', (e, fd) => {
    if (e) throw e;
    fs.writeFile(fileName, JSON.stringify(data, null, 4), 'utf8', (err)=> {
      if (err) throw err;
      console.log(`${fileName} saved!`);
    });
  })

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
  .on('data', (chunk)=> {chunkData.push(chunk);})
  .on('end', ()=> {
    result.content = Buffer.concat(chunkData).toString('utf-8');
    logFile(result);
    response.writeHead(200, DEFAULT_SETTING.responseHeader);
    response.write(JSON.stringify(result).replace(/\\r\\n/g,"<br/>"));
    response.end();
  });


}

http.createServer(serverConfig).listen(DEFAULT_SETTING.port);


console.log("server is run in localhost:8080");
