import React, { Component } from 'react';
import './Welcome.css';
import { Link } from 'react-router-dom';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Welcome">

        <h2>Welcome to MusicBois</h2>

        <p>To use this app you need to login to your Spotify Account. <br/>Click the link below! </p>

        <a href='http://localhost:8888' > Login to Spotify </a>
      </div>
    );
  }
}

export default Welcome;
