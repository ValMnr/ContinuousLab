const http = require('http');
const url = require('url');
const querystring = require('querystring');
const handles = require('./src/handle.js')
const path = require('path')
const ejs = require("ejs")
const metrics = require('./src/metrics.ts')
const mongoDB = require ('./src/mongodb.ts')
const server= require('./src/server.ts')

//var express = require('express');
//var app = express();

/**
 * 
 

app.get('/', function(req, res) {
    res.status(200);
    res.send('hello BBA'); 
  
});

app.get('/hello/:name', (req,res)=> {
    res.status(200);    
    res.type('text/html')
    res.render('hello.ejs',{name:req.params.name});
    
});

app.get('/metrics.json', (req,res)=>{
    metrics.get((err, data) => {
        if(err) throw err
        res.status(200).json(data)
      })
})

app.listen(
    app.get('port'),
    ()=> console.log(`Server now listening on port ${app.get('port')}`)
);  
*/