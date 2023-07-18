const mongoose = require('mongoose')

const userScheema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true, 
        unique:true
    },
    age:{
        type:Number,
        require:true,
    },
},{timestamps:true})


const User = mongoose.model("User",userScheema);
module.exports = User;