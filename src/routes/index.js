const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.redirect('/admin/login')
})

router.get('/admin/login', (req, res) => {
  return res.render('login', { title: 'Express' })
})

router.get('/admin/registration', (req, res) => {
  return res.render('registration', { title: 'Express' })
})

router.get('/admin/forgotpassword', (req, res) => {
  return res.render('forgotPassword', { title: 'Express' })
})

router.get('/admin/dashboard', (req, res) => {
  return res.render('dashboard', { title: 'Express' })
})

module.exports = router
