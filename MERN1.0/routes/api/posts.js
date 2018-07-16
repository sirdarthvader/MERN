const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const passport  = require('passport');

//Load Post Model
const Post = require('../../models/Post');

//Load Post input validator
const ValidatePostInput = require('../../Validator/post');


//@route   api/posts/test
//@desc    for testing he prfole route 
//@access  public
router.get('/test', (req, res) => {
    res.json({
        msg: "posts works"
    });
});

//@route   api/posts/
//@desc    for ceating post for logged in user
//@access  private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isVald} = ValidatePostInput(req.body);
        if(!isVald) {
            res.status(400)
            .json(errors)
        }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save()
    .then(
        post => {
            res.json(post)
        }
    )
    .catch(err => {
        res.status(400).json({msg: "Promise execution error"})
    })
})



//@route   api/posts/  
//@desc    get all post from all the users
//@access  public

router.get('/', (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => {
            res.json(posts)
        })
        .catch(res.status(404).json('msg: No posts exists'))
})

//@route   api/posts/:id
//@desc    get all post from all the users
//@access  public

router.get('/:id', (req, res) => {
    Post.find()
        .then(posts => {
            res.json(posts)
        })
        .catch(res.status(404).json('msg: No post exists for this id'))
})
module.exports = router;