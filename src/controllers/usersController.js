/* eslint-disable no-useless-catch */
/* eslint-disable eqeqeq */
const User = require('../models/usersModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/index')

exports.login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  if (email == '' && password == '') {
    res.status({ status: false, msg: 'Please enter email and pasword' })
  } else if (email == '') {
    res.status({ status: false, msg: 'Please enter email' })
  } else if (password == '') {
    res.status({ status: false, msg: 'Please enter email' })
  } else {
    try {
      const user = await User.findOne({ email }).lean()
      if (!user) {
        res.json({ status: false, msg: 'Invalid username and password' })
      } else {
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign({
            id: user._id,
            email: user.email,
            userType: user.userType,
            roleId: user.roleId
          },
          config.jwtSecret
          )
          res.json({ status: true, token: token, userType: user.userType, msg: 'Login successfully' })
        } else {
          res.json({ status: false, msg: 'Invalid username and password' })
        }
      }
    } catch (error) {
      throw error
    }
  }
}

exports.register = async (req, res) => {
  const name = req.body.name
  const conatacno = req.body.conatacno
  const userAddress = req.body.userAddress
  const email = req.body.email
  const password = req.body.password
  const userType = req.body.userType
  const roleId = req.body.roleId
  if (name === '' && conatacno === '' && userAddress === '' && email === '' && password === '') {
    res.json({ status: false, msg: 'All fields are required' })
  } else if (name === '') {
    res.json({ status: false, msg: 'Please enter a name' })
  } else if (conatacno === '') {
    res.json({ status: false, msg: 'Please enter a contact no' })
  } else if (userAddress === '') {
    res.json({ status: false, msg: 'Please enter a address' })
  } else if (email === '') {
    res.json({ status: false, msg: 'Please enter a email' })
  } else if (password === '') {
    res.json({ status: false, msg: 'Please enter a password' })
  } else {
    const bcryptPassword = await bcrypt.hash(password, 10)

    try {
      const response = await User.create({
        name: name,
        conatacno: conatacno,
        userAddress: userAddress,
        email: email,
        password: bcryptPassword,
        userType: userType,
        roleId: roleId
      })

      const token = jwt.sign({
        id: response._id,
        email: response.email,
        userType: response.userType,
        roleId: response.roleId
      },
      config.jwtSecret
      )
      res.json({ status: true, token: token, userType: response.userType, msg: 'Registration successfully' })
    } catch (error) {
      if (error.code === 11000) {
        return res.json({ status: 'false', msg: 'Username already exist' })
      }
      throw error
    }
  }
}

exports.forgotPassword = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (email == '' && password == '') {
    res.json({ status: false, msg: 'All fields are required' })
  } else if (email == '') {
    res.json({ status: false, msg: 'Please enter a email' })
  } else if (password == '') {
    res.json({ status: false, msg: 'Please enter a password' })
  } else {
    const user = await User.findOne({ email }).lean()
    // console.log(user)
    if (!user) {
      res.json({ status: false, msg: 'Invalid username' })
    } else {
      const id = user._id
      const bcryptPassword = await bcrypt.hash(password, 10)

      const myquery = { _id: id }
      const newvalues = { $set: { password: bcryptPassword } }

      try {
        const response = await User.updateOne(myquery, newvalues)
        if (!response) {
          res.json({ status: false, msg: 'Something Went worng' })
        } else {
          res.json({ status: true, msg: 'Password change successfully' })
        }
      } catch (error) {
        throw error
      }
    }
  }
}
