
const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,},
    Formsubmited:{type:Boolean,default:false},
    form:{type:Object},
    status:{type:Object},
    isBooked:{type:Boolean,default:false}
},{collection:'userData'})

const model = mongoose.model('UserData',User)

module.exports = model