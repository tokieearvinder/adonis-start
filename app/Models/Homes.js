'use strict'

const mongoose = use('Mongoose')


let userSchema = mongoose.Schema({
  text: { type: String }
}, {
  timestamps: true
})

module.exports = mongoose.model('Home', userSchema)