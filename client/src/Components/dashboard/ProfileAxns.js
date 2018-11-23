import React from 'react';
import {Link} from 'react-router-dom'

const ProfileAxns = () => {
  return (
    <div>
      <div className="mb-4" role="group">
        <Link to="/edit-profile" className="btn btn-dark mr-2 mb-2">
          <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-dark mr-2 mb-2">
          <i className="fab fa-black-tie text-info mr-1" />
          Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-dark mb-2">
          <i className="fas fa-graduation-cap text-info mr-1" />
          Add Education
        </Link>
      </div>
    </div>
  );
};

export default ProfileAxns;
