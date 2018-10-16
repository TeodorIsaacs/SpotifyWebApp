import React, { Component } from "react";
import PropTypes from 'prop-types';
import "ErrorComponent.css";

class ErrorComponent extends Component {

	getErrorText(){
		switch(this.props.errorCode){
		case 401:
			return (
				<React.Fragment>
					<p className="error-text">We don't have access to your account yet, please login here</p>
					<a className="redirect-button" href="http://localhost:8888">Login</a>
				</React.Fragment>
			)

		case 404: 
			return <p className="error-text">The page you're looking for does not exist</p>

		default:
			return <p>Something went wrong</p>;
		}
	}

	render() {
		return (
			<div className="error-component">
				<h2 className="error-title">Error</h2>
				<h1 className="error-code">{this.props.errorCode}</h1>
				{this.getErrorText()}
			</div>
		)
	}
}

ErrorComponent.propTypes = {
	errorCode: PropTypes.number.isRequired,
}

export default ErrorComponent;