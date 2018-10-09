import React, { Component } from "react";
import "./Favourites.css";
import Track from "Track";
import FavouriteList from "FavouriteList"
import {getFavourites as getFavouritesApi} from "firebaseApi";

class Favourites extends Component {
	state = {
		track: null,
		favourites: null,
	};
	componentWillMount() {
		this.getFavourites();
	}

	getFavourites() {
        if (this.props.database) {
          getFavouritesApi(this.props.database)
            .then(payload => {
	            this.setState({
	            	favourites: Object.values(payload.val().songs)
	            });
            });
        }
    }

	render() {
		return (
			<div className="main">
				<FavouriteList
					trackClick = {track => this.setState({track: track})}
					favourites = {this.state.favourites}
				/>
				{this.state.track && <Track track={this.state.track} />}
			</div>
		);
	}
}

export default Favourites;
