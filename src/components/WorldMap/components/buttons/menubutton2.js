import React from 'react';
//axios npm
import Link from 'react-router-dom/Link';
import My_sidebar from '../../My_sidebar.js';

class Menubutton2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebarStyle: {},
		};
		this.buttonClick = this.buttonClick.bind(this);
	}
	
	buttonClick() {
		this.setState((prevState) => (
		{sidebarStyle: {
			position: 'absolute',
			left: -256,
			top: 50,
		}}
		));
	}
	
	render() {
		var svg_style = {
			width: 40,
			height: 40,
			backgroundColor: 'black',
			marginTop: 10,
			marginLeft: 10
			
		};
		var rect_style = {
			width: 40,
			height: 8,
			backgroundColor: 'white',
			marginTop: 4,
		};
		
		return (
			<div>
				<svg style={svg_style} onClick={this.buttonClick}>
				<path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'
				 stroke='#FFFFFF' fill='white'></path>
				</svg>
			</div>
		);
	}
}

export default Menubutton2;