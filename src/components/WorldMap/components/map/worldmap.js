import React from 'react';
import {
	ComposableMap,
	ZoomableGlobe,
	Geographies,
	Geography,
	Marker,
	Markers,
} from 'react-simple-maps';
import {Motion, spring} from 'react-motion';
import Link from 'react-router-dom/Link';
/**
The worldmap component, which can be rotated and clicked. 
*/
const wrapperStyles = {
	width: '100%',
	maxWidth: 860,
	margin: '0 auto'
};

var topofile = require('./topojson_maps/world-50m.json');
var projectionconfig = {
	scale: 300,
};

var mapStyle = {
	default: {
		fill: '#6B8E23',
		stroke: '#0D0000',
		strokeWidth: 0.75,
		outline: 'none',
	},
	hover: {
		fill: '#FF4500',
		stroke: '#0D0000',
		strokeWidth: 0.75,
		outline: 'none',
	},
	pressed: {
		fill: '#ecefe1',
		stroke: '#0D0000',
		strokeWidth: 0.75,
		outline: 'none',
	}
};


function mapClick(geography) {
	console.log('Country: ', geography.id);
}


const Worldmap = ({center}) => (
<div className='worldmap' style={wrapperStyles}>
	<Motion
		defaultStyle={{
			x: center[0],
			y: center[1]
		}}
		style={{
			x: spring(center[0]),
			y: spring(center[1])
		}}
	>
		{({x, y}) => (
			<ComposableMap width={800} height={700} 
				projectionConfig={projectionconfig}
				projection='orthographic'
				style={{
					width: '100%',
					height: 'auto'
				}}>
				<ZoomableGlobe center={[x, y]}>
					<circle cx={400} cy={350} r={300} 
						fill='#4682B4' stroke='#000000' />
					<Geographies geography={topofile} disableOptimization>
						{(geographies, projection) => geographies.map((geography, id) => (
							<Link to="/sample1">
								<Geography key={id} 
									geography={geography}
									projection={projection}
									style={mapStyle}
									onClick={mapClick}
								/>
							</Link>
						))}
					</Geographies>
					<Markers>
						<Marker marker={{ coordinates: center }}>
							<g transform="translate(-12, -24)">
								<path
								  fill="orange"
								  strokeWidth="2"
								  strokeLinecap="square"
								  strokeMiterlimit="10"
								  strokeLinejoin="miter"
								  d="M20,9c0,4.9-8,13-8,13S4,13.9,4,9c0-5.1,4.1-8,8-8S20,3.9,20,9z"
								/>
								<circle
								  fill="black"
								  strokeWidth="2"
								  strokeLinecap="square"
								  strokeMiterlimit="10"
								  strokeLinejoin="miter"
								  cx="12"
								  cy="9"
								  r="3"
								/>
							</g>
						</Marker>
					</Markers>
				</ZoomableGlobe>
			</ComposableMap>
		)}
	</Motion>
</div>
)
export default Worldmap;