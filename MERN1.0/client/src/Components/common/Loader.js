import React from 'react';
import spinner from './loader.png';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};
