import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

export default class Axis extends React.Component {
    renderAxis() {
        var xAxis = d3.axisBottom(this.props.xScale)
        var yAxis = d3.axisLeft(this.props.yScale)

        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.type === 'x'?xAxis:yAxis)
    }

    componentDidMount = () => {
        this.renderAxis();
    }

    componentDidUpdate = () => {
        this.renderAxis();
    }

    render() {
        return (
            <g className="axis" transform={this.props.transform}>
            </g>
        )
    }
}

Axis.propTypes = {
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    type: PropTypes.oneOf(['x', 'y']).isRequired
}