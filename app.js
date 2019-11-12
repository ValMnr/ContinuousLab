const express = require('express')
const app = express()
var users = require('./src/users.js')

app.get('/', (req, res)=> {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200);
    res.send('Use url /hello/yourname');
})
app.get('/hello/:name', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200);
    if(req.params.name === "valentinMonnier"){
        res.send('Hello, I`m Valentin Monnier');
    }else{
        res.send('Hello '+ req.params.name);
    }


})

app.listen(3000);