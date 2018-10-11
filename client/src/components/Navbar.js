import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "Navbar.css";

class Navbar extends Component{

  render() {
    return (
      <div className="navbar">
        <Link className="discover-button" to="/search">
          Discover
        </Link>
        <Link className="favourites-button" to="/favourites">
          My Favourites
        </Link>
        <Link className="home-button" to="/">
          Home
        </Link>
      </div>
    );
  }
}

export default Navbar;
