import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer class="footer bg-dark">
        <div class="container">
          <span class="text-muted">
            Copyright &copy; {new Date().getFullYear()} DevConnector
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
