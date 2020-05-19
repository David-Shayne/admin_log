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
            res.status(500).json({
                ERROR: '500 - Server Error',
                success: false
            });
            throw err;
        });
});

// @action - POST api/users
// @desc - Adds a user
// @availability - Public
router.post('/', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        status: req.body.status,
        email: req.body.email
    });

    if (req.body.username) {
        return newUser
            .save()
            .then(user => res.json(user))
            .catch(err => {
                throw err;
            });
    } else {
        return res.status(400).json({
            ERROR: '400 - Bad Request'
        });
    }
});

// @action - DELETE api/users
// @desc - Deletes a user via ID tag
// @availability - Public
router.delete('/:_id', (req, res) => {
    if (req.params._id) {
        return User.findByIdAndDelete(req.params._id)
            .then(res.json({ success: true }))
            .catch(err => {
                throw err;
            });
    } else {
        return res
            .status(400)
            .json({ success: false, ERROR: '400 - Bad Request' });
    }
});

module.exports = router;
