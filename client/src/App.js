import React, { Component } from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import Search from "./Search/Search.js";
import Favourites from "./Favourites/Favourites.js";

import { DB_CONFIG } from "./Config/config";
import firebase from "firebase/app";
import "firebase/database";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "MusicBois",
      song: "",
      isDBInit: false,
      favs: null,
    };
  }

  componentDidMount() {
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app
      .database()
      .ref()
      .child("songs");

    this.getFavs();
  }

  getFavs() {
    if (this.app) {
      this.app
        .database()
        .ref()
        .once("value")
        .then(payload => {
          this.setState({
            favs: payload.val().songs
          });
        });
    }
  }
  //Flytta ut den här skiten
  renderNavbar() {
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a className="App-title" href={"/search"}>
            <h1 >{this.state.title} </h1>
          </a>
        </header>
        {this.renderNavbar()}
        <div>
          <Route
            exact
            path="/"
            render={() => <Welcome/>}
          />
          <Route
            path="/search"
            render={() => (
              <Search
                token={this.state.userToken}
                player={this.state.player}
                deviceId={this.state.deviceId}
                setToken={token => this.setState({ userToken: token })}
                filter={this.state.filter}
                db={this.database}
              />
            )}
          />
          <Route
            path="/favourites"
            render={() => (
              <Favourites
                favourites={this.state.favs && Object.values(this.state.favs)}
                getFavs={() => this.getFavs()}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
