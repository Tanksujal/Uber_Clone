const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    fullName:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must be at least 3 chatrcter long']
        },
        lastname:{
            type:String,
            minlength:[3,'First name must be at least 3 chatrcter long']
        },
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Email must be least 5 charcter long']
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    }
})

userSchema.methods.genrateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparepassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('user',userSchema)
module.exports = userModel