import React, { Component } from "react";
import PropTypes from 'prop-types';

class FavouriteListing extends Component {
	render(){
		return(
			<div
				className="song-listing"
				onClick={() => this.props.trackClick(this.props.track)}
			>
				{this.props.track.name}
			</div>
		)
	}
}

FavouriteListing.propTypes = {
	track: PropTypes.shape({
		name: PropTypes.string,
		uri: PropTypes.string,
	}).isRequired,
	trackClick: PropTypes.func.isRequired,
}

export default FavouriteListing;
