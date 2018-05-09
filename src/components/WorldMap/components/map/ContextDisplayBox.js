import React from "react";

class ContextDisplayBox extends React.Component {
	render() {
		return(
            <div className="ContextDisplayBox" style={{
                float: "left",
                paddingLeft: "3%",
                width: "50%",
                height: "auto",
                margin: "2% auto",
                backgroundColor: "white",
            }}>{this.props.children}</div>
		);
	}
}
export default ContextDisplayBox;