const express = require('express')

const router = express.Router()

// import check-me handlers

const { checkMeHandler, checkAdminHandler } = require('./check-handlers')

// import auth handlers

const { signinHandler, getMeHandler, logoutHandler } = require('./auth-handler')

// import users handlers

const { getUsersHandler, getUserHandler, createUserHandler, updateUserHandler, deleteUserHandler } = require('./users-handler')

// import session handlers

const { deleteSessionByIdHandler, deleteAllUserSessionsHandler } = require('./session-handler')

// auth-routes


router.get('/me', checkMeHandler, getMeHandler)
router.post('/signin', signinHandler)
router.delete('/logout', logoutHandler)


// users-routes


router.get('/users', checkMeHandler, checkAdminHandler, getUsersHandler)
router.get('/users/:id', checkMeHandler, checkAdminHandler, getUserHandler)
router.post('/user', checkMeHandler,checkAdminHandler, createUserHandler)
router.put('/user', checkMeHandler, checkAdminHandler, updateUserHandler)
router.delete('/user',checkMeHandler, checkAdminHandler, deleteUserHandler)


// session-routes


router.delete('/session/:id', checkMeHandler, checkAdminHandler, deleteSessionByIdHandler)
router.delete('/sessions/:userId', checkMeHandler, checkAdminHandler, deleteAllUserSessionsHandler)
 
module.exports = router