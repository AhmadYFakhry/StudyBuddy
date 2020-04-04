import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
        <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/user" className="nav-link">Profile</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/user" className="nav-link">Calendar</Link>
                </li>
            </ul>
        </div>
      </nav>
    );
  }
}