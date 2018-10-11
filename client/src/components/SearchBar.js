import React, { Component } from "react";
import PropTypes from 'prop-types';

class SearchBar extends Component {

	handleKeyPress = (e) => {
		if (e.key === 'Enter') {
      		this.props.getSong();
    	}
	}

	render() {
		return (
			<div>
				<div className="search-bar-title">
					<h2>Search tracks</h2>
				</div>
				<div className="search-box">
					<input
						className="text-search"
						placeholder="Enter query"
						value={this.props.filter}
						onChange={event => this.props.updateFilter(event)}
						onKeyPress={this.handleKeyPress}
					/>
				</div>
				<div className="button-box">
					<button
						className="basic-button"
						onClick={() => this.props.getSong()}
					> Get a song
					</button>
					{this.props.activeTrack && 
						<button
							className="basic-button"
							onClick={() => this.props.saveSong()}
						> Save song
						</button>
					}
				</div>
			</div>
		);
	}
}

SearchBar.propTypes = {
	filter: PropTypes.string,
	activeTrack: PropTypes.shape({
		name: PropTypes.string,
		uri: PropTypes.string,
	}),
	updateFilter: PropTypes.func.isRequired,
	getSong: PropTypes.func.isRequired,
	saveSong: PropTypes.func.isRequired,
}

export default SearchBar;
