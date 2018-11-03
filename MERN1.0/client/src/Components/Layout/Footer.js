import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
        <footer className="bg-dark text-white mt-5 p-4" style={{fontSize:'12px', textAlign:'left'}}>
            Copyright &copy; {new Date().getFullYear()} DevConnector
        </footer>
    )
  }
}

export default Footer;