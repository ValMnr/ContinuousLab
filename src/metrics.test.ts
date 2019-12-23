import {expect} from 'chai'
import {Metric, MetricsHandler} from './metrics'
import {LevelDB} from './leveldb'
import path from 'path'


var dbMet: MetricsHandler

describe('Metric', function () {
    before(function () {
      console.log("Opening database")
      dbMet = new MetricsHandler()
    })
    beforeEach(function () {
      // Ran before each tests of 'MyObject'
    })
    after(function () { 
        console.log("Closing database")
     }) // Same but after  
    afterEach(function () { 

     }) // Same but after each
  
    describe('#saveOne', function() { // Sub suite of 'MyObject'
      it('should have an expected behaviour', function () {


        // A test
      })
    })
  })