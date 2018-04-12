import React from 'react';
import {
	ComposableMap,
	ZoomableGlobe,
	Geographies,
	Geography,
	Marker
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

const positions = [
	{name: "SWE", coordinates: [18.6435, 60.1282]},
];


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
				</ZoomableGlobe>
			</ComposableMap>
		)}
	</Motion>
</div>
)
export default Worldmap;