const { Schema, model } = require('mongoose')

const User = new Schema({
 
}, { timestamps: true })

User.plugin(require('passport-local-mongoose'))

module.exports = model('user', User)
