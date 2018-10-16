import React, { Component } from "react";
import FavouriteListing from "FavouriteListing"
import PropTypes from 'prop-types';
import "FavouriteList.css";

class FavouriteList extends Component {

	renderList() {
		return (
			this.props.favourites.map(track => (
				<FavouriteListing
					trackClick = {() => this.props.trackClick(track)}
					track = {track}
					key = {track.uri}
					deleteTrack = {this.props.deleteTrack}
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

FavouriteList.propTypes = {
	favourites: PropTypes.array.isRequired,
	trackClick: PropTypes.func.isRequired,
	deleteTrack: PropTypes.func.isRequired,
}

export default FavouriteList;
