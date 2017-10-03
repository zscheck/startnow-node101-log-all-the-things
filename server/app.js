const express = require('express');
const fs = require('fs');
const app = express();
const date = new Date();

app.use((req, res, next) => {
// write your logging code here
    //res.send(''); //dont send something at the beginning of app.use
    fs.appendFile(__dirname + '/log.csv', req.get('user-agent') + ',' + date.toISOString() + ',' + req.method + ',' + req.path + ',' + 'HTTP/' + req.httpVersion + ',' + res.statusCode + '\n', (err) => {
        if (err) throw err;  
        console.log(req.get('user-agent') + ',' + date.toISOString() + ',' + req.method + ',' + req.path + ',' + 'HTTP/' + req.httpVersion + ',' + res.statusCode);
        next();
    })
//  console.log(req.get('user-agent'));// Agent
//  console.log(date.toISOString()); //Time
//  console.log(req.method); //Method
//  console.log(req.path); //Resource
//  console.log('HTTP/'+ req.httpVersion); //Version
//  console.log(res.statusCode); //Status
});

app.get('/', (req, res) => {
// write your code to respond "ok" here

res.send('ok');
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
var data = fs.readFileSync(__dirname + '/log.csv');
data = data.toString();
    
var lines=data.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);
     
  }
  res.send(result);
  //return result; //JavaScript object
 //return JSON.stringify(result); //JSON

});

module.exports = app;
