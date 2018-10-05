import React, { Component } from "react";
import "./Track.css";

class Track extends Component {
  render() {
    return this.props.track && 
      <div className="Track">
        <iframe
          src={"https://open.spotify.com/embed?uri=" + this.props.track.uri}
          width="300"
          height="400"
          allow="encrypted-media"
        />
      </div>;
  }
}

export default Track;
