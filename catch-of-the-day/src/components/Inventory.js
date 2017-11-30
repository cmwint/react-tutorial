import React, { Component } from 'react';
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';
import base, { app, auth, githubProvider, facebookProvider, twitterProvider } from '../base';

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

	componentDidMount () {
		// listen for when we load the page,
		// firebase is going to try and authenticate me again
		app.auth().onAuthStateChanged((user) => {
			if(user) {
				const storeRef = app.database().ref(this.props.storeId);
				storeRef.once('value', (snapshot) => {
					const data = snapshot.val() || {};
					this.authenticate(data.provider)
				})
			}
		});
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
		var providerAuth;
		switch (provider) {
		    case 'facebook':
				providerAuth = facebookProvider;
		        break;
		    case 'github':
				providerAuth = githubProvider;
		        break;
		    case 'twitter':
				providerAuth = twitterProvider;
		        break;
		}
		this.authHandler(providerAuth, provider);
	}
	
	authHandler(providerAuth, provider) {

		auth.signInWithPopup(providerAuth) 
			.then((result) => {
				const user = result.user;
				// grab the store info from firebase
				// connect with the firebase database and we can use the firebase api on it
				// ref grabs just a piece of the database
				const storeRef = app.database().ref(this.props.storeId);
				// query the firebase once for the store data
				storeRef.once('value', (snapshot) => {
					const data = snapshot.val() || {};
					// claim it as our own (if no user already)
					if(!data.owner) {
						storeRef.set({
							owner: user.uid,
							provider: provider
						});
					}
					//and then update state
					this.setState({
						uid: user.uid,
						owner: data.owner || user.uid
					});
				})
	
			// if there are errors
			}).catch(function(error) {
				// console error
				console.log(error);
			});

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
	loadSamples: PropTypes.func.isRequired,
	storeId: PropTypes.string.isRequired
}

export default Inventory;