const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/users/register', (req, res) => {
  const { email, username } = req.body
  User.register(new User({ email, username }), req.body.password, err => {
    if (err) { console.log(err)}
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  const { username } = req.body
  User.authenticate()(username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})

router.get('/users', passport.authenticate('jwt'), async function (req, res)  {
  const users = await User.find({})
  res.json(users)
})

router.get('/users/:id', passport.authenticate('jwt'), async function(req, res) {
  const user = await User.findById(req.params.id)
  res.json(user)
})

router.put('/users/:id', passport.authenticate('jwt'), async function(req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body})
  res.sendStatus(200)
})

router.delete('/users/:id', passport.authenticate('jwt'), async function(req, res) {
  const user = await User.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})


// **`/api/users/:userId/friends/:friendId`**

// * `POST` to add a new friend to a user's friend list

// * `DELETE` to remove a friend from a user's friend list

router.post('/users/:userId/friends/:friendId', passport.authenticate('jwt'), async function(req, res) {
  const friend = await User.findByIdAndUpdate(req.params.userId, { $addToSet: {friends: req.params.friendId}})

  res.sendStatus(200)
})

router.delete('/users/:userId/friends/:friendId', passport.authenticate('jwt'), async function(req, res) {
  const friend = await User.findByIdAndUpdate(req.params.userId, { $pull: {friends: req.params.friendId}})

  res.sendStatus(200)
})











router.get('/users/profile', passport.authenticate('jwt'), (req, res) => res.json(req.user))

module.exports = router
