import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../Actions/profileActions';

class Experience extends Component {

  onDelete(id) {
    this.props.deleteExperience(id);
    console.info('added');
  }

  render() {
    const experience = this.props.exp.map(exp => (
      <div className="card mb-2" key={exp._id}>
        <div className="card-body">
          <h5 className="card-title">{exp.company}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{exp.title}</h6>
          <p className="card-text">{exp.description}</p>
          <hr />
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> {' - '}
          {exp.to === null ? (
            'Now'
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
          <hr />
          <button className="btn btn-info mr-2">Edit</button>
          <button onClick={this.onDelete.bind(this, exp._id)} className="btn btn-danger">Delete</button>
        </div>
      </div>
    ));
    return (
      <div className="show-experience">
        <h1 className="lead">Experience Credential</h1>
        <div className="m-auto">{experience}</div>
      </div>
    );
  }
}



Experience.proptypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, {deleteExperience})(Experience);
