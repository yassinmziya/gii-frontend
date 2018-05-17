import React from "react";
import ReactDOM from "react-dom";
import MapDisplayBox from "../map/MapDisplayBox";
import axios from 'axios';
import AnimatedMap from "../map/worldmap2";
import BriefWrapper from "../map/Breifing_wrapper";
import ContextDisplayBox from "../map/ContextDisplayBox";
import ProfilePage from "../map/ProfilePage";
import {Link, animatedScroll as scroll, scrollSpy, scroller} from "react-scroll";
import PageWrap from '../../../PageWrap';
import TreeProfile from '../../../TreeProfile';
//import "../map/ScrollDownButton.css"
/**
This is used for single country profile.
You can simple switch anything below to 
your country profile.
*/

const tinyBreif_style = {
	width: 1000,
	height: 1000,
	top: 15,
	right: 10,
	backgroundColor: "rgba(0,0,0,0.2)",
	zIndex: 10,
}

class Sample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: '',
		};
		this.changePage = this.changePage.bind(this);
	}

	changePage() {
		ReactDOM.render(
			<TreeProfile />,
			document.getElementById("TreeProfile")
		);
	}
    render() {
  /**
  axios.get('http://localhost:3001/api/v1/countries')
			.then((response, prevState) => {
					this.setState((prevState) => ({
						data: response.data.countries[0]["iso3"],
					}))
				});*/
	
	    return (
			<PageWrap>
			  <div className="content" style={{width: "100%", height: "100%"}}>
			  <MapDisplayBox>
		        <AnimatedMap />
		        <div id="hola3" style={{
		        	    width: "49%", 
		        	    float: "left",
		        	    opacity: 0,
		        	    transition: "opacity 1s",
		        	    marginLeft: 10,
		            }}/>
		      </MapDisplayBox>
		      <div className="ScrollDownButton" onClick={this.changePage}
		              style={{
                          display: "inline",
                          marginLeft: "50%",
		              }}>
                    <svg id="DownArrow">
                      <polygon className="arrow-bottom" points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 "/>
                    </svg>
		      </div>
		      <div id="TreeProfile" />
              </div>
              <TreeProfile />
			</PageWrap>
	    );
  }
}
 
export default Sample;