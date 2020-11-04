const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
  message: String,
  user: String
})

module.exports = mongoose.model('Messages', MessageSchema)
