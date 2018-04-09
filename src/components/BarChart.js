import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";

import Axis from './Axis';

export default class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.barWidth = {
            narrow: 30,
            normal:50
        }
    }

    verticalBar = (value, label, index) => {
        var barWidth = this.props.narrow?this.barWidth.narrow:this.barWidth.normal;

        var yScale = d3.scaleLinear()
            .domain([0, 400])
            .range([this.props.height, 0]);

        return (
            <rect 
                x={ index*(barWidth+ barWidth/10) }
                y={ yScale(value) }
                height={ this.props.height - yScale(value) }
                width={barWidth}
            />
        );
        
    }

    horizontalBar = (value, label, index) => {
        var barWidth = this.props.narrow?this.barWidth.narrow:this.barWidth.normal;

        var xScale = d3.scaleLinear()
            .domain([0, 400])
            .range([0, this.props.width])

        return (
            <rect
                x={0}
                y={ index*(barWidth + barWidth/10) }
                height={ barWidth }
                width={ xScale(value) }
            />
        )
    }

    render() {
        var data = [
            {label:'A', value:200},
            {label:'B', value:300},
            {label:'C', value:200},
            {label:'D', value:200},
            {label:'E', value:300},
            {label:'F', value:200},
            {label:'G', value:200},
            {label:'H', value:300},
            {label:'I', value:200},
        ];

        var barWidth = this.props.narrow?this.barWidth.narrow:this.barWidth.normal;
        var isHorizontal = this.props.type === 'h';
        var bar = isHorizontal?this.verticalBar:this.horizontalBar;

        var canvasW = isHorizontal?(barWidth + barWidth/10)* data.length - 1:this.props.width;
        var canvasH = isHorizontal?this.props.height + 20:barWidth * data.length;
        return (
            <div className={`${isHorizontal?"horizontal":"vertical"}-bar-chart`}>
                <svg 
                    width={canvasW} 
                    height={canvasH}
                >
                    <g>
                        {
                            data.map((x, i) => { return bar(x.value, null, i) })
                        }
                    </g>
                    <Axis
                        xScale={
                            d3.scaleBand()
                                .domain(data.map(x => x.label))
                                .range([0,canvasW])
                                .paddingInner(0.1)
                        }
                        y={this.props.height}
                    />
                    
                </svg>
            </div>
        )
    }
}

BarChart.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['v', 'h']).isRequired,
    narrow: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number
    }
    ))
}