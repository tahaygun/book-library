import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <footer id='footer' className="py-5 bg-infos footer">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright &copy; Pırlanta Ara 2018
          </p>
        </div>
        {/* <!-- /.container --> */}
      </footer>
    );
  }
}

export default Footer;
