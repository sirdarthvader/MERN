import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
  name,
  value,
  onChange,
  error,
  info,
  options
}) => {

    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));
  return (
    <div className="form-group">
      <select
        type={type}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error,
        })}
        name={name}
        value={value}
        onClick={onClick}
        disabled={disabled}
        onChange={onChange}
        info={info}
        autoComplete={autoComplete}>
        {selectOptions}
      </select>
      {info && <small className='form-text text-muted'>{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;
