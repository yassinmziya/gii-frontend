import React from "react"
import ReactDOM from "react-dom"
import {
	ComposableMap,
	ZoomableGroup,
	Geographies,
	Geography,
	Markers,
	Marker,
} from "react-simple-maps"
import { Motion, spring } from "react-motion"
import * as d3 from "d3-request"
import "./worldmap2.css";
const wrapperStyles = {
	width: "100%",
	display: "table",
	
}

var topofile = require('./topojson_maps/world-50m.json');
var csvfile1 = require("../country-profile/country_coordinates.csv");
var countries = [];

d3.csv(csvfile1, function(data) {
	data.forEach(function(d) {
		d.latitude = +d.latitude;
		d.longitude = +d.longitude;
		d.landarea = +d.landarea;
		countries.push(d);
	});
});


var mapStyle = {
	default: {
		fill: '#ECEECE',
		stroke: '#ECECDE',
		strokeWidth: 0,
		outline: 'none',
	},
	hover: {
		fill: '#ECECDE',
		stroke: 'transparent',
		strokeWidth: 0,
		outline: 'none',
	},
	pressed: {
		fill: '#ecefe1',
		stroke: 'transparent',
		strokeWidth: 0,
		outline: 'none',
	}
};

class AnimatedMap extends React.Component {
	constructor() {
		super()
		this.state = {
			center: [0, 0],
			zoom: 1,
		}
		this.handleZoomIn = this.handleZoomIn.bind(this)
		this.handleZoomOut = this.handleZoomOut.bind(this)
		this.handleCountryClick = this.handleCountryClick.bind(this)
	}
	handleZoomIn() {
		this.setState({
			zoom: this.state.zoom * 2,
		})
	}
	handleZoomOut() {
		this.setState({
			zoom: this.state.zoom / 2,
		})
	}
	handleCountryClick(geography) {
		console.log(geography);
		var c = geography["properties"]["name"];
		for (var i = 0; i < countries.length; i++) {
			if (countries[i]["name"] == c) {
				console.log(countries[i]);
				var scaleProp = 2*Math.sqrt(16376870.0/countries[i]["landarea"]);
				if (c == "Morocco") scaleProp = 6;
				this.setState({
					center: [countries[i]["longitude"], countries[i]["latitude"]],
					zoom: scaleProp,
				})
			}
		}
		
		ReactDOM.render(
			<h1> {c} is ranked 4th in the GII 2018</h1>, 
			document.getElementById('hola1')
		);
		ReactDOM.render(
            <p style={{
                margin: "0 auto",
                fontSize: 100,
                fontFamily: "fantasy", 
            }}
            > 4 </p>,
            document.getElementById("hola0")
		);
		ReactDOM.render(
			<div style={{
				fontSize: 20,
				fontFamily: "monospace",
			}}>
			<p> Over the last three years, {c} improved significantly in innovation
                outputs, reaching its best rank in 2017
                (5th in the world).
            </p>
            <p> On innovation inputs, {c} exhibits a
                decrease in its rank this year, dropping
                by 2 positions.
            </p>
            </div>,
			document.getElementById("hola2")
		);

	}

	render() {
		return (
			<div className='wrapper' style={wrapperStyles}>
				<button className="ScaleUp" onClick={this.handleZoomIn}>
					{"+"}
				</button>
				<button className="ScaleDown" onClick={this.handleZoomOut}>
					{"-"}
				</button>
				<Motion defaultStyle={{zoom: 1, x: 0, y: 0,}}
					style={{
						zoom: spring(this.state.zoom, {stiffness: 210, damping: 20}),
						x: spring(this.state.center[0], {stiffness: 210, damping: 20}),
						y: spring(this.state.center[1], {stiffness: 210, damping: 20}),
					}}
				>
				{({zoom, x, y}) => (
					<ComposableMap
						projectionConfig={{scale: 205}}
						width={980}
						height={551}
						style={{
							width: "100%",
							height: "auto",
						}}
					>
						<ZoomableGroup center={[x, y]} zoom={zoom}>
						<Geographies geography={topofile}>
							{(geographies, projection) => 
								geographies.map((geography, i) => (
									<Geography key={i}
										geography={geography}
										projection={projection}
										style={mapStyle}
										onClick={this.handleCountryClick}
									>
										{this.props.children}
								    </Geography>))
							}
						</Geographies>
						</ZoomableGroup>
					</ComposableMap>
					)}
				</Motion>
			</div>
		)
	}
}

export default AnimatedMap