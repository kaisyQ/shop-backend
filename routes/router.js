const express = require('express')

const router = express.Router()

//import check-me handler 

const checkMeHandler = require('./checkMe-handler')

// import auth handlers

const { signinHandler, getMeHandler, logoutHandler } = require('./auth-handler')


// auth-routes


router.get('/me', checkMeHandler, getMeHandler)
router.post('/signin', signinHandler)
router.delete('/logout', logoutHandler)


// users-routes


router.get('/users')
router.post('/user')
router.put('/user')
router.delete('/user')

module.exports = router