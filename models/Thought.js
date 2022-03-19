const { Schema, model } = require('mongoose')

// **Thought**:

// * `thoughtText`
//   * String
//   * Required
//   * Must be between 1 and 280 characters

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

// * `username` (The user that created this thought)
//   * String
//   * Required

// * `reactions` (These are like replies)
//   * Array of nested documents created with the `reactionSchema`

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

const Thought = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxLength: 280,
    minLength: 1
  },
  username: {
    type: String,
    required: true
  },
  reactions: [{
    type: Schema.Types.ObjectId,
    ref: 'reaction'
  }]
}, {timestamps: true})

Thought.virtual('reactionCount').get(function () {
  return this.reactions.length
})

module.exports = model('thought', Thought)