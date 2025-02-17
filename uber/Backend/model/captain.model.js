const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const captainSchema = new mongoose.Schema({
    fullname : {
        firstname:{
            type:String,
            required:true,
            minlength : [3,'First name should be at least 3 charcter long.'],
        },
        lastname:{
            type:String,
            minlength : [3,'last name should be at least 3 charcter long.'],
        },
    },
    email : {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,    
    },
    status:{
        type:String,
        enum :['active','inactive'],
        default:'active'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,"Color must be at least 3 charcter long"]
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,"plate must be at least 3 charcter long"]
        },
        capacity:{
            type:Number,
            required:true,
            minlength:[1,"capacity must be at least 1 charcter long"]
        },
        typevehicle:{
            type:String,
            required:true,
            enum :['car','motorcycle','auto']
        },
        location:{
            lat:{
                type:Number,
            },
            lng:{
                type:Number,
            }
        }
    }
})

captainSchema.methods.genrateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

captainSchema.methods.comparepassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}


const captainModel = mongoose.model('captain',captainSchema)

module.exports = captainModel