import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "Header.css";

class Header extends Component{

	render(){
		return(
			<header>
				<Link className="app-title" to="/search">
					MusicBois
				</Link>
			</header>
		)
	}
}

export default Header;
