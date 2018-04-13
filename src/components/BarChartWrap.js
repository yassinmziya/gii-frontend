import React from 'react';
import Axios from 'axios';
import {BarChart} from 'react-d3-components';
import {Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';

var prefix = "http://localhost:3001/api"

export default class BarChartWrap extends React.Component {

    constructor(props) {
        super(props)
        this.state = {records: [], variables: [], groupbyindicator: true};
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
            console.log(records)
                        
        })
    }

    getVariables = () => {
        Axios.post(`http://localhost:3001/api/v1/categories/${this.props.year}`, this.props.indicators). then((res) => {
            console.log(res.data)
            this.setState({
                variables : res.data
            })
        })
    }

    componentDidMount = () => {
        console.log(this.getData())
        this.getVariables()
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
        console.log(document.getElementsByClassName("bar"))
    }
    
    toggleGroup = () => {
        this.setState({groupbyindicator: !this.state.groupbyindicator});
        
    }

    render() {
        if(this.state.variables.length === 0) return null;
        if(this.state.records.length === 0) return null;
        const colors = ['RGB(31,119,180)','RGB(179,199,229)','RGB(239,133,54)','RGB(245,189,130)','RGB(81,157,62)','RGB(168,220,147)','RGB(197,57,50)','RGB(241,157,153)','RGB(141,107,184)','RGB(193,177,210)','RGB(133,88,78)','RGB(190,157,150)','RGB(213,126,190)','RGB(237,185,209)','RGB(127,127,127)','RGB(199,199,199)','RGB(188,188,69)','RGB(219,218,150)','RGB(88,188,204)','RGB(170,117,227)','RGB(58,119,175)']

        if (this.state.groupbyindicator) {
            var xlabel = 'Indicator';
            var data = [];
            for (var i=0; i < this.state.records.length; i++) {
                var scorelst = [];
                for (var n=0; n < this.state.variables.length; n++){
                    if (this.props.indicators[n].length == 5) {
                        scorelst.push({x: this.state.variables[n], y: parseInt(this.state.records[i][this.props.indicators[n]+'score'])});
                    } else {
                        scorelst.push({x: this.state.variables[n], y: parseInt(this.state.records[i][this.props.indicators[n]+'score'])});
                    }
                    
                }
                data.push({label: this.state.records[i].ISO3, values: scorelst});
            }

                var legend = '<ul>';
                for (var i=0; i < this.state.records.length; i++) {
                    legend += '<li style= color:'+ colors[i%20] +';font-weight:900>' + this.state.records[i].Economy + '</li>';
                }
                legend += '</ul>';
            } else {      
                var xlabel = 'Country';         
                var data = [];
                for (var i=0; i < this.state.variables.length; i++) {
                    var scorelst = [];
                    for (var n=0; n < this.state.records.length; n++){
                        if (this.props.indicators[i].length == 5) {
                            scorelst.push({x: this.state.records[n].ISO3, y: parseInt(this.state.records[n][this.props.indicators[i]+'score'])});
                        } else {
                            scorelst.push({x: this.state.records[n].ISO3, y: parseInt(this.state.records[n][this.props.indicators[i]+'.score'])});
                        }
                            
                    }
                    data.push({label: this.state.variables[i], values: scorelst});
                }
        
                      var legend = '<ul>';
                    for (var i=0; i < this.state.variables.length; i++) {
                        legend += '<li style= color:'+ colors[(i+this.state.records.length)%20] +';font-weight:900>' + this.state.variables[i] + '</li>';
                    }
                    legend += '</ul>';
                }

        return(
            <div>
                <div style={{padding:'10px'}}>
                    <h1> BarChart Comparison </h1>
                </div>
            <div className = 'barChart' style={{float:'left'}}>
                <BarChart
                groupedBars
                axes
                data={data}
                width={1000}
                height={500}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                tooltipHtml={this.tooltip}
                xAxis={{label: xlabel}}
                yAxis={{label: "Score"}}
                style={{float:'left'}}/>
            </div>
                <div style={{float:'left', padding: '0px'}}>
                    <Button class="ui toggle button" role="button" color='red' onClick = {this.toggleGroup}>Toggle Grouping</Button>
                    <h3 > Legend </h3>
                    <div dangerouslySetInnerHTML={{__html: legend}} />
                </div>
           </div>
        )
    }
}

BarChartWrap.propTypes = {
    year : PropTypes.string.isRequired,
    countries : PropTypes.arrayOf(PropTypes.string).isRequired,
    indicators : PropTypes.arrayOf(PropTypes.string).isRequired,
}