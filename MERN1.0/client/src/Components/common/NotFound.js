import React, { Component } from 'react';
import image from './notfound.png';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="display-4 fourByfour">404 not found</h1>
            <img src={image} alt="404" style={{maxWidth: '100%'}} />
          </div>
        </div>
      </div>
    );
  }
}
export default NotFound;
