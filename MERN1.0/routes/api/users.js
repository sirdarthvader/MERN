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
        });
        bcrypt.genSalt(10, (err, salt)=> {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          }); 
        } )
      }
    })
});

//@route : /api/user/login
//@desc: confirm user exists
//@access: pucblic

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // check if user exists
  User.findOne({email})
    .then(user => {
      //check for user
      if(!user) {
        return res.status(404).json({msg: "email not found"});
      }
      //check password
      bcrypt.compare(password, user.password) 
        .then(isMatch => {
          if(isMatch) {
            res.json({msg: "Success"})
          } else {
            return res.status(404).json({password:'password incorrect'});
          }
        })
      
    })
})

module.exports = router;