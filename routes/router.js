const express = require('express')

const router = express.Router()

//import check-me handler 

const { checkMeHandler, checkAdminHandler } = require('./check-handlers')

// import auth handlers

const { signinHandler, getMeHandler, logoutHandler } = require('./auth-handler')

// import users handlers

const { getUsersHandler, createUserHandler, updateUserHandler, deleteUserHandler } = require('./users-handler')

// auth-routes


router.get('/me', checkMeHandler, getMeHandler)
router.post('/signin', signinHandler)
router.delete('/logout', logoutHandler)


// users-routes


router.get('/users', checkMeHandler, checkAdminHandler, getUsersHandler)
router.post('/user', checkMeHandler,checkAdminHandler, createUserHandler)
router.put('/user', checkMeHandler, checkAdminHandler, updateUserHandler)
router.delete('/user',checkMeHandler, checkAdminHandler, deleteUserHandler)

module.exports = router