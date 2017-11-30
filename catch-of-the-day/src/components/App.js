// it is best practice to put each of our components into separate files
// with ES6 modules, you need to import everything that you need in this file
// meaning, you have to import react into every component file

import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import PropTypes from 'prop-types';

import base from '../base';

class App extends Component {

// using state, tie state to a parent (App) and use the same data with the child components
// getting initial state and telling react about it
  constructor() {
    super(); // can not use "this" without calling super first because the react component needs to re initialized

    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    this.state = {
      // get initial state
      fishes: {},
      order: {},
      // we have two empty objects in state that will hold the data
    };
  }

  // react lifecycle methods - 
  // entry points into a component where we can hook into and do various things
  componentWillMount() {
    // this runs right before the app is rendered
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`
      , {
      context: this,
      state: 'fishes'
    });
    // check if there is any order in localstorage
    const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);
    if(localStorageRef) {
      // update app component/s order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }
  // to make sure it's not racking up all these listeners behind the scene
  componentWillUnmount() {
    // after it's all loaded
    base.removeBinding(this.ref);
    // putting the sync state in the ref up above so we can remove it later
  }

  // runs everytime props or state is updated
  // our order is state, and that is passed down via props
  componentWillUpdate(nextProps, nextState) {
    // passing in the updated props and updated state

    // trick to name, pass in curly bracket object will name them
    // console.log({nextProps, nextState});

    // local storage is a key value pair, like an object. but you can't nest in there
    localStorage.setItem(`order-${this.props.match.params.storeId}`, JSON.stringify(nextState.order))
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

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({fishes});
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

   removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
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
          <Order
            fishes={this.state.fishes}
            order={this.state.order}
            params={this.props.match.params}
            removeFromOrder={this.removeFromOrder}
          />
          {/* This will actually be a component called Inventory */}
          <Inventory
            addFish={this.addFish}
            removeFish={this.removeFish}
            loadSamples={this.loadSamples}
            fishes={this.state.fishes}
            updateFish={this.updateFish}
            storeId={this.props.match.params.storeId}
          />
      </div>
    );
  }
}

App.propTypes = {
  params: PropTypes.object
}

// allows us to import this component into the index.js file on line
// where it says import App from './App';
export default App;