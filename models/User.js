const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        default: 'Not Applicable'
    },
    status: {
        type: String,
        required: false,
        default: 'active'
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
