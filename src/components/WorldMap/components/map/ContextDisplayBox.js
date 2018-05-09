import React from "react";

class ContextDisplayBox extends React.Component {
	render() {
		return(
            <div className="ContextDisplayBox" style={{
                float: "left",
                paddingLeft: "2%",
                width: "50%",
                height: 370,
                margin: "0 auto",
                backgroundColor: "white",
            }}>{this.props.children}</div>
		);
	}
}
export default ContextDisplayBox;