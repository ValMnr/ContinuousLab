const http = require('http');
const url = require('url');
const qs = require('querystring');

module.exports = {

    serverHandle: (req, res) => {
        const route = url.parse(req.url)
        const path = url.parse(req.url).pathname;
        const params = qs.parse(route.query)

       
        if (path === '/' ) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('Welcome on home page, please navigate to /hello?name=yourname')
            res.end()
        }


        else if (path === '/hello' ) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            if ('name' in params ) {
                if(params['name']==="Valentin"){
                    res.write('Hello I`m valentin monnier ')
                }else{
                    res.write('Hello ' + params['name'])
                }
  
            } 
            else {
                res.write('Hello anonymous')
            }
            res.end()

        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('PAGE NOT FOUND')
            res.end()


        }
    }

}