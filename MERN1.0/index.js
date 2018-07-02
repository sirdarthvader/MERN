const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 5000;

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profiles = require('./routes/api/profiles');

//config DB..
const db = require('./config/keys.js').mongoURI;

//Connect to mongoDB...
mongoose
    .connect(db)
    .then(()=> console.log('mongoDB connected'))
    .catch(err => console.log(err));

//Route Setup...
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);


//Route Operations...
app.get('/', (req, res) => {
    res.send('hello world');
})


//Start Server....
app.listen(port, ()=> {
    `server started on ${port}`
});