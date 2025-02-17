const UserModel = require('../model/user.model')

module.exports.createUser = async({
    firstname,lastname,email,password
}) => {
    if(!firstname || !email || !password){
        throw new Error('Please fill all the fields')
    }
    const user = UserModel.create({
        fullName:{
            firstname,lastname
        },email,password
    })
    return user;
}