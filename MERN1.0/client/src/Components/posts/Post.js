import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import Loader from "../common/Loader";

class Post extends Component {
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
