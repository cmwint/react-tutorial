// it is best practice to put each of our components into separate files
// with ES6 modules, you need to import everything that you need in this file
// meaning, you have to import react into every component file

import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';


class App extends Component {

// using state, tie state to a parent (App) and use the same data with the child components
// getting initial state and telling react about it
  constructor() {
    super(); // can not use "this" without calling super first because the react component needs to re initialized

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    this.state = {
      // get initial state
      fishes: {},
      order: {},
      // we have two empty objects in state that will hold the data
    };
  }
  // method on the app
  addFish(fish) {
    // update the state - not so easy!
      // when you want to update state, you need to first take a copy of the state
    const fishes = {...this.state.fishes};
      // ... the triple dots are a spreac
      // the line above takes every item from the object and spread it into the new object
      // it just takes a copy
    // then add in new fish
    const timestamp = Date.now();
    fishes[`fish${timestamp}`] = fish;

    // we have a new object of fishes, but now we need to set it to the actual state
    // set state
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

   addToOrder(key) {
    // take a copy of state
    const order = {...this.state.order}; //object spread
    // update or add new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update state
    this.setState({
      order: order
    })
   }

  render() {
    return (
      <div className="catch-of-the-day">
          <div className="menu">
            {/* This will actually be a component called Header */}
            {/* tagline is like a variable, you can get this value now in the header component */}
            {/* these are props!! */}
            <Header tagline="Fresh Seafood Market" />

            {/* prop types allows you to validate that data is passed and that data that is passed is the correct type (num, string, function) */}
            {/* prop types help you to make really ridge components */}
            <ul className="list-of-fishes">
              {/* No logic or any kinds of loops in JSX, so just use JS */}
              {/* curly brackets tell react we'll be doing javascript */}
              {/* .map is for an array */}
              {
                Object
                  .keys(this.state.fishes) // returns all of the property names from an object
                  // then I can loop over that with .map
                  // index prop is for you, key prop is for react, you should never touch key
                  .map(key => <Fish key={key} index={key} details={this.state.fishes[key] } addToOrder={this.addToOrder}/>) // the arrow function will return the fish component for each in the array
              }
            </ul>
          </div>
          {/* This will actually be a component called Order */}
          <Order fishes={this.state.fishes} order={this.state.order}/>
          {/* This will actually be a component called Inventory */}
          <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    );
  }
}

// allows us to import this component into the index.js file on line
// where it says import App from './App';
export default App;