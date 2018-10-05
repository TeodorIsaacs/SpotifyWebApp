import React, { Component } from "react";
import FavouriteListing from "FavouriteListing"

class FavoriteList extends Component {

	renderList() {
		return (
			this.props.favourites &&
			this.props.favourites.map(track => (
				<FavouriteListing
					trackClick = {() => this.props.trackClick(track)}
					track = {track}
				/>
			)));
	}

	render() {
		return <div className="song-list">
				<div className="header">
					<h2>Favourite songs</h2>
				</div>
				{this.renderList()}
			</div>;
	}
}

export default FavoriteList;