import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import ReactDOM from "react-dom";
import My_sidebar from './My_sidebar.js';
//import './components/page-router/pagerouter.js';
import Route from 'react-router-dom/Route';
import { spring, AnimatedSwitch, AnimatedRoute } from 'react-router-transition';
import Sample from './components/country-profile/sample_profile.js';
import Router from 'react-router-dom/BrowserRouter';
import Sample2 from './components/country-profile/sample2.js';
import Worldmap from './components/map/worldmap.js';
import {Motion} from 'react-motion';
/**
Main App component. Main function is to route between entrance page to other pages
like country profile. Several components are used and have a little confused hierachy.
Please see the hierachy.txt to check how components communicate with each other.
*/
class App extends React.Component {
	constructor(props) {
		super(props);
		this.mapStyles = this.mapStyles.bind(this);
		this.bounce = this.bounce.bind(this);
		this.glide = this.glide.bind(this);
	}
	
	mapStyles(styles) {
		return {
			opacity: styles.opacity,
			transform: styles.scale,
		}
	}
	
	bounce(val) {
		return spring(val, {
			stiffness: 330,
			damping: 22,
		});
	}
	
	glide(val) {
		return spring(val, {
			stiffness: 174,
			damping: 24,
		});
	}
	
	render() {
		return (
			<div className="Container1">
				<Router>
				<div>
					<AnimatedSwitch
					  atEnter={{
						offset: 100,
						}}
					  atLeave={{
						  offset: this.glide(-100),
						}}
					  atActive={{
						  offset: this.glide(0),
						}}
					  mapStyles={styles => ({
						  transform: `translateX(${styles.offset}%)`
					  })}>
						<Route exact path="/entrance" component={Sample2} />
						<Route path="/sample1" component={Sample}/>
					</AnimatedSwitch>
					
				</div>
				</Router>
			</div>
		);
	}
}
	
export default App;