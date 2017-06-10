import React from 'react';
import { getFunName } from '../helpers';

// creating first component, with ES6 classes
// capitalize all components
class StorePicker extends React.Component{
  // every component that you build needs at least one method,
  // and that's the render method
  // it tells the component what html to display
  // similar to `function render(){}`
  render(){
    // inside, we're going to return JSX
    // JSX allows us to write HTML write in the javascript
    // it's not required, but pretty much everyone uses it
    	// return <p>hello</p>

  // this is an alternative to JSX
      // return React.createElement('p', {className: 'Testing'}, 'I love cheese');

      // however, when you return from a render method,
      // you are most likely going to be writing mulitples lines of code
      // so you put a pair of parentethese around so you can write many codes
      return(
        // class is a reserved word so you have to use className
        <form className="store-selector">
          {/* This is a comment in JSX yay! */}
          {/* But you can't return a comment at the top level */}
          {/* They can either go inside or below! */}
          <h2>Please Enter a Store</h2>
          <input type="text" required placeholder="Store Name" defaultValue={getFunName()} />
          <button type="submit">Visit Store ></button>

        </form>
        // you must self enclose your tags in JSX (img, hr, br, input)

          // you can only return 1 parent element!!!
          // adjacent JSX elements must be wrapped in a single element
              //<div></div>
          // so you can't do this ^^^^
      )
  }
}

export default StorePicker;