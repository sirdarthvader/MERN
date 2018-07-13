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
const validateProfileInput = require('../../Validator/profile');


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

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create
        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }
          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);


// @route     /api/profile/handle/:handle
// @desc      get profile by handle (GET)
// @access    public

router.get('/handle/:handle', (req, res) => {
  //initialise for errors
  const errors = {};
  //Check for profile in database
  Profile.findOne({user: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      //check if profile is not available
      if(!profile) {
        errors.noprofile = 'No profile for this handle exists';
        res.status(404).json(errors);
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json({msg: "Promise execution error"}));
})




// @route     /api/profile/user/:user_id
// @desc      get profile by user id (GET)
// @access    public

router.get('/user/:user_id', (req, res) => {
  //initialise for errors
  const errors = {};
  //Check for profile in database
  Profile.findOne({user: req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      //check if profile is not available
      if(!profile) {
        errors.noprofile = 'No user for this id exists';
        res.status(404).json(errors);
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json({msg: "Promise execution error"}));
})

module.exports = router
