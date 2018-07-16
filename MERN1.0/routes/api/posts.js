const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load Post Model
const Post = require('../../models/Post')

// Load Profile Model
const Profile = require('../../models/Profile')

// Load Post input validator
const ValidatePostInput = require('../../Validator/post')




// @route   api/posts/test
// @desc    for testing he prfole route
// @access  public
router.get('/test', (req, res) => {
  res.json({
    msg: 'posts works'
  })
})

// @route   api/posts/
// @desc    for ceating post for logged in user
// @access  private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isVald } = ValidatePostInput(req.body)
    if (!isVald) {
      res.status(400).json(errors)
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    })

    newPost
      .save()
      .then(post => {
        res.json(post)
      })
      .catch(err => {
        res.status(400).json({ msg: 'Promise execution error' })
      })
  }
)

// @route   api/posts/
// @desc    get all post from all the users
// @access  public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts)
    })
    .catch(res.status(404).json('msg: No posts exists'))
})



// @route   api/posts/:id
// @desc    get a specific post by id
// @access  public
router.get('/:id', (req, res) => {
  Post.find()
    .then(posts => {
      res.json(posts)
    })
    .catch(res.status(404).json('msg: No post exists for this id'))
})


// @route   api/posts/:id
// @desc    delete posts from a specific user
// @access  private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
           return res.status(400).json({ unauthorized: 'User not authorized' })
          }

          post.remove().then(() => res.json({ success: true }))
        })
        .catch(err => {
          res.status(404).json({ error: 'No post found by this id' })
        })
    })
  }
)

// @route   api/posts/like/:id
// @desc    like a post by id
// @access  private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
           return res.status(400).json({alreadyliked: "You have already liked the post"})
          }
          //Add user in likes array
          post.likes.unshift({user: req.user.id});
          
          //Save in database
          post.save().then(post => res.json(post));
        })
        .catch(err => {
          res.status(404).json({msg: "This post does not exist"})
        })
    })
    .catch(err => {
      res.status(404).json({msg: "No user found for this requested id"})
    })
})



// @route   api/posts/unlike/:id
// @desc    like a post by id
// @access  private
router.get('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //look if the user has liked the post
          if(post.likes.filter(like => like.user.toString === req.user.id).length === 0) {
            return res.status(400).json({msg: "You have not yet like the post"})
          }
          //Select the user index to remove from the likes array
          const remInd = post.likes
            .map(item => item.user.toString)
            .indexOf(req.user.id);

          //Splice out of likes array
          post.likes.splice(remInd, 1);

          //Save to database
          post.save().then(res.json(post))
        })
    })
})




// @route   api/posts/comment/:id
// @desc    Add comment to a post
// @access  private
router.post('/comment/:id', passport.authenticate('jwt,', {session: false}), (req, res) => {
  Profile.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: res.body.text,
        name: res.body.text,
        avatar: res.body.name,
        user: req.user.id
      };

      //Add to comments array
      post.comments.unshift(newComment);

      //Save to database
      post.save().then(res.json(post))
    })
    .catch(err => {
      res.status(404).json({msg: "there is no such post for the given id"})
    })
})


// @route   api/posts/comment/:id/:comment_id
// @desc    Delete a comment from a post
// @access  private
router.delete('comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check to see if the comment exits
          if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
            return res.status(401).json({msg: "No such comment exists"})
          }
          //Get index to remove
          const remInd = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

          //Splice out of the comments array
          posts.comments.splice(remInd, 1);

          //save to database
          posts.save().then(post => res.json(post))
        })
        .catch(err => {
          res.status(400).json({msg: "there is no such post"})
        })
    })
    .catch(err => {
      res.status(404).json({msg: "There is no such profile found"})
    })
})
module.exports = router
