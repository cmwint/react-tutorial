import React, { Component } from 'react';

class Header extends Component{
	render(){
		// $r also is equal to the current component
		// $0 works for regular javacript
		console.log(this);
		return(
			<header className="top">
				<h1>
					Catch
					<span className="ofThe">
						<span className="of">of</span>
						<span className="the">the</span>
					</span>
					Day
				</h1>
				<h3 className="tagline">
					<span>{this.props.tagline}</span>
				</h3>
				{/* this refers to the class, so Header */}
				{/* props is the object that is available to us, contains all the data that I want to use */}
				{/* tagline is the key in the props object that we can call */}
			</header>
		)
	}
}

export default Header;