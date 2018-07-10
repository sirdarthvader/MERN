const validator = require('validator')
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput (data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be more than 2 characters and less than 3";
  }
  if (!validator.isEmpty(data.name)) {
      errors.name: = "name can not be empty";
  }
  if(!validator.isEmpty(data.password)) {
      errors.password = "password is required";
  }
  if(!validator.isEmpty(data.password, {min: 6 , max: 30})) {
    errors.password = "password must be atleast 6 characters long";
  }
  if(!validator.isEmtpty(data.password2) {
      errors.password2 = "password confirm field is required";
  }
  if(!validator.equals(data.password, data.password2)) {
      errors.password2 = "passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
