import React, { Component } from 'react';
import "./Navbar.css"
import axios from 'axios'
import Auth from '../../HOC/Auth';
import Cookies from 'js-cookie';

export default class Navbar extends Component {

  constructor(props) {
    super();

    this.props = props;
    console.log(this.props)
  }

  async handleLogout() {
    const tk = Auth.getToken();
    try {
      axios.defaults.headers = {
        Authorization: tk
      }
      await axios.post('http://localhost:8000/user/logout');
      Cookies.remove('Authorization', { path: '/' });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="logo">
            <a href="/" className="nav-link">
              <span className="link-text logo-text">STUDYBUDDY</span>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fad"
                data-icon="angle-double-right"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
              >
                <g className="fa-group">
                  <path
                    fill="currentColor"
                    d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                    className="fa-secondary"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                    className="fa-primary"
                  ></path>
                </g>
              </svg>
            </a>
          </li>

          {/* <li className="nav-item">
            <a href={`/profile/${this.props.userId}`} className="nav-link">
              <i class="fas fa-user-circle"></i>
              <span className="link-text">Profile</span>
            </a>
          </li> */}
          <li className="nav-item">
            <a href="/dashboard" className="nav-link">
              <i class="fas fa-columns"></i>
              <span className="link-text">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <div className="nav-link" onClick={this.handleLogout}>
              <i class="fas fa-sign-out-alt"></i>
              <span className="link-text">Sign out</span>
            </div>


            <a href="/" className="nav-link">
              <i class="fas fa-cog"></i>
              <span className="link-text">Settings</span>
            </a>
          </li>

          {/* <li className="nav-item" onClick={this.handleLogout}>
            <span className="link-text">Log out</span>
          </li> */}
        </ul>
      </nav >
    );
  }
}