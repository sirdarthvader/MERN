import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
  name,
  placeholder,
  value,
  onChange,
  error,
  type,
  icon,
}) => {
  return (
    <div className="input-group mb-3">
        <div className='input-group-prepend'>
            <span className='input-group-text'>
                <i className={icon} />
            </span>
        </div>
        <input
            className={classnames('form-control form-control-lg', {
            'is-invalid': error,
            })}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
        />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  icon: PropTypes.string
}

InputGroup.defaultprops = {
    type: 'text'
}


export default InputGroup;
