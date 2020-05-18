const express = require('express');
const User = require('../models/User');
const router = express.Router();

// @action - GET api/users
// @desc - Retrives all users
// @availability - Public
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => {
            throw err;
        });
});

// @action - POST api/users
// @desc - Adds a user
// @availability - Public
router.post('/', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        priority: req.body.password,
        email: req.body.email
    });

    newUser
        .save()
        .then(user => res.json(user))
        .catch(err => {
            throw err;
        });
});

// @action - DELETE api/users
// @desc - Deletes a user via ID tag
// @availability - Public
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(item => {
            return res.json({ success: true });
        })
        .catch(err => {
            throw err;
        });
});

module.exports = router;
