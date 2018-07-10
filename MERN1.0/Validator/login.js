const validator = require('validator')
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput (data) {
  let errors = {}


  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';


  if(!validator.isEmpty(data.email)) {
      errors.email = "email can not be left blank";
  }
  if(!validator.isEmpty(data.email)) {
    errors.email = "email is invalid";
}
  if(!validator.isEmpty(data.password)) {
      errors.password = "password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
