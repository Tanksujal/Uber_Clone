const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const { registerCaptain, loginCaptain, getcaptainprofile, logout } = require('../controllers/captain.controller')
const { authcaptain } = require('../middleware/auth.middlewrae')
router.post('/register',
    [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 chrcter long'),
    body('password').isLength({min:3}).withMessage("Password must be 6 chaarcter long."),
    body('vehicle.color').isLength({min:3}).withMessage("color must be 6 chaarcter long."),
    body('vehicle.plate').isLength({min:3}).withMessage("plate must be 6 chaarcter long."),body('vehicle.capacity').isLength({min:1}).withMessage("capacity must be 1 chaarcter long."),
]
,registerCaptain)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:3}).withMessage("Password must be 6 charcter long")
],loginCaptain)

router.get('/profile',authcaptain,getcaptainprofile)
router.get('/logout',logout)

module.exports = router