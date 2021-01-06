/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
/* eslint-disable no-const-assign */
/* eslint-disable eqeqeq */
const express = require('express')
const usersController = require('../controllers/usersController')
const router = express.Router()

router.post('/login', usersController.login)

router.post('/register', usersController.register)

router.post('/forgotPassword', usersController.forgotPassword)

module.exports = router
