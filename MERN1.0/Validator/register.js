const validator = require('validator')
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput (data) {
  let errors = {}

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be more than 2 characters and less than 3"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
