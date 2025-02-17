const Usermodel = require('../model/user.model')
const userService= require('../services/user.service')
const {validationResult} = require('express-validator')

const blacklisttokenmodel = require('../model/blacklistToken.model')
module.exports.registerUser = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }
    const {fullname,email,password} = req.body;
    const existUser = await Usermodel.findOne({email:email})
    if(existUser){
        return res.status(400).json({message:"Email already exist"})
    }
    const hashedpassword = await Usermodel.hashPassword(password);
    const user = await userService.createUser({
        firstname:fullname.firstname,lastname:fullname.lastname,email,password:hashedpassword
    });
    const token = user.genrateAuthToken()
    res.status(201).json({
        token,user
    })
}

module.exports.loginUser = async(req,res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }
    const {email,password} = req.body

    const user = await Usermodel.findOne({email:email}).select('+password');
    console.log(user);
    
    if(!user){
        return res.status(401).json('Invalid Email Or Password')
    }

    const ismatch = await user.comparepassword(password)

    if(!ismatch){
        return res.status(401).json('Invalid Email Or Password')
    }

    const token = await user.genrateAuthToken()
    res.cookie('token',token)
    res.status(200).json({token,user})
}
module.exports.getUserprofile = async(req,res) => {
    res.status(200).json(req.user)
}

module.exports.logoutUser = async(req,res) => {
    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization;
    await blacklisttokenmodel.create({token})
    res.status(200).json({message:"logged out"})
}