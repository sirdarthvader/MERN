import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';

class Experience extends Component {
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
        </div>
      </div>
    ));
    return (<div className='show-experience'>
      <h1 className="lead">Experience</h1>
      {experience}</div>);
  }
}

Experience.proptypes = {
  
}

export default connect(null, {}) (withRouter(Experience));
