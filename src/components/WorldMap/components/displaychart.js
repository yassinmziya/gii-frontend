import React from 'react';

class Displaychart extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		var displayWindowStyle = {
			display: 'table',
			width: 800,
			height: 600,
			padding: 20,
			margin: 'auto',
			backgroundColor: 'grey',
		};
		
		return (
			<div className="displayWindow" style={displayWindowStyle}>
				{this.props.children}
			</div>
		);
	}
}

export default Displaychart;