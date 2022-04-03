const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    time:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('chatLogs',logSchema);