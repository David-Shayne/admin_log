const express = require('express');
const app = express();
const keys = require('./config/keys');
const userAPI = require('./routes/userAPI');
const path = require('path');
const mongoose = require('mongoose');

app.use(express.json());

mongoose
    .connect(keys.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log('MongoDB connected'))
    .catch(err => {
        throw err;
    });

app.use('/api/users', userAPI);

app.use(express.static(path.resolve(__dirname, 'client', 'build')));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}...`));
