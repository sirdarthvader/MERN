const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');


// Load user model...
const User = require('../../models/User');

//@route: /api/users/test
//@desc : used for testing users route
//@access: public
router.get('/test', (req, res) => {
  res.json({
    msg: "users works"
  });
});

//@route : /api/users/register
//@desc: used for registering users ion database
//@access: public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(400).json({email: "A user with this email already exists"});
      } else {
        const avatar = gravatar.url({
          s: 200, //size
          r: 'pg', //rating
          d: 'mm' //default
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: avatar,
          password: req.body.password
        })
      }
    })
});

module.exports = router;