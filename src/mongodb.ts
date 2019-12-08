const Mongoose = require("mongoose");


Mongoose.connect("mongodb://localhost/nodelab");
/*
 const userModel = Mongoose.model("user",{
    username: { type: String , coordinates: [], required: true },
    email: { type: String , coordinates: [], required: true },
    password: {type: String , coordinates: [], required: true }

})
/*
 const metricModel = Mongoose.model("metric",{
    timestamp: { type: String, required: true },
    value: {  type: Number , required: true },
    userId:{  type: String , required: true }
})
*/