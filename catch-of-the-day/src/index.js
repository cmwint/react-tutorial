// if it's just a string, webpack thinks you are looking
// in the node modules directory for this
import React from 'react';
// import ReactDOM from 'react-dom';
// ^^^^ this would import the entire react-dom package
// we're just importing the render method from the
// package calles 'react-dom'
import { render } from 'react-dom';

// relative path so webpack doesn't look in node_modules
// the extension is assumed, don't need the .js at the end
import App from './components/App';
import StorePicker from './components/StorePicker.js';
import registerServiceWorker from './registerServiceWorker';

// letting webpack compile everything and reload the page
// webpack will also include the link tag to use this in index.html
import './index.css';
// you can also include style sheets for each of your components



// using the render method from the react-dom package
// first thing we pass it is what component we would like to render
// this is JSX since it's kinda like our own tag
// then the last thing is what DOM element it should render out to
render(<App />, document.querySelector('#ohHello'));

render(<StorePicker/>, document.getElementById('root'));

registerServiceWorker();
