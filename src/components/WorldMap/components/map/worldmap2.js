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
import * as bababa from "d3"
import "./worldmap2.css";
import Axios from "axios";

var prefix = "http://localhost:3001/api";

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

var svg = bababa.select("svg");
console.log(svg);

//var width = +svg.attr('width');

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
	constructor(props) {
		super(props)
		this.state = {
			center: [0, 0],
			zoom: 1,
			countryISO3: "",
			countryName: "",
			rank: 0,
		}
		this.handleZoomIn = this.handleZoomIn.bind(this)
		this.handleZoomOut = this.handleZoomOut.bind(this)
		this.handleCountryClick = this.handleCountryClick.bind(this)
		this.getRank = this.getRank.bind(this)
	}

    getRank(countryISO3) {
    	Axios.get(prefix + `/v1/data/${this.state.countryISO3}/2017`).then((response, prevState) => {
    		const rank = response.data.data.GIIrank;
    		this.setState((prevState) => ({
    			rank: rank,
    		}), () => {
    			console.log("rank", this.state.rank);
    			ReactDOM.render(
    				<h1> {this.state.countryName} is ranked {this.state.rank} in the GII 2017</h1>, 
    				document.getElementById('hola1'));
    			ReactDOM.render(
		            <p style={{
		                margin: "0 auto",
		                fontSize: 100,
		                fontFamily: "fantasy", 
		            }}
		            > {this.state.rank} </p>,
		            document.getElementById("hola0")
				);
				ReactDOM.render(
					<div style={{
						fontSize: 20,
						fontFamily: "monospace",
					}}>
					<p> Over the last three years, {this.state.countryName} improved significantly in innovation
		                outputs, reaching its best rank in 2017
		                (5th in the world).
		            </p>
		            <p> On innovation inputs, {this.state.countries} exhibits a
		                decrease in its rank this year, dropping
		                by 2 positions.
		            </p>
		            </div>,
					document.getElementById("hola2")
				);
				/**
				ReactDOM.render(
				    <div>
				    <Motion defaultStyle={{zoom: 1, x: 0, y: 0}} 
				        style={{
				        	zoom: spring(this.state.zoom, {stiffness: 210, damping: 20}),
				        	x: spring(this.state.center[0], {stiffness: 210, damping: 20}),
				        	y: spring(this.state.center[1], {stiffness: 210, damping: 20}),
				        }}
				    >
				      <Marker marker={{coordinates: this.state.center}}>
				        <circle cx={0} cy={0} r={10} />
				      </Marker>
				    </Motion>
				    </div>, 
				    document.getElementById("hola3")
				);
				*/
    		});
    	});
    	
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
		const ISO3 = geography["id"];
		//console.log(ISO3);
		for (var i = 0; i < countries.length; i++) {
			if (countries[i]["name"] == c) {
				//console.log(countries[i]);
				var scaleProp = 2*Math.sqrt(16376870.0/countries[i]["landarea"]);
				if (c == "Morocco") scaleProp = 6;
				this.setState({
					center: [countries[i]["longitude"], countries[i]["latitude"]],
					zoom: scaleProp,
					countryISO3: ISO3,
					countryName: c,
				}, () => { 
					this.getRank(ISO3);
					//console.log(rank);
				})
			}
		}
		
		

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
				<Motion id="hola3" defaultStyle={{zoom: 1, x: 0, y: 0,}}
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