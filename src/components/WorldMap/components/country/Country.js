import React from 'react';

class Country extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			props.flag: '',//image address
			props.fullName: '',
			props.iso3: ''
			//More states in future
		};
		
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick() {
		//Click this country to show the profile
	}
	
	render() {
		return (
			<div className=fullName 
			style={{display:'flex', width:180, height:200, backgroundColor:'white'}}>
			<img src={ require(flag) }/>
			<p>{this.props.fullName}</p>
			</div>
		)
	}
}

export default Country;