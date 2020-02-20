'use strict'

const mongoose = use('Mongoose')


let userSchema = mongoose.Schema({
  fullName: { type: String, default: '' },
  email: { type: String, default: '' },
  mobile: { type: String, default: '' },
  password: { type: String, default: '' }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)