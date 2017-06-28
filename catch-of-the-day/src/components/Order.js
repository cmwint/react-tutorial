import React, { Component } from 'react';
import { formatPrice } from '../helpers.js'

class Order extends Component{
	constructor() {
		super();
		this.renderOrder = this.renderOrder.bind(this);
	}

	renderOrder(key) {
		const fish = this.props.fishes[key];
		const count = this.props.order[key];

		if(!fish || fish.status === 'unavailable') {
			return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available!</li>
		}

		return(
			<li key={key}>
				<span>{count}lbs {fish.name}</span>
				<span className="price">{formatPrice(count * fish.price)}</span>
			</li>
		)
	}

	render(){
		const orderIds = Object.keys(this.props.order);
		// reduce() = loop over an array and add a whole bunch of things
		// or just return a new something, like array or object
		const total = orderIds.reduce((prevTotal, key) => {
			const fish = this.props.fishes[key]; // specific fish you are getting
			const count = this.props.order[key]; // how many did they buy
			const isAvailable = fish && fish.status === 'available'; // is that fish available
			// then just add it up
			if(isAvailable) {
				return prevTotal + (count * fish.price || 0) //
			}
			return prevTotal;
		}, 0); // start with a starting value
		return(
			<div className="order-wrap">
				<h2>Your Order</h2>
				<ul className="Order">
					{orderIds.map(this.renderOrder)}
					<li className="total">
						<strong>Total:</strong>
						{formatPrice(total)}
					</li>
				</ul>
			</div>
		)
	}
}

export default Order;