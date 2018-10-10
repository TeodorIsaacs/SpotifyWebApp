import React, { Component } from 'react';
import "Header.css";

class Header extends Component{

	render(){
		return(
			<header className="App-header">
				<a className="App-title" href={"/search"}>
					<h1 > MusicBois </h1>
				</a>
			</header>
		)
	}
}

export default Header;
