import React from 'react';
import { getFunName } from '../helpers';

// creating first component, with ES6 classes
// capitalize all components
class StorePicker extends React.Component{
  // since you can't use this inside other methods, you can do this
      // constructor() {
      //   super();
      //   this.goToStore = this.goToStore.bind(this);
      // }
      // ^^^^ this is most used if you need to use a function more than once, performance, etc.


  goToStore(event) {
    // prevent default to stop form from refreshing the page
    event.preventDefault();
    //console.log('you changed the URL');
    // first grab the text from the input field
      //you could do something like
        // const value = $('input').val();
        // but you want to stay away from touching the DOM
        // we just modify the data and render out the JSX and are hands out with touching the DOM

      // how do we get data out of an input? with a red
      // reference the actual input
    // can't use this because it's npt explicity bound to the class, like the render funciton is
    console.log(this.storeInput.value);

    // then move the url from home page (/) to /store/:storeId
  }
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

        // "this" is in render() so it's bound to the actual class you are in, 
        // render is a method that is bound to the component
        // if you use "this" inside the render component, it will always equal the component
        <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
          {/* this.goToStore.bind(this) will bind goToStore to this */}
          {/* or you can do it like this with the pointer function ^^^^ */}

          {/* This is a comment in JSX yay! */}
          {/* But you can't return a comment at the top level */}
          {/* They can either go inside or below! */}
          <h2>Please Enter a Store</h2>
          <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input }} />
          {/* react is phasing out string refs in favor of function refs */}
          {/*
            function react = when the input is rendered on to the page, it's going to
            put a reference to the input on the class itself
            - reference to the element in the dom
           */}
          <button type="submit">Visit Store ></button>

        </form>
        // listening for onClick and onSubmit in jQuery,
        // it's similar in react! the only difference is that they
        // wrap them in this cross browser wrapper called SyntheticEvent


        // you must self enclose your tags in JSX (img, hr, br, input)

          // you can only return 1 parent element!!!
          // adjacent JSX elements must be wrapped in a single element
              //<div></div>
          // so you can't do this ^^^^
      )
  }
}

export default StorePicker;