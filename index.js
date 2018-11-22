const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

app.use(cors());

// Body Parser config...
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Port Setup....
const port = 5000;

// Route Setup...
const users = require('./routes/api/users');
const post = require('./routes/api/post');
const profile = require('./routes/api/profile');

//config DB..
const db = require('./config/keys.js').mongoURI;

//Connect to mongoDB...
mongoose
  .connect(db)
  .then(() => console.log('mongoDB connectedddd'))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//Route Setup...
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/post', post);

//Route Operations...
app.get('/', (req, res) => {
  res.send('Root route of server');
});


//Start Server....
app.listen(port, () => {
  `server started on ${port}`;
});
