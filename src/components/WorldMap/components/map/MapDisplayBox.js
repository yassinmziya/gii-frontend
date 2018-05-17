import React from "react";

class MapDisplayBox extends React.Component {
	render() {
		return(
            <div className="MapDisplayBox" style={{
                float: "left",
                padding: "2%",
                width: "100%",
                height: "auto",
                margin: "3% auto",
                backgroundColor: "white",
                borderRadius: ".28571429rem .28571429rem .28571429rem .28571429rem",
            }}>{this.props.children}</div>
		);
	}
}
export default MapDisplayBox;