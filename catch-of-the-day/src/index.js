// if it's just a string, webpack thinks you are looking
// in the node modules directory for this
import React from 'react';
// import ReactDOM from 'react-dom';
// ^^^^ this would import the entire react-dom package
// we're just importing the render method from the
// package calles 'react-dom'
import { render } from 'react-dom';

// routing
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// relative path so webpack doesn't look in node_modules
// the extension is assumed, don't need the .js at the end
import App from './components/App';
import StorePicker from './components/StorePicker.js';
import NotFound from './components/NotFound.js';
// import registerServiceWorker from './registerServiceWorker';

// letting webpack compile everything and reload the page
// webpack will also include the link tag to use this in index.html
import './css/style.css';
// you can also include style sheets for each of your components


// everything in react is a component
// even the router itself is a component
const Main = () => {
	// stateless functional component
	return(
		// surface the router and make it available to this component with context in react
		    // state holds your data and props pass data from a parent to a child component
		    // context declares something at a top level
		    // and it will be made available to everything at a lower level
		<BrowserRouter>

			<Switch>
				{/* When the the url exactly matches
					the home/main page

				show the store picker component */}
				<Route exact path="/" component={StorePicker} />
				<Route path="/store/:storeId" component={App} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	)
}


// using the render method from the react-dom package
// first thing we pass it is what component we would like to render
// this is JSX since it's kinda like our own tag
// then the last thing is what DOM element it should render out to
	//render(<App />, document.querySelector('#ohHello'));

render(<Main />, document.getElementById('root'));

// registerServiceWorker();



///// Routing

// React Router 4 is not part of react, but is the industry standard
// show and hide components anywhere inside your app,
// depending if you're on the page that you wish to show them on