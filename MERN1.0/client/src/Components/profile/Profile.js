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
    if (this.props.match.params.handle) {
      this.props.getUserByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileConetnt;
    if (profile === null || loading) {
      profileConetnt = <Loader />;
    } else {
      profileConetnt = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-dark float-left mb-3">
                Back to Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          
            <ProfileHeader />
            <ProfileAbout />
            <ProfileCred />
            <ProfileGithub />
          
        </div>
      );
    }
    return (
    <div className='profile'>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {profileConetnt}
          </div>
        </div>
      </div>
    </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getUserByHandle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { getUserByHandle }
)(Profile);
