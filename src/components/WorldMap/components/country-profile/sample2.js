import React from "react";
import Link from 'react-router-dom/Link';
import Worldmap from '../map/worldmap.js';
//import Head_bar from '../head-bar/Head_bar.js'
/**
This is the sample page for our entrance, it contains
components: Worldmap, Head_bar. Adding components
into the render function can bring more components to the first page.
*/

class Sample2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			center: [0, 0],
		};
		this.flagClick = this.flagClick.bind(this);
	}
	
	flagClick(pos) {
		this.setState((prevState) => {
			return {
				// The coordinates are the real world coordinates for each country.
				center: pos,
			}
		});
	}
	
	render() {
		
		return (
			<div className="EntrancePage">
				
				<Worldmap center={this.state.center}/>
			</div>
		);
	}
}
 
export default Sample2;
