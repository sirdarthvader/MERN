import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center">
            Copyright &copy; {new Date().getFullYear()} Ashish
        </footer>
    )
  }
}

export default Footer;
