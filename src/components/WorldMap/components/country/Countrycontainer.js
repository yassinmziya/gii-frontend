import React from 'react';
import Country1 from './Country1.js';
/**
This is the countrycontainer component, which is used
for country flags display.
*/
class Countrycontainer extends React.Component {
	constructor(props) {
		super(props);
		this.myCallback = this.myCallback.bind(this);
	}
	
	myCallback(pos) {
		this.props.callbackFromMySidebar(pos);
	}
	
	render() {
		return (
			<div style={{overflowY: 'auto',height: 720,}}>
				<Country1 fullName='Albania'
					img_src='http://flags.fmcdn.net/data/flags/w580/al.png'
					coordinate={[20.1683, 41.1533]}
					callbackFromCountryContainer={this.myCallback}
				/>
				<Country1 fullName='Algeria'
					img_src='http://flags.fmcdn.net/data/flags/w580/dz.png'
					coordinate={[28.0339, 1.6596]}
					callbackFromCountryContainer={this.myCallback}
				/>
				<Country1 fullName='Argentina'
					img_src='http://flags.fmcdn.net/data/flags/w580/ar.png'
					coordinate={[-63.6167, -38.4161]}
					callbackFromCountryContainer={this.myCallback}
				/>
				<Country1 fullName='Armenia'
					img_src='http://flags.fmcdn.net/data/flags/w580/am.png'
					coordinate={[45.0382, 40.0691]}
					callbackFromCountryContainer={this.myCallback}
				/>
				<Country1 fullName='Brazil'
					img_src='http://flags.fmcdn.net/data/flags/w580/br.png'
					coordinate={[-51.9253, -14.2350]}
					callbackFromCountryContainer={this.myCallback}
				/>
				<Country1 fullName='Denmark'
					img_src='http://flags.fmcdn.net/data/flags/w580/dk.png'
					coordinate={[9.5018, 56.2639]}
					callbackFromCountryContainer={this.myCallback}
				/>
				<Country1 fullName='Sweden'
					img_src='http://flags.fmcdn.net/data/flags/w580/se.png'
					coordinate={[18.6435, 60.1282]}
					callbackFromCountryContainer={this.myCallback}
				/>
				<Country1 fullName='United Kingdom'
					img_src='http://flags.fmcdn.net/data/flags/w580/gb.png'
					coordinate={[-3.4360, 55.3781]}
					callbackFromCountryContainer={this.myCallback}
				/>
				<Country1 fullName='United States'
					img_src='http://flags.fmcdn.net/data/flags/w580/us.png'
					coordinate={[-95.7129, 37.0902]}
					callbackFromCountryContainer={this.myCallback}
				/>
				// More countries coming soon!
				
				
				
				
				
			</div>
		);
	}
}

export default Countrycontainer;

