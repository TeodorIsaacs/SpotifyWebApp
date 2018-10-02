import React, { Component } from "react";
import "./Favourites.css";
import Track from "../Search/Track.js";

class Favourites extends Component {
	state = {
		track: null
	};
	componentWillMount() {
		this.props.getFavs();
	}

	renderFavList() {
		const data =
			this.props.favourites &&
			this.props.favourites.map(song => (
				<div
					className="song-listing"
					onClick={() => this.setState({ track: song })}
				>
					{song.name}
				</div>
			));
		return <div className="song-list">
				<div className="header">
					<h2>Favourite songs</h2>
				</div>
				{data}
			</div>;
	}

	render() {
		return (
			<div className="main">
				{this.renderFavList()}
				{this.state.track && <Track track={this.state.track} />}
			</div>
		);
	}
}

export default Favourites;
