const captainModel = require('../model/captain.model')

module.exports.CreateCaptain = async({
    firstname,lastname,email,password,color,plate,capacity,typevehicle
}) => {
    if(!firstname || !email || !password || !color || !plate || !capacity || !typevehicle){
        throw new Error('Please fill all the fields')
    }
    console.log(firstname);
    
    const captain = await captainModel.create({
        fullname:{
            firstname,lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            typevehicle
        }
    })
    console.log(captain);
    
    return captain;
}