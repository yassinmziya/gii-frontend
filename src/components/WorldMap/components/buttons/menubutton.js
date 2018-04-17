import React from 'react';
import Link from 'react-router-dom/Link';
import My_sidebar from '../../My_sidebar.js';
/**
This is the Menubutton component, which is a subcomponent
of Head_bar. Menubutton has its subcomponent My_sidebar.
*/
class Menubutton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebarStyle: {
				position: 'absolute',
				left: -256,
				top: 50,
				borderRightStyle: 'solid',
				borderRightWidth: 2,
				backgroundColor: 'grey',
			},
			baropen: false,
		};
		this.buttonClick = this.buttonClick.bind(this);
		this.myCallback = this.myCallback.bind(this);
	}
	
	buttonClick() {
		if (this.state.baropen == false) {
			this.setState((prevState) => (
			{sidebarStyle: {
				position: 'absolute',
				left: 0,
				top: 50,
				borderRightStyle: 'solid',
				borderRightWidth: 2,
				backgroundColor: 'grey',
			},
			baropen: true,}));
		}
		if (this.state.baropen == true) {
			this.setState((prevState) => (
			{sidebarStyle: {
				position: 'absolute',
				left: -256,
				top: 50,
				borderRightStyle: 'solid',
				borderRightWidth: 2,
				backgroundColor: 'grey',
			},
			baropen: false,}));
		}
	}
	
	myCallback(pos) {
		this.props.callbackFromHeadbar(pos);
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
				<My_sidebar style={this.state.sidebarStyle} 
					callbackFromMenubutton={this.myCallback}/>
			</div>
		);
	}
}

export default Menubutton;