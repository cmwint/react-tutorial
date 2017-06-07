// it is best practice to put each of our components into separate files
// with ES6 modules, you need to import everything that you need in this file
// meaning, you have to import react into every component file

import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends Component {
  render() {
    return (
      <div className="catch-of-the-day">
          <div className="menu">
            {/* This will actually be a component called Header */}
            <Header />
          </div>
          {/* This will actually be a component called Order */}
          <Order />
          {/* This will actually be a component called Inventory */}
          <Inventory />
      </div>
    );
  }
}

// allows us to import this component into the index.js file on line
// where it says import App from './App';
export default App;
