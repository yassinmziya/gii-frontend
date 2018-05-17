import React from "react";

class ContextDisplayBox extends React.Component {
	render() {
		return(
            <div className="ContextDisplayBox" style={{
                paddingLeft: "5%",
                width: "100%",
                height: "auto",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                borderRadius: ".28571429rem .28571429rem .28571429rem .28571429rem",
            }}>{this.props.children}</div>
		);
	}
}
export default ContextDisplayBox;