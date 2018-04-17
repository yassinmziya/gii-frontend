import React from 'react';
import Menubutton from '../buttons/menubutton.js';
import {Button} from 'semantic-ui-react';
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
		this.myCallback = this.myCallback.bind(this);
	}
	
	myCallback(pos) {
		this.props.callbackFromEntrance(pos);
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
				<Menubutton onClick={this.props.Click} 
					callbackFromHeadbar={this.myCallback}/>
				<div className="item" 
					style={{
						color:'#FFFFFF', 
						fontSize:30, 
						fontStyle:'italic', 
						margin:'auto'}}>
					Global Innovation Index
				</div>
				<div 
					style={{
						height:'100%',
						padding:'7px',
					}}	
				>
					<Button onClick={this.props.goBack} circular basic inverted icon="arrow left"/>
				</div>
			</div>
		)
	}
}

export default Head_bar;