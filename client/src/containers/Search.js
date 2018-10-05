import React, { Component } from "react";
import "./Search.css";
import Track from "Track";
import SearchBar from "SearchBar"
import {getSong as getSongApi, getHashParams} from "spotifyApi"

class Search extends Component {

	state = {
		popularity: 0,
		filter: "",
		songs: [],
		activeSong: null
	}

	componentWillMount() {
		const token = getHashParams().access_token;
		this.props.setToken(token);
	}

	saveSong = (song) => {
		console.log(this.props.activeSong);
		this.props.db.push().set(this.state.activeSong);
	}

	updateFilter = (event) => {
		this.setState({
			filter: event.target.value
		});
	}

	getSong = () => {
		getSongApi(this.state.filter, this.state.token)
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
							console.log(track);
							this.setState({activeSong: {
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
						activeSong={this.state.activeSong}
					/>

					<Track
						track={this.state.activeSong}
					/>
				</div>
			</div>
		);
	}
}

export default Search;
