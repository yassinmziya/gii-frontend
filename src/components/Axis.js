import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

export default class Axis extends React.Component {
    renderAxis() {
        var xAxis = d3.axisBottom(this.props.xScale).ticks(9)
        var yAxis = d3.axisLeft(this.props.yScale)

        console.log(this.props.xScale)

        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(xAxis)
    }

    componentDidMount = () => {
        this.renderAxis();
    }

    componentDidUpdate = () => {
        this.renderAxis();
    }

    render() {
        var transform = 'translate('+0+','+this.props.y+')'
        return (
            <g className="axis" transform={transform}>
            </g>
        )
    }
}

Axis.propTypes = {
    xScale: PropTypes.func,
    yScale: PropTypes.func,
}