import React, { Component } from 'react';
import './Welcome.css';

class Welcome extends Component {

  render() {
    return (
      <div className="welcome">

        <h2 className="welcome-title">Welcome to MusicBois</h2>

        <p className="welcome-text">
			To use this app you need to login to your Spotify Account.
			<br/> 
			Click the link below! 
        </p>

        <a className="redirect-button" href='http://localhost:8888' > Login to Spotify </a>
      </div>
    );
  }
}

export default Welcome;
