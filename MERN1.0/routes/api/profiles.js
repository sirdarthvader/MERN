const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load profile model
const Profile = require('../../models/Profile')
//Load user model
const User = require('../../models/User');


//@route : /api/profile/tes
//@desc: used for testing the profile route
//@access: public
router.get('/test', (req, res) => {
    res.json({
        msg: "profile works"
    });
});

//@route : /api/profile/
//@desc: get current user profile
//@access: private
router.get('/', passport.authenticate('jwt', { session: flase }), (req, res) => {
    
})

module.exports = router;