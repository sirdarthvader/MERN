const validator = require('validator')
const isEmpty = require('./is-empty');

module.exports = function validateEductionInput (data) {
  let errors = {}


  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';


  if(validator.isEmpty(data.school)) {
      errors.school = "school can not be left blank";
  }
  if(validator.isEmpty(data.degree)) {
    errors.degree = "degree is invalid";
}
  if(validator.isEmpty(data.fieldofstudy)) {
      errors.fieldofstudy = "field of study is required";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}
