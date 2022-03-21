const express = require('express')
const router = express.Router()
//const { check, validationResult } = require('express-validator/check');


const {signup, signin, signout, requireSignin} = require('../controllers/auth')
const {userSignupValidator} = require('../validator')

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)
router.get("/hello", requireSignin)


module.exports = router