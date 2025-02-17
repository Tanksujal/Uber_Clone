const Usermodel = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blacklistModel = require('../model/blacklistToken.model')
module.exports.authUser = async(req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if(!token){
        return res.status(401). json({message:'Unauthorized'})
    }
    console.log(token);
    
    const isBlacklistted = await blacklistModel.findOne({token:token})
    console.log(isBlacklistted);
    
    if(isBlacklistted) {
        return res.status(401).json({message:'Unauthorized'})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await Usermodel.findById(decoded._id)
        req.user = user;
        return next()
    } catch (error) {
        return res.status(401).json({message:"Unauthorized",error})
    }
}