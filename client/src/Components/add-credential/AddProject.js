import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addProject } from '../../Actions/profileActions';

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      projecturl: '',
      githuburl: '',
      description: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e) {
    e.preventDefault();
    const newProject = {
      name: this.state.name,
      githuburl: this.state.githuburl,
      projecturl: this.state.projecturl,
      description: this.state.description
    }
    this.props.addProject(newProject, this.props.history);
  }
  render() {
    const {errors} = this.state;
    return (
      <div className='add-project'>
      <Link to="/dashboard" className="btn btn-dark">
          Go Back
        </Link>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Project</h1>
              <p className="lead text-center">
                Add any completed project information
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="* Project URL"
                  name="projecturl"
                  value={this.state.projecturl}
                  onChange={this.onChange}
                  error={errors.projecturl}
                />
                <TextFieldGroup
                  placeholder="* Github URL"
                  name="githuburl"
                  value={this.state.githuburl}
                  onChange={this.onChange}
                  error={errors.githuburl}
                />

                <TextAreaFieldGroup
                  placeholder="* Description"
                  value={this.state.description}
                  name="description"
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us more about the project in brief..."
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-blobk btn-dark"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


AddProject.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  addProject: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  {addProject}
)(withRouter(AddProject));
