import React from 'react';

class Displaychart extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var displayWindowStyle = {
			// display: 'table',
			marginLeft: 300,
			//width: 700,
			//padding: 20,
			backgroundColor: 'white',
		};

		return (
			<div className="displayWindow" style={displayWindowStyle}>
				{this.props.children}
			</div>
		);
	}
}

export default Displaychart;
