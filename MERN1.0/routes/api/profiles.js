const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load profile model
const Profile = require('../../models/Profile')
// Load user model
const User = require('../../models/User')

// @route : /api/profile/tes
// @desc: used for testing the profile route
// @access: public
router.get('/test', (req, res) => {
  res.json({
    msg: 'profile works'
  })
})


// @route : /api/profile/
// @desc: get current user profile (GET)
// @access: public
router.get('/', passport.authenticate('jwt', { session: flase }), (req, res) => {

    const errors = {};

    Profile.findOne({ user: req.body.id })
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
  const profileFields = {};
  //Get user data 
  profileFields.user = req.user.id;
  if(res.body.handle) profileFields.handle = res.body.handle;
  if(res.body.company) profileFields.company = res.body.company;
  if(res.body.location) profileFields.location = res.body.location;
  if(res.body.website) profileFields.website = res.body.website;
  if(res.body.bio) profileFields.bio = res.body.bio;
  if(res.body.status) profileFields.status = res.body.status;

  //SKILLS split into arary,
  if(typeof res.body.skills !== 'undefined') {
    profileFields.skills = res.body.skills.split(',');
  }

  //SOCIAL LINKS, initiate object.. 
  profileFields.social ={};
  if(res.body.youtube) profileFields.social.youtube = res.body.youtube;
  if(res.body.facebook) profileFields.social.faceboook = res.body.facebook;
  if(res.body.instagram) profileFields.social.instagram = res.body.instagram;
  if(res.body.linkedin) profileFields.social.linkedin = res.body.linkedin;
  if(res.body.twitter) profileFields.social.twitter = res.body.twitter;

  Profile.findOne({user: req.user.id})
    .then(profile => {
      if(profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id }.
          { $set: profileFields },
          { new: true }
        )
        .then(profile => res.json(profile));
      } else {
        //Create
        
        //Check if the handle exists 
        Profile.findOne({handle: req.body.handle})
          .then(profile => {
            errors.handle = 'A prfile with the same handle exists';
            res.status(400).json(errors)

            //Save a new profile....
            new Profile(profileFields).save().then(profile => res.json(profile));
          })
      }
    })
})
module.exports = router
