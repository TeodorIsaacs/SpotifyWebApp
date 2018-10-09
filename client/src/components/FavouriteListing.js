import React, { Component } from "react";


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

export default FavouriteListing;
