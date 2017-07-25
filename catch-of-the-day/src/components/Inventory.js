import React, { Component } from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends Component{
	constructor() {
		super();
		this.renderInventory = this.renderInventory.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
			</div>
		)
	}
	render(){
		return(
			<div>
				<h2>Inventory</h2>

				{Object.keys(this.props.fishes).map(this.renderInventory)}

				<AddFishForm addFish={this.props.addFish}/>
				{/* the addFish method is available via props */}
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
	}
}

export default Inventory;