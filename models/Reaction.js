const { Schema, model } = require('mongoose')



const Reaction = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxLength: 200,
    minLength: 1
  },
  username: {
    type: String,
    required: true
  }
}, {timestamps: true})



module.exports = model('reaction', Reaction)