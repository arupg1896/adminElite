const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  conatacno: {
    type: String,
    required: true
  },
  userAddress: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
},
{
  collection: 'user'
})

const User = module.exports = mongoose.model('user', userSchema)
module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit)
}
