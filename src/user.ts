import * as Mongoose from 'mongoose'
import bodyParser = require('body-parser');
import { randomBytes } from 'crypto';
const bcrypt = require('bcryptjs')

const userSchema = new Mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },

})

const userModel = Mongoose.model('user', userSchema)
export { userModel }


export class UserHandler {

  public createUser(req: any, callback: (error: Error | null, id: any | null) => void) {
    console.log(req.body)
    userModel.findOne({ email: req.body.email }, (err, result) => {
      if (err) throw 'Email already taken ' + req.body.email
      const newUser = new userModel({
        username: req.body.username,
        email: req.body.email.toLowerCase(),
        password: bcrypt.hashSync(req.body.password, 10)
      })
      newUser.save((err, user) => {
        if (err) callback(err, null)
        else {
          callback(null, user)
        }
      })
	})
}
 

  public authUser(req: any , callback: (error: Error | null, id: any) => void) {
	console.log(req.body)
    const user = userModel.findOne({ email: req.body.email   }, (err: Error | null, result?: any) => {
      console.log('in authUSER |err= ',err,'res =',result)
      if (result==null) {
        console.log("couldn't find email")
        callback(new Error("email doesn't exist in database"),null)
      } else {
        console.log("email in db, checking PW : ", req.body.password,"|", result.password)
        bcrypt.compare(req.body.password, result.password, (err, res) => {
          console.log('result doc =',result)
          if (err) callback(new Error("Password incorrect"), null)
          callback(null, result)
        })
      }
    })
  }
/*
  public authUser2(req: any) {
	console.log(req.body)
    const user = userModel.findOne({ email: req.body.email }, (err: Error | null, result?: any) => {
      if (!result) {
        callback(err,null)
      } else {
        bcrypt.compare(req.body.password, result.password, (err, res) => {
          if (err) callback(err, null)
          callback(null, res)
        })
      }
    })
  }

  */

  public save(body: any, callback: (error: Error | null, id: any | null) => void) {
    console.log("Saving data", body);
    var crt_user = new userModel({
      username: body.username,
      email: body.email,
      password: body.password
    })

    crt_user.save((err, user) => {
      if (err) callback(err, null)
      console.log("Success saving user ")
      callback(null, user._id)
    })

  }

}

