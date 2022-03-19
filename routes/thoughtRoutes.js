const router = require('express').Router()
const { Thought, User, Reaction } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// **`/api/thoughts`**

// * `GET` to get all thoughts

// * `GET` to get a single thought by its `_id`

// * `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

// ```json
// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
// ```

// * `PUT` to update a thought by its `_id`

// * `DELETE` to remove a thought by its `_id`

router.get('/thoughts', async function (req, res) {
  let thought = await Thought.find({})
  res.json(thought)

}) 

router.get('/thoughts/:id', async function (req, res) {
  let thought = await Thought.findById(req.params.id)
  res.json(thought)
}) 

router.put('/thoughts/:id', async function (req, res) {
  let thought = await Thought.findByIdAndUpdate(req.params.id, { $set: req.body} )
  res.sendStatus(200)
}) 

router.delete('/thoughts/:id', async function (req, res) {
  let thought = await Thought.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
}) 

router.post('/thoughts', passport.authenticate('jwt'), async function (req, res) {
  let thought = await Thought.create(req.body)
  await User.findByIdAndUpdate(req.user._id, { $push: {thoughts: thought._id}})
  res.sendStatus(200)
})

// **`/api/thoughts/:thoughtId/reactions`**

// * `POST` to create a reaction stored in a single thought's `reactions` array field

// * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

router.post('/thoughts/:thoughtId/reactions', passport.authenticate('jwt'), async function (req, res) {
  let reaction = await Reaction.create(req.body)
  await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: {reactions: reaction._id}})
  res.sendStatus(200)
})

router.delete('/thoughts/:thoughtId/reactions/:reactionId', passport.authenticate('jwt'), async function (req, res) {
  await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: {reactions: req.params.reactionId}})
  res.sendStatus(200)
})


module.exports = router