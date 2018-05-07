import React from "react";
import MapDisplayBox from "../map/MapDisplayBox";
import axios from 'axios';
import AnimatedMap from "../map/worldmap2";
import BriefWrapper from "../map/Breifing_wrapper";
import ContextDisplayBox from "../map/ContextDisplayBox";
import ProfilePage from "../map/ProfilePage";
import {Link, animatedScroll as scroll, scrollSpy, scroller} from "react-scroll"
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
		scroller.scrollTo('MockUpProfilePage', {
			duration: 800,
			delay: 0,
			smooth: "easeInOutQuart",
		});
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
			<BriefWrapper>
			  <div className="content" style={{width: "100%", height: "100%"}}>
			  <MapDisplayBox>
		        <AnimatedMap />
		      </MapDisplayBox>
		      <ContextDisplayBox>
		      	<div className="rankNumber" id="hola0" style={{
                    width: 50,
                    height: 100,
                    float: "left",
                    marginLeft: "5%",
                    marginTop: "2%",
		        }}>
		      	</div>
				<div className="countryName" id="hola1" style={{
					width: "80%",
					height: 100,
					position: "relative",
					float: "left",
					marginLeft: "5%",
					marginTop: "5%",
					zIndex: 30,
				}}
				>
				</div>

				<div className="breifing" id="hola2" style={{
					width: "80%",
					height: "auto",
					position: "relative",
					marginLeft: "5%",
					float: "left",
					zIndex: 30,
				}}>
				</div>
		      </ContextDisplayBox>
		      <div className="ScrollDownButton" onClick={this.changePage}
		              style={{
                          display: "inline",
                          marginLeft: "50%",
		              }}>
                    <svg id="DownArrow">
                      <polygon class="arrow-bottom" points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 "/>
                    </svg>
		          </div>
              </div>
		      <ProfilePage />
			</BriefWrapper>
	    );
  }
}
 
export default Sample;