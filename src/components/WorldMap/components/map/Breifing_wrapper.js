import React from 'react';
import Link from "react-router-dom/Link";

class BriefWrapper extends React.Component {
	render() {
		return (
		<div className="BriefWrapper" style={{
            top: 0,
            right: 0,
            left: 0,
	    }}>
	      
		  <div className="BrifNav" style={{
		  	width: "100%",
		  	height: "auto",
		  	backgroundColor: "rgba(150, 150, 150, 1.0)",
		  }}
		  >
		    <div className="HeadTitle" style={{
              color: 'white',
              fontSize: 40,
              fontStyle: 'bold',
              marginLeft: "0.5%",
              display: 'inline',
		    }}
		    >Global Innovation Index</div>
		    <div className="HomeButton" style={{
		    	color: 'white',
		    	fontSize: 25,
		    	marginLeft: '50%',
		    	display: 'inline',
		    }}>
		      <Link to="/">Home</Link>
		    </div>
		    <div className="AboutButton" style={{
		    	color: 'white',
		    	fontSize: 25,
		    	marginLeft: '3%',
		    	display: 'inline',
		    }}>
		      <Link to="/About">About</Link>
		    </div>
		    <div className="ContactButton" style={{
		    	color: 'white',
		    	fontSize: 25,
		    	marginLeft: '3%',
		    	display: 'inline',
		    }}>
		      <Link to="/Contact">Contact</Link>
		    </div>
		  </div>
		  {this.props.children}
		</div>
		);
	}
}

export default BriefWrapper;