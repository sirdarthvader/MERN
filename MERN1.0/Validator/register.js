const validator = require('validator')
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput (data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ' ';
  data.email = !isEmpty(data.email) ? data.email : ' ';
  data.password = !isEmpty(data.password) ? data.password : ' ';

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be more than 2 characters and less than 3";
  }
  if (!validator.isEmpty(data.name)) {
      errors.name = "name can not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
