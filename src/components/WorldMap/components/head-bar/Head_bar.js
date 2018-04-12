import React from 'react';
import Menubutton from '../buttons/menubutton.js';
/**
The headbar component, contains menubutton as its
subcomponent.
*/
class Head_bar extends React.Component {
	constructor(props) {
		super(props);
		/**Add more controllers states if 
		*more head bar buttons added
		*/
	}
	
	render() {
		var svg_style = {
			width: 40,
			height: 40
		};
		var rect_style = {
			width: 40,
			height: 8,
			color: 'white',
			marginTop: 4,
		};
		return (
			<div className="upper_bar" 
				style={{
					display:'flex', 
					width:'auto', 
					height:50, 
					backgroundColor:'black'}}>
				<Menubutton onClick={this.props.Click} flagClick={this.props.flagClick}/>
				<div className="item" 
					style={{
						color:'#FFFFFF', 
						fontSize:30, 
						fontStyle:'italic', 
						margin:'auto'}}>
					Global Innovation Index
				</div>
			</div>
		)
	}
}

export default Head_bar;