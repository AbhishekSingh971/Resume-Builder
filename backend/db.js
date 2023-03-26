const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.1tynyfo.mongodb.net/resume-builder";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connect to mongo successfully")
    })
}

module.exports = connectToMongo;