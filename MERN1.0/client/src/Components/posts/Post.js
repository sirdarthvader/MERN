import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import Loader from "../common/Loader";
import PostFeed from './PostFeed';
import { getPost } from '../../Actions/postsAction';

class Post extends Component {
componentDidMount() {
    this.props.getPost()
}

  render() {
      const { posts, loading } = this.props.post;
      let postContent;
      if(posts === null || loading) {
          postContent = <Loader />
      } else {
          postContent = <PostFeed posts={posts} />
      }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = { 
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPost}) (Post);
