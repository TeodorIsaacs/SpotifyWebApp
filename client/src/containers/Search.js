import React, { Component } from "react";
import "./Search.css";
import Track from "Track";
import SearchBar from "SearchBar"
import {getSong as getSongApi, getHashParams} from "spotifyApi"

class Search extends Component {

	state = {
		filter: "",
		activeTrack: null
	}

	componentWillMount() {
		const token = getHashParams().access_token;
		this.props.setToken(token);
	}

	saveSong = (song) => {
		this.props.db.push().set(this.state.activeSong);
	}

	updateFilter = (event) => {
		this.setState({
			filter: event.target.value
		});
	}

	getSong = () => {
		getSongApi(this.state.filter, this.props.token)
			.then(payload => {
				payload.json().then(data => {
					try {
						//Improve error handling
						if (data.error) {
							alert(
								"Your acces token has expired, please log in again"
							);
						} else {
							const track = data.tracks.items[0];
							this.setState({activeTrack: {
								uri: track.uri,
								name: track.name
							}})
						}
					} catch (e) {
						alert("Try searching for something else");
					}
				});
			});
	}

	render() {
		return (
			<div className="SearchBar">
				<div className="SearchBarMain">
					<SearchBar
						filter={this.state.filter}
						saveSong={this.saveSong}
						updateFilter={this.updateFilter}
						getSong={this.getSong}
						activeTrack={this.state.activeTrack}
					/>

					<Track
						track={this.state.activeTrack}
					/>
				</div>
			</div>
		);
	}
}

export default Search;
