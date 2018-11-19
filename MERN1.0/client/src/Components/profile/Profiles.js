import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../common/Loader';
import { getProfiles } from '../../Actions/profileActions';
import ProfileItem from './ProfileItem';

class Profiles extends Component {

  componentDidMount() {
    this.props.getProfiles();
  }

  render() {

    const { profiles, loading } = this.props.profile;
    let profileItem

    if(profiles === null || loading) {
      profileItem = <Loader/>;
    } else {
      if(profiles.length > 0 ){
        profileItem = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ))
      } else {
        profileItem = <h4>No profiles.... found</h4>
      }
    }

    return (
      <div className='profiles'>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1 className="display-4 text-center">
                Developer Profiles
              </h1>
              <p className="lead text-center">
                People on this page are magicians in thier own world
              </p>
              {profileItem}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,

})

export default connect(mapStateToProps, { getProfiles }) (Profiles);