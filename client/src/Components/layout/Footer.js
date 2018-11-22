import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer bg-dark">
        <div className="container">
          <span className="text-muted">
            Copyright &copy; {new Date().getFullYear()} DevConnector
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
