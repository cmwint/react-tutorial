// it is best practice to put each of our components into separate files
// with ES6 modules, you need to import everything that you need in this file
// meaning, you have to import react into every component file

import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';


class App extends Component {

// using state, tie state to a parent (App) and use the same data with the child components
// getting initial state and telling react about it
  constructor() {
    super(); // can not use "this" without calling super first because the react component needs to re initialized

    this.addFish = this.addFish.bind(this);
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

          </div>
          {/* This will actually be a component called Order */}
          <Order />
          {/* This will actually be a component called Inventory */}
          <Inventory addFish={this.addFish}/>
      </div>
    );
  }
}

// allows us to import this component into the index.js file on line
// where it says import App from './App';
export default App;