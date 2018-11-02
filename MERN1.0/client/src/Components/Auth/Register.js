import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registeruser } from '../../Actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registeruser(newUser, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name={'name'}
                  type={'text'}
                  value={this.state.name}
                  onChange={this.onChange}
                  autoComplete={'name'}
                  placeholder={'Full Name'}
                  error={errors}
                />
                <TextFieldGroup
                  name={'email'}
                  type={'email'}
                  value={this.state.email}
                  onChange={this.onChange}
                  autoComplete={'email'}
                  placeholder={'Email'}
                  info={
                    'This site uses Gravatar so if you want a profile image use, email associated with gravatar'
                  }
                  error={errors}
                />
                <TextFieldGroup
                  name={'password'}
                  type={'password'}
                  value={this.state.password}
                  onChange={this.onChange}
                  autoComplete={'password'}
                  placeholder={'Password'}
                  error={errors}
                />
                <TextFieldGroup
                  name={'password2'}
                  type={'password'}
                  value={this.state.password2}
                  onChange={this.onChange}
                  autoComplete={'password'}
                  placeholder={'Confirm Password'}
                  error={errors}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registeruser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { registeruser }
)(withRouter(Register));
