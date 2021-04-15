const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys');
const passport = require('passport');

//Load Input Validation...
const validateRegisterInput = require('../../Validator/register');
const validateLoginInput = require('../../Validator/login');

// Load user model...
const User = require('../../models/User');

//@route: /api/users/test
//@desc : used for testing users route
//@access: public
router.get('/test', (req, res) => {
  res.json({
    msg: 'don\'t waste time',
  });
});

router.get('/register', (req, res)  => {
  res.send('route testing');
})

// @route : POST /api/users/register
// @desc  : used for registering users in database
// @access: public
router.post('/register', (req, res) => {
  console.log('hiting the register route');
  //Validate Input...
  const { isValid, errors } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: {$eq: req.body.email} }).then(user => {
    if (user) {
      res.status(400).json({ email: 'A user with this email already exists' });
    } else {
      const avatar = `https://robohash.org/${req.body.email}`;
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route : /api/users/login
//@desc: confirm user exists
//@access: pucblic
router.post('/login', (req, res) => {
  // Validate Input...
  const { isValid, errors } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // check if user exists
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      errors.email = 'email not found';
      return res.status(404).json(errors);
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched.....
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // JWT Payload
        //Sign Token....
        jwt.sign(
          payload,
          key.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer  ' + token,
            });
          }
        );
      } else {
        errors.password = 'password is incorrect';
        return res.status(404).json(errors);
      }
    });
  });
});

//@route : /api/users/current
//@desc: used for returning current logged in user
//@access: private
router.get(
  '/current',
  passport.authenticate('jwt', { session: true }),
  (req, res) => {
    res.json(req.user);
  }
);

//@route: /api/users/current_session
//@desc: used for general testing

module.exports = router;
