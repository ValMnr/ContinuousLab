import express = require('express')
import { MetricsHandler } from './metrics'

const path = require('path')

const app = express()
const port: string = process.env.PORT || '3000'

app.set('views',path.join(__dirname,'../views') )
app.set('view engine', 'ejs');

console.log('deb2 |',app.get('views'))

app.get('/metrics.json', (req: any, res: any) => {
  MetricsHandler.get((err: Error | null, result?: any) => {
    if (err) {
      throw err
    } 
    res.json(result)
  })
})
 
app.get('/', (req: any, res: any) => {
  res.write('Hello world')
  res.end()
})


app.get('/hello/:name', (req: any,res: any)=> {
  res.status(200);    
  res.render('hello',{name:req.params.name});
  
});

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})