import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import Loader from '../common/Loader';
import { getCurrentProfile } from '../../Actions/profileActions';


class Dashboard extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
    }

  render() {
    const {user} = this.props.auth;
    const {profile, loading} = this.props.profile;
    let dashBoardContent;
    
    if(user) {
      if(profile === null || loading) {
        dashBoardContent = <Loader />
      } else {
        //check if the logged in user has any profile data
        if(Object.keys(profile).length > 0 ) {
          dashBoardContent = <h4>TODO: Show profile information</h4>
        } else {
          //user is logged in buthas no profile info to be shown
          dashBoardContent = (
            <div>
              <p className="text-muted lead">Welcome {user.name}</p>
              <p>You have not created your profile yet, please add some info to get you started</p>
              <Link to='create-profile' className='btn btn-lg btn-info'>Create Profile</Link>
            </div>
          );
        }
      }
    } 

    return (
      <div className='dashboard'>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashBoardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile,  })(Dashboard);