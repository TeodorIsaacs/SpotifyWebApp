import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component{

  render() {
    return (
      <div className="navbar">
        <Link className="discoverBtn" to="/search">
          Discover
        </Link>
        <Link className="favouritesBtn" to="/favourites">
          My Favourites
        </Link>
        <Link className="logoutBtn" to="/">
          Home
        </Link>
      </div>
    );
  }
}

export default Navbar;
