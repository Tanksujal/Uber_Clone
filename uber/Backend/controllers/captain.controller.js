const { validationResult } = require("express-validator");
const captainModel = require("../model/captain.model");
const captainService = require("../services/captain.service");
const blacklistTokenModel = require("../model/blacklistToken.model");

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;

  const existcaptain = await captainModel.findOne({ email: email });
  if (existcaptain) {
    return res.status(400).json({ message: "Email already exist" });
  }
  const hashedpassword = await captainModel.hashPassword(password);
  console.log(hashedpassword);

  const captain = await captainService.CreateCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedpassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    typevehicle: vehicle.typevehicle,
  });

  console.log(captain);

  const token = captain.genrateAuthToken();
  res.status(201).json({
    token,
    captain,
  });
};

module.exports.loginCaptain = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    const captain = await captainModel.findOne({email:email}).select("+password");
    if(!captain){
        return res.status(400).json({message:"Email not found"});
    }
    const isMatch = await captain.comparepassword(password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid password"});
    }
    const token = await captain.genrateAuthToken()
    res.cookie('token',token)
    res.status(200).json({token,captain})
}
module.exports.getcaptainprofile = async(req,res) => {
    res.status(200).json(req.user)
}

module.exports.logout = async(req,res) => {
    const token = req.cookies.token || req.headers.authorization
    console.log(token);
    
    await blacklistTokenModel.create({token})
    res.clearCookie('token')
    res.status(200).json({message:"logout succesfully"})
}