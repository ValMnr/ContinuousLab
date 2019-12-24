import { LevelDB, dbPath } from './leveldb'
import WriteStream from 'level-ws'
import leveldown from 'leveldown'
import levelup from 'levelup'

import { ReadStream } from 'fs';

import * as Mongoose from 'mongoose'


const metricSchema = new Mongoose.Schema({
	timestamp: { type: String, required: true },
	value: { type: Number, required: true },
	userId: { type: String, required: true }

})

const metricModel = Mongoose.model('metric', metricSchema)
export { metricModel }



export class Metric {
	public timestamp: string
	public value: number

	constructor(ts: string, v: number) {
		this.timestamp = ts
		this.value = v
	}
}




export class MetricsHandler {

	constructor() {

	}


	public saveOne(req: any, callback: (error: Error | null, metric: any | null) => void) {
		console.log("Saving data", req.body);
		var crt_met = new metricModel({
			timestamp: req.body.timestamp,
			value: req.body.value,
			userId: req.session.userId
		})

		crt_met.save((err, metric) => {
			if (err) callback(err, null)
			console.log("Success saving ")
			callback(null, metric)
		})

	}

	//OKK
	public getAll(req, callback: (err: Error | null, result: any) => void) {
		metricModel.find({ userId: req.session.userId }, (err, result) => {
			if (err) callback(err, null);
			callback(null, result)
		})
	}

	//OKK
	public getOne(req, id: string, callback: (err: Error | null, result: any | null) => void) {
		metricModel.find({ userId: req.session.userId, _id: id }, (err, result) => {
			if (err) callback(err, null);
			console.log("result is :", result)
			callback(null, result)
		})
	}

	// Need to detect if element not deleted
	public deleteOne(req, id: string, callback: (err: Error | null, result: any | null) => void) {
		console.log('uid: ', req.session.userId, ": ", "id", id)
		metricModel.deleteOne({ userId: req.session.userId, _id: id }, (err) => {
			if (err) callback(err, null);
			console.log("Element deleted")
			callback(null, "metric deleted")
		})
	}

	public updateOne(req, id: string, callback: (err: Error | null, result: any | null) => void) {
		console.log('uid: ', req.session.userId, ": ", "id", id)
		metricModel.updateOne({ _id: id }, {
			timestamp: req.body.timestamp,
			value: req.body.value
		}, (err) => {
			if (err) callback(err, null);
			console.log("Element deleted")
			callback(null, "metric deleted")
		})
	}

}



