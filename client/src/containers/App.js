import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Welcome from "Welcome";
import Search from "Search";
import Favourites from "Favourites";
import Navbar from "Navbar";

import { DB_CONFIG } from "config";
import firebase from "firebase/app";
import "firebase/database";

class App extends Component {
  state = {
      title: "MusicBois",
      song: "",
      isDBInit: false,
      favs: null,
      userToken: null,
      database: null,
  };
//  FLYTTA UT DEN HÄR SKITEN TILL NÅN ANNAN STANS
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

// FRAM TILL HIT

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a className="App-title" href={"/search"}>
            <h1 >{this.state.title} </h1>
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
