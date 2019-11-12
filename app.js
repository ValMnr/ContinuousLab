// Import a module
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const handles = require('./src/handle.js')



// Declare an http server
http.createServer(handles.serverHandle).listen(3000);
