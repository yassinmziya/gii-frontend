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
        var max = this.props.max?this.props.max:d3.max(this.props.data.map(x => x.value));
        var yScale = d3.scaleLinear()
            .domain([0, max])
            .range([this.props.height-100, 0]);

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
            .domain([0, d3.max(this.props.data.map(x => x.value))])
            .range([0, this.props.width-100])

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
        /*var data = [
            {label:'A', value:200},
            {label:'B', value:300},
            {label:'C', value:200},
            {label:'D', value:200},
            {label:'E', value:300},
            {label:'F', value:200},
            {label:'G', value:200},
            {label:'H', value:300},
            {label:'I', value:200},
        ];*/

        var data = this.props.data

        // class
        var isHorizontal = this.props.type === 'h';
        var bar = isHorizontal?this.verticalBar:this.horizontalBar;

        // dimensions
        var barWidth = this.props.narrow?this.barWidth.narrow:this.barWidth.normal;
        var canvasW = isHorizontal?barWidth * data.length + barWidth/10 * (data.length - 2):this.props.width +40;
        var canvasH = isHorizontal?this.props.height + 20:barWidth * data.length + barWidth/10 * (data.length - 2);
        var transformVerticalChart = isHorizontal?null:'translate('+40+','+0+')';
        return (
            <div className={`${isHorizontal?"horizontal":"vertical"}-bar-chart`}>
                <svg 
                    width={canvasW} 
                    height={canvasH}
                >
                    <g transform={transformVerticalChart}>
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
                                .paddingOuter(0)
                        }

                        yScale={
                            d3.scaleBand()
                                .domain(data.map(x => x.label))
                                .range([0, canvasH])
                                .paddingInner(0.1)
                                .paddingOuter(0)
                        }

                        type={isHorizontal?'x':'y'}
                        transform={isHorizontal?'translate('+0+','+this.props.height+')':'translate('+40+','+0+')'}
                    />
                    
                </svg>
            </div>
        )
    }
}

BarChart.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    type: PropTypes.oneOf(['v', 'h']).isRequired,
    narrow: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number
    }
    )),
    axis: PropTypes.bool,
    max: PropTypes.number
}