const Mongoose = require("mongoose");
import { metricModel } from './src/metrics'
import { userModel } from './src/user'

Mongoose.connect("mongodb://localhost:27017/nodelab", { useNewUrlParser: true });


function toTimestamp(newDate: Date) {
    var datum = new Date(Date.UTC(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDay(),
        newDate.getHours(),
        newDate.getMinutes(),
        newDate.getSeconds()
    ));
    return datum.getTime() / 1000;
}

function randTimeStamp() {
    var randomDate: Date = new Date(+(new Date()) - Math.floor(Math.random() * 400000000));
    var randTS: number = toTimestamp(randomDate)
    return randTS
}


async function populateUsers() {
    var listName: String[] = ["Eliz", "Cecelia", "Jean", "Paul", "Louise", "Marie", "JAck", "Jhon", "Camille", "Nico"]
    var userAmount = 26;

    console.log('Starting to populate mongoDB database')

    for (var i: number = 0; i < userAmount; i++) {
        var new_user = new userModel({
            username: listName[i % 10],                       //Random name from list above
            email: String.fromCharCode(i + 65) + "@mail.fr", //Set Emails to letter in alphabet : a@mail.fr
            password: '123'
        })
        await new_user.save((err, user) => {
            if (err) console.log(err)
        })
        await populateMetrics(new_user._id)
    }
    console.log('You can now login email looking like : [random letter]+mail.fr \nExemple : a@mail.fr, b@mail.fr -> z@mail.fr \nPassword for all accounts is : 123 \nEach users have 40 metrics each')
    return

}

async function populateMetrics(userId: string) {

    var metricAmount: number = 40        //Number of metrics by account
    var maxVal: number = 35              //Max value of metric, to have a nice display

    for (var i: number = 0; i < metricAmount; i++) {
        var new_metric = new metricModel({
            timestamp: randTimeStamp(),
            value: Math.floor(Math.random() * Math.floor(maxVal)),
            userId: userId
        })
        await new_metric.save((err, met) => {
            if (err) console.log(err)
        })
    }
    return
}
populateUsers()
