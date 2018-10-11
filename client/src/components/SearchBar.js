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
				<div className="SearchBarTitle">
					<h2>Search tracks</h2>
				</div>
				<div className="SearchBarContent">
					<div className="SearchBox">
						<input
							className="TextSearch"
							placeholder="Enter query"
							value={this.props.filter}
							onChange={event => this.props.updateFilter(event)}
							onKeyPress={this.handleKeyPress}
						/>
					</div>
					<div className="BtnBox">
						<button
							className="SearchSaveBtn"
							onClick={() => this.props.getSong()}
						>
							Get a song
						</button>
						{this.props.activeTrack ? (
							<button
								className="SearchSaveBtn"
								onClick={() => this.props.saveSong()}
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
