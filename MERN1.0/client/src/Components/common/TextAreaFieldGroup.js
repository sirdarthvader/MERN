import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  onChange,
  onClick,
  autoComplete,
  error,
  label,
  info,
  disabled
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames('form-control form-control-lg', {
          'is-invalid': error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        info={info}
        autoComplete={autoComplete}
      />
      {info && <small className='form-text text-muted'>{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  disabled: PropTypes.string,
  autoComplete: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}



export default TextAreaFieldGroup;
