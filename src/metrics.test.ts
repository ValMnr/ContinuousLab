import {expect} from 'chai'
import {Metric, MetricsHandler} from './metrics'
import {LevelDB} from './leveldb'
import path from 'path'


var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);

var dbMet: MetricsHandler

describe('Metric', function () {
    before(function () {
      console.log("Starting Metric test \n Logging to be able to CRUD metrics")
      
      chai.request("localhost:3000")
      .post('/login')
      .type('form')
      .send({
        'email': 'a@mail.fr',
        'password': '123'
       })


      dbMet = new MetricsHandler()
    })
    beforeEach(function () {
      // Ran before each tests of 'MyObject'
    })
    after(function () { 
        console.log("Metric test passed")
     }) // Same but after  
    afterEach(function () { 

     }) // Same but after each
  
    describe('#getAll', function() { // Sub suite of 'MyObject'
      it('should return all metrics of user', function () {

          var req : Request
          
          

         




        // A test
      })
    })
  })