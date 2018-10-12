import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Welcome from "Welcome";
import Search from "Search";
import Favourites from "Favourites";
import Navbar from "Navbar";
import Header from "Header";
import {getHashParams} from "spotifyApi";

import { DB_CONFIG } from "config";
import firebase from "firebase/app";
import "firebase/database";

class App extends Component {
    state = {
        song: "",
        userToken: null,
        database: null,
        isDatabaseInit: false,
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
        this.setState({
            database: database,
            isDatabaseInit: true
        })
    }

    render() {
        return (
            <div className="main">
                <Header/>
                <Navbar/>
                <React.Fragment>
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
                                isDatabaseInit={this.state.isDatabaseInit}
                            />
                        )}
                    />
                </React.Fragment>
            </div>
        );
    }
}

export default App;
