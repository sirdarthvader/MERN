const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const passport = require('passport')
const key = require('../../config/keys');


// Load profile model
const Profile = require('../../models/Profile')
// Load user model
const User = require('../../models/User')

//Load input validation function
// const validateProfileInput = require('../../Validator/profile');


// @route : /api/profile/test
// @desc: used for testing the profile route
// @access: public
router.get('/test', (req, res) => {
  res.json({
    msg: 'profile works'
  }) 
})


// @route : /api/profile/
// @desc: get current user profile (GET)
// @access: private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const errors = {};

    Profile.findOne({ user: req.body.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no such profile';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
  }
)

// @route : /api/profile/
// @desc: create user profle (POST)
// @access: private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  
  //Check input validation
  // const {isValid, errors} = validateProfileInput(res.body);
  // if(!isValid) {
  //   // return any errors 
  //   return res.status(404).json(errors);
  // }

  const profileFields = {};
  //Get user data 
  profileFields.user = req.user.id;
  if(req.body.handle) profileFields.handle = req.body.handle;
  if(req.body.company) profileFields.company = req.body.company;
  if(req.body.location) profileFields.location = req.body.location;
  if(req.body.website) profileFields.website = req.body.website;
  if(req.body.bio) profileFields.bio = req.body.bio;
  if(req.body.status) profileFields.status = req.body.status;

  //SKILLS split into arary,
  if(typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }

  //SOCIAL LINKS, initiate object.. 
  profileFields.social ={};
  if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if(req.body.facebook) profileFields.social.faceboook = req.body.facebook;
  if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
  if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if(req.body.twitter) profileFields.social.twitter = req.body.twitter;

  Profile.findOne({user: req.user.id})
    .then(profile => {
      if(profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        .then(profile => res.json(profile));
      } else {
        //Create
        //Check if the handle exists 
        Profile.findOne({handle: profileFields.handle})
        .then(profile => {
          if(profile) {
            errors.handle = 'A profile with the same handle exists';
            res.status(400).json(errors)
          }
            //Save a new profile....
            new Profile(profileFields).save().then(profile => res.json(profile));
          })
          .catch(err => res.json(err));
      }
    })
})
module.exports = router
