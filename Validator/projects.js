const validator = require('validator')
const isEmpty = require('./is-empty');

module.exports = function validateProjectInput (data) {
  let errors = {}


  data.name = !isEmpty(data.name) ? data.name : '';
  data.projecturl = !isEmpty(data.projecturl) ? data.projecturl : '';
  data.githuburl = !isEmpty(data.githuburl) ? data.githuburl : '';
  data.description = !isEmpty(data.description) ? data.description : '';


  if(validator.isEmpty(data.name)) {
      errors.name = "Name can not be left blank";
  }
  
if (!validator.isURL(data.projecturl)) {
    errors.projecturl = 'Not a valid URL';
  }
  if (!validator.isURL(data.githuburl)) {
    errors.githuburl = 'Not a valid URL';
  }
  
  if(validator.isEmpty(data.description)) {
    errors.description = "Description can not be left blank";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
