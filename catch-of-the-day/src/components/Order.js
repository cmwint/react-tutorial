import React, { Component } from 'react';
import { formatPrice } from '../helpers.js';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Order extends Component{
	constructor() {
		super();
		this.renderOrder = this.renderOrder.bind(this);
	}

	renderOrder(key) {
		const fish = this.props.fishes[key];
		const count = this.props.order[key];
		const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

		if(!fish || fish.status === 'unavailable') {
			return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available! {removeButton}</li>
		}

		return(
			<li key={key}>
				<span>
					<CSSTransitionGroup
						component="span"
						className="count"
						transitionName="count"
						transitionEnterTimeout={10000}
						transitionLeaveTimeout={10000}
					>
						{/* every time you have a key */}
						{/* of two elements that are beside each other */}
						{/* they need to have a unique key */}
						<span key={count}>
							{count}
						</span>
					</CSSTransitionGroup>
					lbs {fish.name} {removeButton}
				</span>
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

				<CSSTransitionGroup
					className="order"
					component="ul" // still going to kick out an unordered list
					transitionName="order"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
					// this is creating class on enter and leave that we can hook into with styles
				>
					{orderIds.map(this.renderOrder)}
					<li className="total">
						<strong>Total:</strong>
						{formatPrice(total)}
					</li>
				</CSSTransitionGroup>

			</div>
		)
	}
}

export default Order;