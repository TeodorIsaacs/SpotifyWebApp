import React, { Component } from "react";
import "./Search.css";
import Track from "Track";

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			popularity: 0,
			filter: "",
			songs: [],
			activeSong: null
		};
	}

	componentWillMount() {
		const params = this.getHashParams();
		const token = params.access_token;
		this.props.setToken(token);
	}

	getHashParams() {
		var hashParams = {};
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		e = r.exec(q);
		while (e) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
			e = r.exec(q);
		}
		return hashParams;
	}

	search(popularity, filter) {
		this.setState({
			popularity: popularity,
			filter: filter
		});
	}
	setSong(track) {
		this.setState({ activeSong: track });
	}

	render() {
		return (
			<div className="SearchBar">
				{/* We pass the model as property to the Sidebar component */}

				<div className="SearchBarMain">
					<SearchBar
						onClick={(popularity, filter) =>
							this.search(popularity, filter)
						}
						filter={this.state.filter}
						popularity={this.state.popularity}
						songs={this.state.songs}
						token={this.props.token}
						setSong={track => this.setSong(track)}
						activeSong={this.state.activeSong}
						db={this.props.db}
					/>

					<Track
						model={this.props.model}
						popularity={this.state.popularity}
						filter={this.state.filter}
						token={this.props.token}
						player={this.props.player}
						deviceId={this.props.deviceId}
						track={this.state.activeSong}
					/>
				</div>
			</div>
		);
	}
}

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			popularity: this.props.popularity,
			filter: this.props.filter,
			songs: this.props.songs
		};
	}

	saveSong(song) {
		console.log(this.props.activeSong);
		this.props.db.push().set(this.props.activeSong);
	}

	updateFilter(event) {
		this.setState({
			filter: event.target.value
		});
	}

	getSong() {
		if (this.state.filter) {
			fetch(
				"https://api.spotify.com/v1/search?q=" +
					this.state.filter +
					"&type=track&limit=1&offset=0",
				{
					method: "GET",
					headers: {
						Authorization: "Bearer " + this.props.token,
						Accept: "application/json",
						"Content-Type": "application/json"
					}
				}
			).then(payload => {
				payload.json().then(data => {
					try {
						if (data.error) {
							alert(
								"Your acces token has expired, please log in again"
							);
						} else {
							const track = data.tracks.items[0];
							console.log(track);
							this.props.setSong({
								uri: track.uri,
								name: track.name
							});
						}
					} catch (e) {
						alert("Try searching for something else");
					}
				});
			});
		}
	}

	render() {
		return (
			<div>
				<div className="SearchBarTitle">
					<h2>Search tracks</h2>
				</div>
				<div className="SearchBarContent">
					<div className="SearchBox">
						<input
							className="TextSearch"
							placeholder="Enter query"
							value={this.state.filter}
							onChange={event => this.updateFilter(event)}
						/>
					</div>
					<div className="BtnBox">
						<button
							className="SearchSaveBtn"
							onClick={() => this.getSong()}
						>
							Get a song
						</button>
						{this.props.activeSong ? (
							<button
								className="SearchSaveBtn"
								onClick={() => this.saveSong()}
							>
								{" "}
								Save song{" "}
							</button>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

export default Search;
