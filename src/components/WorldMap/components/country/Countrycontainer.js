import React from 'react';
import Country1 from './Country1.js';
/**
This is the countrycontainer component, which is used
for country flags display.
*/
class Countrycontainer extends React.Component {	
	render() {
		return (
			<Country1 
				fullName='Sweden' 
				click={this.props.flagClick}/>
		);
	}
}

export default Countrycontainer;

