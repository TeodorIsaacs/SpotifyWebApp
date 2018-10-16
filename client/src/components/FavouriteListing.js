import React, { Component } from "react";
import PropTypes from 'prop-types';
import "FavouriteListing.css"

class FavouriteListing extends Component {

	render(){
		return(
			<div
				className="song-listing"
			>	
				<div 
					onClick={() => this.props.trackClick(this.props.track)}
					className="song-listing-name"
				>
					{this.props.track.name}
				</div>
				<button 
					className="delete-track-button"
					onClick={() => this.props.deleteTrack(this.props.track)}
				/>
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
	deleteTrack: PropTypes.func.isRequired,
}

export default FavouriteListing;
