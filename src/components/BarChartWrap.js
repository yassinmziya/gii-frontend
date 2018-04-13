import React from 'react';
import Axios from 'axios';
import {BarChart} from 'react-d3-components';

var prefix = "http://localhost:3001/api"

export default class BarChartWrap extends React.Component {

    constructor(props) {
        super(props)
        this.state = {records: []};
    }

    getData = () => {
        Axios.get(prefix + `/v1/data/${this.props.year}`).then((response) => {
            console.log(response);
            const data =  response.data;
            var records = data.filter((x)=>{
                return (this.props.countries).includes(x.ISO3)
            })
            this.setState({
                records : records 
            })
                        
        })
    }

    componentDidMount = () => {
        console.log(this.getData())
    }

    tooltipBarChart = function(x, y) {
        return "x: " + x + " y: " + y;
    };

    tooltip = function(x, y0, y, total) {
        return "Score: " + y.toString();
    }

    labelAccessor = function(stack) { return stack.customLabel };

    ComponentDidUpdate = () => {
        var paths = document.getElementsByTagName('path');
        var colors = Array.from(paths).map(x => document.defaultView.getComputedStyle(x).stroke)
        console.log(colors)
    }
    
    render() {
        var rects = Array.from(document.getElementsByClassName("bar"));
        rects.forEach((element, index) => {
        element.onclick = function() {
            // Display the rect's corresponding country
            
          }
        })
        const colors = ['RGB(179,199,229)','RGB(239,133,54)','RGB(245,189,130)','RGB(81,157,62)','RGB(168,220,147)','RGB(197,57,50)','RGB(241,157,153)','RGB(141,107,184)','RGB(193,177,210)','RGB(133,88,78)','RGB(190,157,150)','RGB(213,126,190)','RGB(237,185,209)','RGB(127,127,127)','RGB(199,199,199)','RGB(188,188,69)','RGB(219,218,150)','RGB(88,188,204)','RGB(170,117,227)','RGB(58,119,175)']
        if (this.state.records[0] != null) {
            var data = [];
            for (var i=0; i < this.state.records.length; i++) {
                var scorelst = [];
                for (var n=0; n < this.props.indicators.length; n++){
                    if (this.props.indicators[n].length == 5) {
                        scorelst.push({label: this.state.records[i].ISO3, x: this.props.indicators[n], y: parseInt(this.state.records[i][this.props.indicators[n]+'score']), y0: 1});
                    } else {
                        scorelst.push({label: this.state.records[i].ISO3, x: this.props.indicators[n], y: parseInt(this.state.records[i][this.props.indicators[n]+'.score']), y0: 1});
                    }
                    
                }
                data.push({label: this.state.records[i].ISO3, values: scorelst});
            }

                var legend = '<ul>';
                for (var i=0; i < this.state.records.length; i++) {
                    legend += '<li style= color:'+ colors[i%20] +';font-weight:900>' + this.state.records[i].Economy + '</li>';
                }
                legend += '</ul>';
        }
        else {
            var data = [
                {label: '', values: [{x:'', y:0}, {x:'', y:0}]},
                {label: '', values: [{x:'', y:0}, {x:'', y:0}]}
            ];
            var legend = '<p></p>'
        }

        return(
            <div >
            <div className = 'barChart' style={{float:'left'}}>
                <BarChart
                groupedBars
                axes
                data={data}
                width={400}
                height={400}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                tooltipHtml={this.tooltip}
                xAxis={{label: "Indicator"}}
                yAxis={{label: "Score"}}
                style={{float:'left'}}/>
            </div>
                <div style={{float:'left'}}>
                    <h2> Legend </h2>
                    <div dangerouslySetInnerHTML={{__html: legend}} />
                </div>
           </div>
        )
    }
}


/*<BarChartWrap
   width={12}
   data={{
       countries:[“USA”, “TZA”, “AUS”],
       indicators:[“4.1.1", “4.1.“],
       year=2011
   }}
/> 
<BarChart
                groupedBars
                axes
                data={data}
                width={400}
                height={400}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                tooltipHtml={this.tooltip}
                xAxis={{label: "Indicator"}}
                yAxis={{label: "Score"}}/>

*/