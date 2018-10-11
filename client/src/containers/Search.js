import React, { Component } from "react";
import "./Search.css";
import Track from "Track";
import SearchBar from "SearchBar";
import {getSong as getSongApi} from "spotifyApi";
import PropTypes from "prop-types";
import {saveTrack as saveTrackApi} from "firebaseApi";

class Search extends Component {

	state = {
		filter: "",
		activeTrack: null,
	}

	saveSong = () => {
		saveTrackApi(this.props.database, this.state.activeTrack);
	}

	updateFilter = (event) => {
		this.setState({
			filter: event.target.value
		});
	}

	getSong = () => {
		if (!this.state.filter) {
			return null;
		}
		getSongApi(this.state.filter, this.props.token)
			.then(payload => {
				if (payload.error) {
					alert(`Something went wrong, status code: ${payload.error.status}`);
				} else {
					this.setState({activeTrack: payload})
				}
			});
	}

	render() {
		return (
			<div className="search-bar">
				<SearchBar
					filter={this.state.filter}
					saveSong={this.saveSong}
					updateFilter={this.updateFilter}
					getSong={this.getSong}
					activeTrack={this.state.activeTrack}
				/>

				{this.state.activeTrack &&
					<Track
						track={this.state.activeTrack}
					/>
				}
			</div>
		);
	}
}

Search.propTypes = {
	token: PropTypes.string,
}

export default Search;
