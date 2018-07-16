const validator = require('validator')
const isEmpty = require('./is-empty');

module.exports = function validatePostInput (data) {
  let errors = {}


  data.text = !isEmpty(data.text) ? data.text : '';


  if(!validator.isLength(data.text, {min: 10, max: 300})) {
      errors.text = "text has to be atleast 10 characters long"
  }
  if(validator.isEmpty(data.text)) {
      errors.text = "Text can not be left blank";
  }



  return {
    errors,
    isValid: isEmpty(errors)
  }
}
