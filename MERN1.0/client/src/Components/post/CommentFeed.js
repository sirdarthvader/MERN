import React, { Component } from 'react';
import PropTyes from 'prop-types';
import CommentItem from './CommentItem'

class CommentFeed extends Component {
  render() {
    const {comments, postId} = this.props;

    return comments.map(comment => <CommentItem key={comment._id} comment={comment} postId={postId} />)
  }
}

CommentFeed.propTypes = {
  comments: PropTyes.array.isRequired,
  postId: PropTyes.string.isRequired
}

export default  CommentFeed;