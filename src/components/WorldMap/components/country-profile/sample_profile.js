import React from "react";
import ReactDOM from "react-dom";
import MapDisplayBox from "../map/MapDisplayBox";
import axios from 'axios';
import AnimatedMap from "../map/worldmap2";
import BriefWrapper from "../map/Breifing_wrapper";
import ContextDisplayBox from "../map/ContextDisplayBox";
import {Link, animatedScroll as scroll, scrollSpy, scroller} from "react-scroll";
import PageWrap from '../../../PageWrap';
import TreeProfile from '../../../TreeProfile';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from '../../../actions';
import {Tab, Segment} from 'semantic-ui-react';
import ProfilePage from '../../../ProfilePage';
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
		const summary = this.props.report.summary;
		var errorBox 
		if(!summary) {
			errorBox = <Segment invertedcolor='red' secondary>Select an economy</Segment>
		}

		const panes = [
            { menuItem: 'Country Profile', render: () => <Tab.Pane attached={false}><ProfilePage   economy={summary.economy} iso={summary.iso3} year={this.props.report.year}/></Tab.Pane> },
            /*{ menuItem: 'Country Tree', render: () => <Tab.Pane attached={false}><TreeProfile iso={summary.iso3} year={this.props.report.year}/></Tab.Pane> },*/
            { menuItem: 'Country Briefing', render: () => <Tab.Pane attached={false}><TreeProfile /></Tab.Pane> },
        ]
	    return (
			<PageWrap>
			  	<div className="content" style={{width: "100%", height: "100%"}}>
			  		<MapDisplayBox>
		        		<AnimatedMap summarize={this.props.summarize}/>
		        		<div id="hola3" style={{
		        	    	width: "49%", 
		        	    	float: "left",
		        	    	opacity: 0,
		        	    	transition: "opacity 1s",
							marginLeft: 10,
							marginBottom: 0,
		        		}}/>
		        		
		      		</MapDisplayBox>
		      		<div
					  style={{
						  	height: "auto",
							width: "100%",
							margin: "10px 0",
							float: "left"
						}}
		        	>	
						<div className="title">
                        	<h1>{summary ? summary.economy : "Select An Economy"}</h1>
                    	</div>
                    	{summary ? <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>: errorBox}
		      			</div>
              	</div>
			</PageWrap>
	    );
  }
}
 
function mapStateToProps(state) {
	return {
		report: state.report
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		summarize: actions.summarize
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Sample);