import React, { Component } from "react";
import "./Favourites.css";
import Track from "Track";
import FavouriteList from "FavouriteList";
import {getFavourites as getFavouritesApi, deleteTrack as deleteTrackApi} from "firebaseApi";
import PropTypes from 'prop-types';

class Favourites extends Component {
	state = {
		track: null,
		favourites: null,
	};

	componentWillMount() {
		this.getFavourites();
	}

	componentDidUpdate(prevProps) {
		if (this.props.isDatabaseInit !== prevProps.isDatabaseInit) {
			this.getFavourites();
		}
	}

	getFavourites() {
        if (this.props.database && this.props.userId) {
          getFavouritesApi(this.props.database, this.props.userId)
            .then(payload => {
	            this.setState({
	            	favourites: Object.values(payload.val())
	            });
            });
        }
    }

    deleteTrack = (track) => {
    	deleteTrackApi(this.props.database, track, this.props.userId);
    }

	render() {
		return (
			<div className="favourites">{
				this.state.favourites &&
					<FavouriteList
						trackClick = {track => this.setState({track: track})}
						favourites = {this.state.favourites}
						deleteTrack = {this.deleteTrack}
					/>}

				{(this.state.track) && 
					<Track track={this.state.track} />
			}
			</div>
		);
	}
}

Favourites.propTypes = {
	userId: PropTypes.string,
}

export default Favourites;
