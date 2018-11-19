import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileAbout from './ProfileAbout';
import ProfileCred from './ProfileCred';
import ProfileGithub from './ProfileGithub';
import ProfileHeader from './ProfileHeader';
import Loader from '../common/Loader';
import { getUserByHandle } from '../../Actions/profileActions';

class Profile extends Component {
  componentDidMount() {
    if(this.props.match.params.handle) {
      this.props.getUserByHandle(this.props.match.params.handle)
    }
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getUserByHandle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToPops, { getUserByHandle }) (Profile);
