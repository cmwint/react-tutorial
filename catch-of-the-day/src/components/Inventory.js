import React, { Component } from 'react';
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';
import base, { auth, githubProvider, facebookProvider, twitterProvider } from '../base';

class Inventory extends Component{
	constructor() {
		super();
		this.renderInventory = this.renderInventory.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.state = {
			uid: null,
			owner: null
		}
	}

	// if i use this in a method that I make up, I need to bind it to the actual component itself
	handleChange(e, key) {
		const fish = this.props.fishes[key];
		// console.log(fish);

		// take a copy of the fish and update it with the new data
		// overlay the new properties on it
		// overwite whatever got changed
		const updatedFish = {
			...fish,
			// computed property
			[e.target.name]: e.target.value
		}
		// pass that up to the update fish function 
		this.props.updateFish(key, updatedFish);
	}

	authenticate(provider) {
		//console.log(`Trying to log in with ${provider}`);
		// base.authWithOAuthPopup(provider, this.authHandler);

		var providerAuth;
		if(provider === 'facebook') {
			providerAuth = facebookProvider;
		}else if(provider === 'github') {
			providerAuth = githubProvider;
		}else if(provider === 'twitter') {
			providerAuth = twitterProvider;
		}

		// var auth = base.auth();

		// var provider = new base.auth.TwitterAuthProvider();
		auth.signInWithPopup(providerAuth) 
		    .then((result) => {
		      const user = result.user;
		      this.setState({
		        user
		      });
		    });
	}
	authHandler(err, authData) {
		console.log(authData);
	}

	renderLogin() {
		return (
			<nav className="login">
				<h2>Inventory</h2>
				<p>Sign in to mnage your store's inventory</p>
				<button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
				<button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
				<button className="twitter" onClick={() => this.authenticate('twitter')}>Log In with Twitter</button>
			</nav>
		)
	}

	renderInventory(key) {
		const fish = this.props.fishes[key];
		// if you put state in an input box, also provide some sort of instruction on how to update that state
		// it wants one core area where state is coming from, wants to keep everything in sync
		return(
			<div className="fish-edit" key={key}>
				<input type="text" name="name" value={fish.name} placeholder="Fish name" onChange={(e) => this.handleChange(e, key)}/>
				<input type="text" name="price" value={fish.price} placeholder="Fish price" onChange={(e) => this.handleChange(e, key)}/>
				<select type="text" name="status" value={fish.status} placeholder="Fish status" onChange={(e) => this.handleChange(e, key)}>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold out!</option>
				</select>
				<textarea type="text" name="desc" value={fish.desc} placeholder="Fish desc" onChange={(e) => this.handleChange(e, key)}></textarea>
				<input type="text" name="image" value={fish.image} placeholder="Fish image" onChange={(e) => this.handleChange(e, key)}/>
				<button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
			</div>
		)
	}
	render(){
		const logout = <button>Log out!</button>

		// check if no one is logged in
		if(!this.state.uid) {
			return <div>{this.renderLogin()}</div>
		}

		// check if they are the current owner of the store
		if(this.state.uid !== this.state.owner) {
			return (
				<div>
					<p>Sorry, you aren't the owner of the store!</p>
					{logout}
				</div>
			)
		}

		return(
			<div>
				<h2>Inventory</h2>
				{logout}
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				<AddFishForm addFish={this.props.addFish}/>
				{/* the addFish method is available via props */}
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
	}
}

Inventory.propTypes = {
	fishes: PropTypes.object.isRequired,
	updateFish: PropTypes.func.isRequired,
	removeFish: PropTypes.func.isRequired,
	addFish: PropTypes.func.isRequired,
	loadSamples: PropTypes.func.isRequired
}

export default Inventory;