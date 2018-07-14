import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import ReactGA from "react-ga";
ReactGA.initialize("UA-121173924-1");
export class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: false
    };
  }
  changeCollapse = () => {
    let status = this.state.status ? false : true;
    this.setState({ status });
    ReactGA.event({
      category: "User",
      action: "NavLinks"
    });
  };

  render() {
    let { status } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-infos fixed-top">
          <div className="container">
            <Link
              onClick={this.state.status ? this.changeCollapse : null}
              className="navbar-brand"
              to="/"
            >
              <img src="/logo.svg" className="logo-brand" alt="logo" />
            </Link>
            <button
              onClick={this.changeCollapse}
              className="navbar-toggler py-2"
              type="button"
              data-toggle="collapse"
              data-target="navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              Menü <i className="fa fa-bars" />
            </button>
            <div
              className={
                this.state.status
                  ? "collapse navbar-collapse opened"
                  : "collapse navbar-collapse closed"
              }
              id="navbarResponsive"
            >
              <ul className="navbar-nav ml-auto">
                {/* <li className="nav-item">
                <NavLink exact activeClassName='active' className="nav-link"  onClick={this.changeCollapse} to="/">
                  Anasayfa
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li> */}
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    onClick={this.changeCollapse}
                    to="/books"
                  >
                    Kitaplar
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    activeClassName="active"
                    className="nav-link"
                    onClick={this.changeCollapse}
                    to="/methods"
                  >
                    Arama teknikleri
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    onClick={this.changeCollapse}
                    to="/contact"
                  >
                    İletişim
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {status ? (
          <div onClick={this.changeCollapse} className="navcloser" />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Nav;
