import React, { Component } from "react";

class SearchBar extends Component {

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
						/>
					</div>
					<div className="BtnBox">
						<button
							className="SearchSaveBtn"
							onClick={() => this.props.getSong()}
						>
							Get a song
						</button>
						{this.props.activeSong ? (
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
export default SearchBar;