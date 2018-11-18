import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../Actions/profileActions';

class Education extends Component {

  onDelete(id) {
    this.props.deleteExperience(id);
    console.info('added');
  }

  render() {
    const education = this.props.edu.map(edu => (
      <div className="card mb-2" key={edu._id}>
        <div className="card-body">
          <h5 className="card-title">{edu.school}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{edu.degree}</h6>
          <p className="card-text">{edu.description}</p>
          <hr />
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> {' - '}
          {edu.to === null ? (
            'Now'
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
          <hr />
          <button className="btn btn-info mr-2">Edit</button>
          <button onClick={this.onDelete.bind(this, edu._id)} className="btn btn-danger">Delete</button>
        </div>
      </div>
    ));
    return (
      <div className="show-education">
        <h1 className="lead">Education Credential</h1>
        <div className="m-auto">{education}</div>
      </div>
    );
  }
}

Education.proptypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, {deleteEducation})(Education);
