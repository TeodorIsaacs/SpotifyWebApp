import React, { Component } from "react";
import "./Favourites.css";
import Track from "Track";
import FavouriteList from "FavouriteList"

class Favourites extends Component {
	state = {
		track: null
	};
	componentWillMount() {
		this.props.getFavs();
	}

	render() {
		return (
			<div className="main">
				<FavouriteList
					trackClick = {track => this.setState({track: track})}
					favourites = {this.props.favourites}
				/>
				{this.state.track && <Track track={this.state.track} />}
			</div>
		);
	}
}

export default Favourites;
