import React, { Component } from "react";
import FavouriteListing from "FavouriteListing"
import PropTypes from 'prop-types';

class FavouriteList extends Component {

	renderList() {
		return (
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

FavouriteList.propTypes = {
	favourites: PropTypes.array.isRequired,
	trackClick: PropTypes.func.isRequired,
}

export default FavouriteList;
