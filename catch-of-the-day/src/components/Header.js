import React from 'react';

// if you're just using the component to render html,
// just use a "stateless functional component"
	//class Header extends Component{
	// so you don't need this ^^^^

// instead do this
// create a variable called Header and stick that in an arrow function

	// or it could also be "var Header = function(){}"
	// or it could also be "function Header(){}"
const Header = (props) => {
	// any props that are going to be used for this
	// stateless function component will be passed in as (props)

	// $r also is equal to the current component
	// $0 works for regular javacript
	// console.log(this);
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
				{/* <span>{this.props.tagline}</span> */}
				{/* after making this a stateless functional component */}
				{/* (this) isn't bound to anything, it's not part of react */}

				{/* the props will be passed in directly now */}

				<span>{props.tagline}</span>
			</h3>
			{/* this refers to the class, so Header */}
			{/* props is the object that is available to us, contains all the data that I want to use */}
			{/* tagline is the key in the props object that we can call */}
		</header>
	)

}

export default Header;