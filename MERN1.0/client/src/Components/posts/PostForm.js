import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../Actions/postsAction';

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {}
        }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProp) {
        if(nextProp.errors) {
            this.setState({errors: nextProp.errors})
        }
    }

    onSubmit(e) {
        e.preventDefault();

        console.log('clicked');
        const { user } = this.props.auth;
        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
        this.props.addPost(newPost);
        this.setState({text: ''});
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

  render() {
      const {errors} = this.state;
    return (
        <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Say Somthing...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}> 
              <div className="form-group">
                <TextAreaFieldGroup 
                    placeholder='Create a post...'
                    name='text'
                    value={this.state.text}
                    onChange={this.onChange}
                    error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>

    )
  }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
})

export default connect(mapStateToProps, {addPost}) (PostForm);