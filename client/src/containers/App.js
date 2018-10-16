import React, { Component } from "react";
import "./App.css";
import { Route, Switch} from "react-router-dom";
import Welcome from "Welcome";
import Search from "Search";
import Favourites from "Favourites";
import Navbar from "Navbar";
import Header from "Header";
import ErrorComponent from "ErrorComponent";
import {getHashParams, getAccountDetails} from "spotifyApi";

import { DB_CONFIG } from "firebaseApi";
import firebase from "firebase/app";
import "firebase/database";

class App extends Component {
    state = {
        song: "",
        userToken: null,
        database: null,
        isDatabaseInit: false,
        userId: null,
        hasErrorCode: null,
    };

    componentDidMount() {
        this.initializeDB()
        const token = getHashParams().access_token;
        this.setState({ userToken: token });
        this.getUser(token);
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

    getUser(token){
        getAccountDetails(token)
            .then(payload => {
                if (payload.error) {
                    this.setState({ hasErrorCode: payload.error.status })
                } else {
                    this.setState({ userId: payload.id });
                }
            })
    }

    render() {
        return (
            <div className="main">
                <Header/>
                <Navbar/>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Welcome/>}
                    />
                    <Route
                        path="/search"
                        render={() => (
                            this.state.hasErrorCode 
                                ?
                                    <ErrorComponent errorCode={this.state.hasErrorCode} />
                                :
                                    <Search
                                        token={this.state.userToken}
                                        database={this.state.database}
                                        userId={this.state.userId}
                                    />
                        )}
                    />

                    <Route
                        path="/favourites"
                        render={() => (
                            this.state.hasErrorCode 
                                ?
                                    <ErrorComponent errorCode={this.state.hasErrorCode} />
                                :
                                    <Favourites
                                        favourites={this.state.favs && Object.values(this.state.favs)}
                                        database={this.state.database}
                                        isDatabaseInit={this.state.isDatabaseInit}
                                        userId={this.state.userId}
                                        isLoggedIn={this.state.isLoggedIn}
                                    />
                        )}
                    />

                    <Route 
                        render={() => (
                            <ErrorComponent errorCode={404}/>
                        )}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
