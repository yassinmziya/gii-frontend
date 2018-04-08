import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";

export default class BarChart extends React.Component {
    verticalBar = (value, label, index) => {
        var barWidth = 30

        var yScale = d3.scaleLinear()
            .domain([0, 1000])
            .range([this.props.height, 0]);

        return (
            <rect 
                x={ index*barWidth }
                y={ yScale(value) }
                height={ this.props.height - yScale(value) }
                width={barWidth - 10}
            />
        );
        
    }

    render() {
        var data = [700, 200, 150, 300, 230];
        return (
            <div className="bar-chart">
                <svg width={this.props.width} height={this.props.height}>
                    <g>
                        {
                            data.map((x, i) => { return this.verticalBar(x, null, i) })
                        }
                    </g>
                </svg>
            </div>
        )
    }
}

BarChart.PropTypes = {
    height: PropTypes.number,
    width: PropTypes.number
}