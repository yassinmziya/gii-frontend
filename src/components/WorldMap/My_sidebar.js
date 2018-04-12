import React from 'react';
import Sidebar from 'react-sidebar';
import Head_bar from './components/head-bar/Head_bar.js'
import Countrycontainer from './components/country/Countrycontainer.js'
import Worldmap from './components/map/worldmap.js';
import {Motion, spring} from 'react-motion';
import Sample from './components/country-profile/sample_profile.js';
/**
The sidebar component, which is subcomponent of menubutton.
*/
class My_sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var svg_style = {
			width: 40,
			height: 40,
			backgroundColor: 'black',
			marginTop: 10,
			marginLeft: 10
			
		};
		return (
			<div className="sidebar" 
			style={this.props.style}>
				<div className="sidebar_head" 
					style={{
						display:'flex', 
						width:256, 
						height:50, 
						backgroundColor:'black',
					}} >
					<div className="head_name" 
						style={{
							color:'#FFFFFF', 
							fontSize:20, 
							fontStyle:'italic', 
							margin:'auto'
						}} >
						Select Country
					</div>
				</div>
				<Countrycontainer flagClick={this.props.flagClick}/>
			</div>
		);
	}
}

export default My_sidebar;


