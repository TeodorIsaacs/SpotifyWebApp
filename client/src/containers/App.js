import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Welcome from "Welcome";
import Search from "Search";
import Favourites from "Favourites";
import Navbar from "Navbar";
import {getHashParams} from "spotifyApi";

import { DB_CONFIG } from "config";
import firebase from "firebase/app";
import "firebase/database";

class App extends Component {
  state = {
      song: "",
      userToken: null,
      database: null,
  };

  componentDidMount() {
    this.initializeDB()
    const token = getHashParams().access_token;
    this.setState({ userToken: token });
  }

  initializeDB(){
    firebase.initializeApp(DB_CONFIG);
    var database = firebase
      .database()
    this.setState({database: database})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a className="App-title" href={"/search"}>
            <h1 > MusicBois </h1>
          </a>
        </header>
        <Navbar/>
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
                database={this.state.database}
              />
            )}
          />

          <Route
            path="/favourites"
            render={() => (
              <Favourites
                favourites={this.state.favs && Object.values(this.state.favs)}
                database={this.state.database}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
