var express = require('express')
const Mongoose = require("mongoose");

import { MetricsHandler, metricModel } from './metrics'
import { userModel, UserHandler } from './user'

import { userInfo } from 'os';
import { json } from 'body-parser';

const session = require('express-session')

var path = require('path')
var app = express()
const bodyParser = require("body-parser")
const port: string = process.env.PORT || '3000'

const dbMet: MetricsHandler = new MetricsHandler()
const dbUser: UserHandler = new UserHandler()

const errorHandler = require('./error-handlers');


app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded())

app.use(session({
  'secret': 'MySecretsession'
}))



app.use(errorHandler)

 
Mongoose.connect("mongodb://localhost:27017/nodelab", { useNewUrlParser: true });

const user_id = '1';

const isUserMetric = (req: any, res: any, next: any) => {

  //dbMet.getUserId

  //if (err) 


}

//A TEST

const authChek = (req: any, res: any, next: any) => {

  if (!req.session.logged) {
    console.log('not logged')
    res.json('You are not logged')
    res.redirect('/')
  }
  else
    console.log('logged')
  next()
}

const metricCheck = (req: any, res: any, next: any) => {
  console.log("checking params", req.body, req.body.timestamp, req.body.value)
  console.log(req.body.timestamp)
  if (req.body.timestamp && req.body.value) {
    console.log("Metric request OK")
    next()
    return
  }
  console.log("problem with body")
  return res.json("Problem with body")
}




app.get('/login', (req: any, res: any) => {
  console.log(req.session.userId)
  res.status(200);
  res.render('login', { name: req.params.name });

});


app.post('/login', (req: any, res: any) => {

  dbUser.authUser(req, (err: Error | null, result?: any) => {
    //console.log('err=',err,'||res=',res)
    if (err) {
      res.redirect('/signup')
    }else{
      req.session.userId = result._id
      req.session.logged = true
      console.log(req.session)
  
      res.redirect('/metricdisplay')
    }
  
  })
})



app.get('/signup', (req: any, res: any) => {
  res.status(200);
  res.render('signup')

});
app.post('/signup', (req: any, res: any) => {
  dbUser.createUser(req, (err: Error | null, result?: any) => {
    if (err) res.json(err)
    console.log(result)
    req.session.userId = result._id
    req.session.logged = true
    res.json({ 'Signup successful, crt_user_id': req.session.userId })
    res.redirect('/metricdisplay')
  })
})



app.get('/logout', authChek, (req: any, res: any) => {
  console.log('okkk')
  req.session.destroy
  res.redirect('/login')
  console.log('_id : ', req.session.userId, ' : ', req.session.logged)
})


app.get('/metrics', (req: any, res: any) => {
  dbMet.getAll(req, (err: Error | null, result?: any) => {
    if (err) {
      console.log("Problem finding all metrics")
      return err
    }
    res.json(result)
  })
})

app.get('/metricdisplay', (req: any, res: any) => {
  res.status(200);
  res.render('metrics')

});

app.post('/metrics', metricCheck, (req: any, res: any) => {

  console.log("Post request", req.body);
  dbMet.saveOne(req, (err: Error | null, metric: any | null) => {
    if (err) {
      console.log("Problem saving metric")
      res.json(err)
    }
    res.json("Data saved, metric_id:" + metric._id)
  })
})

app.post('/metrics/update/:id', metricCheck, (req: any, res: any) => {

})




app.route('/metrics/:id')

  .get((req: any, res: any) => {
    dbMet.getOne(req, req.params.id, (err: Error | null, result?: any) => {
      if (err) {
        console.log("Problem finding metric by id")
        res.json("Couldn't find metric")
        return
      }
      res.json(result)
    })
  })


  .delete((req: any, res: any) => {
    console.log("Del request", req.params.id);
    req.session.userId = "2"
    dbMet.deleteOne(req, req.params.id, (err: Error | null) => {
      if (err) {
        res.json(err)
        return
      }

      res.json("Element deleted")

    })
  })


app.get('/', (req: any, res: any) => {
  res.status(200);
  res.render('hello')
  res.end()
})


app.get('/hello/:name', (req: any, res: any) => {
  res.status(200);
  res.render('hello', { name: req.params.name });

});

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})

export default app