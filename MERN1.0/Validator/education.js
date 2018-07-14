const validator = require('validator')
const isEmpty = require('./is-empty');

module.exports = function validateEductionInput (data) {
  let errors = {}


  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';


  if(validator.isEmpty(data.school)) {
      errors.school = "school can not be left blank";
  }
  if(validator.isEmpty(data.degree)) {
    errors.degree = "degree is invalid";
}
  if(validator.isEmpty(data.fieldofstudy)) {
      errors.fieldofstudy = "field of study is required";
  }

  if(validator.isEmpty(data.from)) {
    errors.from = "from date is required";
}

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
