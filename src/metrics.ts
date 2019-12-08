import { LevelDB, dbPath } from './leveldb'
import WriteStream from 'level-ws'
import leveldown from 'leveldown'
import levelup from 'levelup'

import { ReadStream } from 'fs';

import * as Mongoose from 'mongoose'


const metricSchema = new Mongoose.Schema({
  timestamp: {  type: String , required: true },
    value: { type: Number , required: true },
    userId:{ type: String , required: true }

})

const metricModel = Mongoose.model('metric',metricSchema)
export {metricModel}



export class Metric {
  public timestamp: string
  public value: number

  constructor(ts: string, v: number) {
    this.timestamp = ts
    this.value = v
  }
}




export class MetricsHandler {
  private db: any

  constructor(dbPath: string) {
    this.db = LevelDB.open(dbPath)
  }

  public closeDB(){
    this.db.close()
  }

  public save( body:any, callback: (error: Error | null,metric: any|null) => void) {
    console.log("Saving data", body);
    var crt_met = new metricModel({
      timestamp: body.timestamp,
      value: body.value,
      userId: 1
    })

    crt_met.save((err,metric)=>{
      if (err) callback(err,null)
      console.log("Success saving ")
      callback(null,metric)
    })

  }
/**
  public getUserId(id:string,callback:(err:Error|null,user_id:any)=>void) {
   
    metricModel.findById(id,(err,result)=>{
      if (err) callback(err,null);
      console.log("user_id :", result._id)
      var userid =result._id
      callback(null,result._id)
    })

  }) */

  public save2(metrics: any[], callback: (error: Error | null) => void) {
    
    
    console.log("Saving data", metrics);
    const stream = WriteStream(this.db)
      .on('error', callback)
      .on('close', callback)
    metrics.forEach((m: Metric) => {
      stream.write({ key: `metric:${m.timestamp}`, value: m.value })
    })
    stream.end()
  }


  //OKK
  public getAll(callback: (err: Error | null, result: any[]|null) => void) {
    
    metricModel.find((err,result)=>{
      if (err) callback(err,null);
      console.log("result is :", result)
      callback(null,result)
    })
  }
  
  //OKK
  public getOne(id:string,callback: (err: Error | null, result: any|null) => void) {
    
    metricModel.findById(id,(err,result)=>{
      if (err) callback(err,null);
      console.log("result is :", result)
      callback(null,result)
    })
  }



  public getAll2(callback: (error: Error | null, result?: Metric[]) => void) {
    var result = new Array();
    const rs = this.db.createReadStream()
      .on('data', function (data) {
        result.push(data)
      })
      .on('error', function (err) {
        console.log('Oh my!', err)
      })
      .on('close', function () {
        console.log('Stream closed')
      })
      .on('end', function () {
        console.log('Stream ended')
        callback(null, result);

      })
    }
  

  
  public delete(id: string, callback: (error: Error | null) => void) {
   
    this.db
      .del(id, (err: Error) => {
        if (err) { 
          console.log('Error finding')
          callback(err)
          return
         }
       console.log("Element deleted")
        callback(err)
      })
  }



  public get(id: string, callback: (error: Error | null, result?: Metric) => void) {
    var result = new Array()
    const rs = this.db
      .get(id, (err: Error, value: any) => {
        if (err) { 
          console.log('Error finding')
          callback(err)
          return
         }

        var crt_met = new Metric(id, value)
        

        console.log(crt_met)
        callback(null, crt_met)

      })
  }



}



