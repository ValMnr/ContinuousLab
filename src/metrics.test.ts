import {expect} from 'chai'
import {Metric, MetricsHandler} from './metrics'
import {LevelDB} from './leveldb'
import path from 'path'

const dbPath: string = './db/test'
var dbMet: MetricsHandler

describe('Metric', function () {
    before(function () {
      console.log("Opening database")
      LevelDB.clear(dbPath)
      dbMet = new MetricsHandler(dbPath)
    })
    beforeEach(function () {
      // Ran before each tests of 'MyObject'
    })
    after(function () { 
        dbMet.closeDB()
        console.log("Closing database")
     }) // Same but after  
    afterEach(function () { 

     }) // Same but after each
  
    describe('#myFunction', function() { // Sub suite of 'MyObject'
      it('should have an expected behaviour', function () {
        // A test
      })
    })
  })