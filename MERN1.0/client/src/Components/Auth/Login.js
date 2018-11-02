import React, { Component } from 'react';
import { loginUser } from '../../Actions/authAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Components
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const loginUser = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(loginUser);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
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
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  name={'email'}
                  type={'email'}
                  placeholder={'Email Address'}
                  onChange={this.handleChange}
                  value={this.state.email}
                  autoComplete={'name'}
                  error={errors.email}
                />

                <TextFieldGroup
                  name={'password'}
                  type={'password'}
                  placeholder={'Password'}
                  onChange={this.handleChange}
                  value={this.state.password}
                  autoComplete={'password'}
                  error={errors.password}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
