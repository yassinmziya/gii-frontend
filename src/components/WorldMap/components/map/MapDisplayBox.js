import React from "react";

class MapDisplayBox extends React.Component {
	render() {
		return(
            <div className="MapDisplayBox" style={{
                float: "left",
                paddingLeft: "2%",
                width: "50%",
                height: "auto",
                margin: "4% auto",
                backgroundColor: "white",
            }}>{this.props.children}</div>
		);
	}
}
export default MapDisplayBox;