const express = require('express')
const router = express.Router()

const {body} = require('express-validator')
const { registerUser, loginUser, getUserprofile, logoutUser } = require('../controllers/user.controller')
const { authUser } = require('../middleware/auth.middlewrae')
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 chrcter long'),
    body('password').isLength().withMessage("Password must be 6 chaarcter long.")
], registerUser )

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),body('password').isLength({min:6}).withMessage('must be 6 charcter long.')
],loginUser)

router.get('/profile',authUser,getUserprofile)

router.get('/logout',logoutUser)
module.exports = router