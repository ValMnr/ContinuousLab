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





  
  public  createUser(req:any, callback: (error: Error | null, id: any | null) => void) {

    userModel.findOne({ email: req.body[0].email },(err,result)=>{
      if (err) throw 'Email already taken ' + req.body[0].email
      const newUser = new userModel({
        username: req.body[0].username,
        email: req.body[0].email,
        password: bcrypt.hashSync(req.body[0].password, 10)
      })
      newUser.save((err, user) => {
        if (err) callback(err,null)
        else {
        callback (null,user)
        
        }
      })
      
    })
    
  }

  
  public  authUser(req:any, callback: (error: Error | null, id: any ) => void) {

    console.log(req.body)

    const user =  userModel.findOne( {email: req.body[0].email },(err: Error|null,result?: any)=>{
      if (!result) {
        callback(null,null)
      }else{
        bcrypt.compare(req.body[0].password, result.password,(err,res)=>{
           if (err) callback(err,null)
           callback(null,result)
        })
      }   
      

 
    })
  

     
  }


  public async authUser2(body: any) {
    /**
        const user = await userModel.findOne({email: body.email });
        if (user && bcrypt.compareSync(body.password, user.password)) {
          const { hash, ...userWithoutHash } = user.toObject();
          const token = jwt.sign({ sub: user.id }, config.secret);
          return {
            ...userWithoutHash,
            token
          };
        }
     */
  }



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

