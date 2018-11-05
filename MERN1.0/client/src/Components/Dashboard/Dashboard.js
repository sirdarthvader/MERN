import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
        dashBoardContent = <h4>Loading....</h4>
      } else {
        dashBoardContent = <h4>Welcome</h4>
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