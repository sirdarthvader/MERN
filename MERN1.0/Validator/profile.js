const validator = require('validator')
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput (data) {
  let errors = {}


  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if(!validator.isLength(data.handle, {min: 3, max: 40})) {
    errors.handle = "handle length should be atleast 3 characters long";
  }
  if(!validator.isEmpty(data.handle)) {
      errors.handle = "handle can not be left empty";
  }
  if(!validator.status.isEmpty(data.skills)) {
      errors.status = "skills can not be left empty";
  }
  if(!isEmpty(data.website) {
      if(!validator.isURL(data.website)) {
          errors.website = "enter a valid website address";
      }
  })
  if(!isEmpty(data.youtube) {
    if(!validator.isURL(data.youtube)) {
        errors.youtube = "enter a valid youtube address";
    }
})
if(!isEmpty(data.instagram) {
    if(!validator.isURL(data.instagram)) {
        errors.instagram = "enter a valid instagram address";
    }
})
if(!isEmpty(data.linkedin) {
    if(!validator.isURL(data.linkedin)) {
        errors.linkedin = "enter a valid linkedin address";
    }
})
if(!isEmpty(data.facebook) {
    if(!validator.isURL(data.facebook)) {
        errors.facebook = "enter a valid facebook address";
    }
})
if(!isEmpty(data.twitter) {
    if(!validator.isURL(data.twitter)) {
        errors.twitter = "enter a valid twitter address";
    }
})



  return {
    errors,
    isValid: isEmpty(errors)
  }
}
