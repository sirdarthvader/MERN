import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {},
    };
  }

  onSubmit = e => {
    e.preventDefault();
    console.log('submit');
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors, displaySocialInputs } = this.state;
    //social Inputs
    let socialInputs;
    if(displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup 
          placeholder='Twitter profile URL'
          name='twitter'
          icon='fab fa-twitter'
          onChange={this.onChange}
          value={this.state.twitter}
          error={errors.twitter}
          />
          <InputGroup 
          placeholder='Linkedin profile URL'
          name='linkedin'
          icon='fab fa-linkedin'
          onChange={this.onChange}
          value={this.state.linkedin}
          error={errors.linkedin}
          />
          <InputGroup 
          placeholder='Facebook profile URL'
          name='facebook'
          icon='fab fa-facebook'
          onChange={this.onChange}
          value={this.state.facebook}
          error={errors.facebook}
          />
          <InputGroup 
          placeholder='Instagram profile URL'
          name='instagram'
          icon='fab fa-instagram'
          onChange={this.onChange}
          value={this.state.instagram}
          error={errors.instagram}
          />
          <InputGroup 
          placeholder='Youtube profile URL'
          name='youtube'
          icon='fab fa-youtube'
          onChange={this.onChange}
          value={this.state.youtube}
          error={errors.youtube}
          />
        </div>
      );
    }
    // options
    const options = [
      { label: '* Select Professional status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Student', value: 'Student' },
      { label: 'Senior Developer', value: 'Developer' },
      { label: 'Teacher', value: 'Teacher' },
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your profile</h1>
              <p className="lead text-center">
                Fill in the fileds with required details to get your profile
                created.
              </p>
              <small className="d-block pb-3">* = Required Fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile, people can look you up using the handle name please be wise."
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  options={options}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Select your professional status"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or the one you are working with"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Link to your personal website , if you have any"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Your current city location"
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values, for eg: HTML,CSS,JS,PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want to show the latest repo and a github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Write a something about yourself, feel free to keep it short or long."
                />
                <div className="mb-3">
                  <button
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }));
                    }}
                    className="btn btn-light"
                  >Add social network links
                  </button>
                  <span className="text-muted ml-4">Optional</span>
                </div>
                  {socialInputs}
                <input type="submit" value="Submit" className="btn btn-block btn-info mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.erors,
});

export default connect(
  mapStateToProps,
  {}
)(CreateProfile);
