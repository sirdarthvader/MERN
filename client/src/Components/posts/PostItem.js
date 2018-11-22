import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from '../../Actions/postsAction';

class PostItem extends Component {

    OnDeleteClick(id) {
        this.props.deletePost(id);
    }
    onAddLike(id) {
      this.props.addLike(id);
    }

    onRemoveLike(id) {
      this.props.removeLike(id);
    }
    findUserLike(likes){
      const {auth} = this.props;
      if(likes.filter(like => like.user === auth.user.id).length >0) {
        return true;
      } else {
        return false;
      }
    }

  render() {
    const { post, auth,showActions } = this.props;
    return (
      <div className="card card-body mb-3 bg-dark text-white">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt="avatar"
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (<span>
              <button onClick={this.onAddLike.bind(this, post._id)} type="button" className="btn btn-light mr-1">
              <i className={classnames('fas fa-thumbs-up', {
                'text-info': this.findUserLike(post.likes)
              })} />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button onClick={this.onRemoveLike.bind(this, post._id)} type="button" className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-light mr-1">
              <i className="fas fa-comment" />
            </Link>

            { post.user === auth.user.id ? (
              <button
                className="btn btn-danger mr-1"
                onClick={this.OnDeleteClick.bind(this, post._id)}
                type='button'
              >
                <i className="fas fa-times" />
              </button>
            ) : null }
            </span>) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem);
