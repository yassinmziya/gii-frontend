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
import ContextDisplayBox from "../map/ContextDisplayBox";

var prefix = "http://localhost:3001/api";

var wrapperStyles = {
	float: "left",
	width: "100%",
	height: 580,
	display: "inner-block",
	transition: "width .25s",
	boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
	
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
			display_width1: "100%",
			display_width2: "50%",
			region: "",
			region_rank: 0,
			input_score: 0,
			input_rank: 0,
			output_score: 0,
			output_rank: 0,
			incomegroup: "",
			incomegroup_rank: 0,

		}
		this.handleZoomIn = this.handleZoomIn.bind(this)
		this.handleZoomOut = this.handleZoomOut.bind(this)
		this.handleCountryClick = this.handleCountryClick.bind(this)
		this.getRank = this.getRank.bind(this)
		this.handleMouseEnter = this.handleMouseEnter.bind(this)
		this.handleCleanClick = this.handleCleanClick.bind(this)
	}

	handleMouseEnter() {
		document.body.style.overflowY = "hidden";
	}
	handleMouseLeave() {
		document.body.style.overflowY = "auto";
		console.log("eh");
	}

	handleMouseScroll(event) {
		
		if (event.deltaY<0) {
			this.setState({
				zoom: this.state.zoom * 2,
			});
		}
		if (event.deltaY > 0) {
			this.setState({
				zoom: this.state.zoom / 2,
			});
		}
	}

    getRank(countryISO3) {
    	Axios.get(prefix + `/v1/data/iso3`)
    	.then((response) => {
    		if (Object.keys(response.data[0]).includes(countryISO3)) {
    			Axios.get(prefix + `/v1/data/summary/${this.state.countryISO3}/2017`).then((response) => {
	    		const rank = response.data.GII.rank;
	    		var region = response.data.region.name;
	    		var region_rank = response.data.region.rank;
	    		var input_rank = response.data.input.rank;
	    		var input_score = response.data.input.score;
	    		var output_score = response.data.output.score;
	    		var output_rank = response.data.output.rank;
	    		var incomegroup = response.data.incomeGroup.name;
	    		var incomegroup_rank = response.data.incomeGroup.rank;
	    		
	    		this.setState((prevState) => ({
	    			rank: rank,
	    			region: region,
	    			region_rank: region_rank,
	    			input_score: input_score,
	    			input_rank: output_rank,
	    			output_score: output_score,
	    			output_rank: output_rank,
	    			incomegroup: incomegroup,
	    			incomegroup_rank: incomegroup_rank,

	    		}), () => {
	    			console.log("rank", this.state.rank);
	    			ReactDOM.render(
	    				<h1 style={{fontSize: 36,}}> 
	    					{this.state.countryName} is ranked {this.state.rank} in the GII 2017
	    				</h1>, document.getElementById('hola1')
	    			);
	    			ReactDOM.render(
			            <p style={{
			                margin: "0 auto",
			                fontSize: 100,
			                fontFamily: "fantasy", 
			            }}
			            > {this.state.rank} </p>, document.getElementById("hola0")
			        );
			        ReactDOM.render(
			        	<div style={{fontSize: 20, fontFamily: "monospace", display: "flex", flexWrap: "wrap",}}>
			        		<div className="region" style={{width: "100%", marginBottom: 20, marginLeft: 20}}><h2>Region: {this.state.region}</h2></div>
			        		<div className="listName" style={{width:"33%", marginLeft: 20,}}>
					        	<p><li>Input Score</li></p>
					        	<p><li>Input Rank</li></p>
					        	<p><li>Output Score</li></p>
					        	<p><li>Output Rank</li></p>
					        	<p><li>Region Rank</li></p>
					        	<p><li>Income Group</li></p>
					        	<p><li>Group Rank</li></p>
				        	</div>
				        	<div className="listView" style={{width:"40%", marginLeft: 20,}}>
				        		<p><svg style={{width: 300, height: 20.43}}>
				        			    <rect x="0" y="4" style={{width: this.state.input_score*3, height: 22}}/>
				        			    <text x={this.state.input_score*3+5} y="19" fill="#f7f3f3">{this.state.input_score}</text>
				        		   </svg>
				        		</p>
				        		<p><svg style={{width: 300, height: 22}}>
				        				<text x="0" y="19" fill="black">{this.state.input_rank}</text>
				        			</svg>
				        		</p>
				        		<p><svg style={{width: 300, height: 20.43}}>
				        		        <rect x="0" y="4" style={{width: this.state.output_score*3, height: 22}}/>
				        		        <text x={this.state.output_score*3+5} y="19" fill="#f7f3f3">{this.state.output_score}</text>
				        		    </svg>
				        		</p>
				        		<p><svg style={{width: 300, height: 20.43}}>
				        				<text x="0" y="19" fill="black">{this.state.output_rank}</text>
				        			</svg>
				        		</p>
				        		<p><svg style={{width: 300, height: 20.43}}>
				        				<text x="0" y="19" fill="black">{this.state.region_rank}</text>
				        			</svg>
				        		</p>
				        		<p><svg style={{width: 300, height: 20.43}}>
				        				<text x="0" y="19" fill="black">{this.state.incomegroup}</text>
				        			</svg>
				        		</p>
				        		<p><svg style={{width: 300, height: 20.43}}>
				        				<text x="0" y="19" fill="black">{this.state.incomegroup_rank}</text>
				        			</svg>
				        		</p>
				        	</div>
				        </div>, document.getElementById("hola2")	
			        );
			    });
			});
	    	} 
	    	else {
	    		alert("This economy, " + this.state.countryISO3 + " does not have GII data.");
	    		document.getElementById("hola3").style.opacity = 0;
	    		document.getElementsByClassName("wrapper")[0].style.width = "100%";
				ReactDOM.render(
					<div className="I_am_hidding" />,
					document.getElementById("hola3")
				);
	    	}
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
	handleCleanClick() {
		document.getElementById("hola3").style.opacity = 0;
	    document.getElementsByClassName("wrapper")[0].style.width = "100%";
		ReactDOM.render(
			<div className="I_am_hidding" />,
			document.getElementById("hola3")
		);
	}
	handleCountryClick(geography) {
		var box1 = document.getElementsByClassName("wrapper");
		box1[0].style.width = "50%";
		document.getElementById("hola3").style.opacity = 1;
		ReactDOM.render(
			<ContextDisplayBox>
		      	<div className="rankNumber" id="hola0" style={{
                    width: "fit-content",
                    height: 130,
                    marginRight: 10,
		        }}>
		      	</div>
				<div className="countryName" id="hola1" style={{
					width: 380,
					height: 103,
					marginTop: 27,
				}}
				>
				</div>
				<button id="cleanBrief" onClick={this.handleCleanClick}>
					<svg style={{width: 20, height: 10,}}><path d="M2 6 L6 10 L6 8 L12 8 L16 4 L6 4 L6 2" /></svg>
				</button>
				<div className="breifing" id="hola2" style={{
					width: "100%",
					height: "auto",
				}}>
				</div>
		      </ContextDisplayBox>, document.getElementById("hola3"));

		console.log(geography);
		var c = geography["properties"]["name"];
		const ISO3 = geography["id"];
		console.log(c);
		this.props.summarize(ISO3, '2017');
		for (var i = 0; i < countries.length; i++) {
			if (countries[i]["name"] == c) {
				console.log(countries[i]);
				var scaleProp = countries[i]["landarea"] == 0? 6 : 3.0*Math.sqrt(16376870.0/countries[i]["landarea"]);
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
			<div className='wrapper' style={wrapperStyles}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
				onWheel={(event) => this.handleMouseScroll(event)}
			>
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
						width={1080}
						height={553}
						style={{
							width: "100%",
							height: "100%",
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
		);
	}
}
export default AnimatedMap