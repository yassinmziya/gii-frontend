import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import PageWrap from './PageWrap';
import Displaychart from '../components/DisplayChart';
import axios from 'axios';
import { Button, Dropdown, Input, Label, Menu, Checkbox, Select, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from './actions';
import ActionTypes from './actions/ActionTypes';
import ChartTypes from './common/ChartTypes';
import BarChartWrap from './BarChartWrap';
import RadarWrap from './RadarWrap';
import "../css/data-visualization.css";

class DataVizualiztion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      chartType: ChartTypes.BarChart,
      year:"2017",
      countries: ['SWE','USA'],
      indicators: ['1.', '2.', '3.']

    };
  }

  handleChange = (e, data) => {
    this.setState({
      [data.id]:data.value
    })
    console.log(this.state)
  }

  init = () => {
    this.props.getCountries()
  }


  componentDidMount = () => {
    this.init()
  }

  generate = () => {
    var visual;
    var props = {
      year: this.state.year,
      countries: this.state.countries,
      indicators: this.state.indicators
    }
    
    switch (this.state.chartType) {
      case ChartTypes.BarChart:
          visual = <BarChartWrap />
        break;
        case ChartTypes.Radar:
          visual = <RadarWrap />
        break;
        default:
          <h1 style={{color:'red'}}>Error</h1>
        break;
    }

  }

  render() {

    const yearOptions = [
      //{value:'2013', text:'2013'},
      {value:'2014-c', text:'2014-c'},
      {value:'2014-p', text:'2014-p'},
      {value:'2015', text:'2015'},
      {value:'2016', text:'2016'},
      {value:'2017', text:'2017'}
    ]

    const chartOptions = [
      {value: ChartTypes.BarChart, text:'Bar Chart'}, 
      {value:ChartTypes.Radar, text:'Radar'}
    ]

    const indicatorOptions = [
      {value:'1.', text:'1.'},
      {value:'1.1.', text:'1.1.'},
      {value:'1.2.', text:'1.2.'},
      {value:'1.3.', text:'1.3.'},
      {value:'2.', text:'2.'},
      {value:'3.', text:'3.'},
      {value:'4.', text:'4.'},
      {value:'5.', text:'5.'},
      {value:'6.', text:'6.'},
      {value:'7.', text:'7.'}
    ]
    
    
    return(
      <PageWrap>
        <Menu id="sidemenu" vertical style={{margin:0, width:250, marginRight:20, marginLeft:20}} >

          <Menu.Item class="one_selection">
            <h3>Select a chart</h3>
            <Select id="chartType" placeholder='Select a chart' scrolling options={chartOptions} onChange={this.handleChange} >
            </Select>
          </Menu.Item>

          <Menu.Item class="one_selection">
            <h3>Select a Country:</h3>
            <Dropdown 
              onChange={this.handleChange}
              id="countries"
              placeholder='Select your country' 
              multiple 
              selection 
              options={this.props.visualization.countryOpts} 
              onChange={this.handleChange}
            />
          </Menu.Item>

          <Menu.Item class="one_selection">
            <h3>Select a year</h3>
            <Select id="year" placeholder='Select a year' scrolling options={yearOptions} onChange={this.handleChange}>
            </Select>
          </Menu.Item>

          <Menu.Item class="one_selection">
            <h3>Select an Indicator</h3>
            <Dropdown 
              onChange={this.handleChange}
              id="indicators"
              placeholder='Select your country' 
              multiple 
              selection 
              options={indicatorOptions} 
              onChange={this.handleChange}
            />
          </Menu.Item>

          <Menu.Item >
            <Button fluid onClick={this.generate}>Generate</Button>
          </Menu.Item>

        </Menu>
        
        <h1>Generated Chart</h1>
        <Displaychart>
          {
            this.state.chartType === ChartTypes.BarChart?
            <BarChartWrap
            countries={this.state.countries}
            year={this.state.year}
            indicators={this.state.indicators}
            />:
            <RadarWrap
            countries={this.state.countries}
            year={this.state.year}
            indicators={this.state.indicators}
            height={500}
            width={500}
            padding={100}
            />
          }
        </Displaychart>
      </PageWrap>
    )
  }
}

function mapStateToProps(state) {
  return {
    visualization: state.visualization
  }
}

function matchDispatchToState(dispatch) {
  return bindActionCreators({
    getCountries: actions.getCountries
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToState)(DataVizualiztion)