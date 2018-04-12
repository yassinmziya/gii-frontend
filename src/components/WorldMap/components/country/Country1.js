import React from 'react';
/**
This is the country1 component, which is the subcomponent
of countrycontainer. This component may be used many times
to represent each country. And the country name and flag 
image should be passed from countrycontainer.
*/
class Country1 extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick() {
		//Click this country to show the profile
	}
	
	render() {
		var address = require('../../images/sweden.PNG');
		var img_style = {
			width: 200,
			height: 125,
			marginTop: 20,
			marginLeft: 28,
			marginRight: 28,
		};
		var text_style = {
			color: 'white',
			fontSize: 18,
			fontStyle:'italic',
			marginTop: 10,
			marginBottom: 10
			
		};
		return (
			<div 
				className={this.props.fullName }
				style={{
					width:256, 
					height:200, 
					textAlign:'center'}}
				onClick={this.props.click}
			>
			<img 
				src={address} 
				style={img_style}/>
			<div 
				className="countryName" 
				style={text_style}
			>
				{this.props.fullName}
			</div>
			</div>
		)
	}
}

export default Country1;