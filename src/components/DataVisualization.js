import React from 'react'
import PageWrap from './PageWrap';

import { Button, Dropdown, Menu, Select, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from './actions';
import ChartTypes from './common/ChartTypes';
import BarChartWrap from './BarChartWrap';
import RadarWrap from './RadarWrap';
import Displaychart from '../components/DisplayChart';
import "../css/data-visualization.css";


class DataVizualiztion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      chartType: null,
      year: null,
      countries: [],
      indicators: [],
    };
  }

  handleChange = (e, data) => {
    if(data.id === 'year') this.props.getIndicators(data.value);
    this.setState({
      [data.id]:data.value
    })
    //console.log(this.state)
  }

  componentDidMount = () => {
    this.props.getCountries()
    this.props.getIndicators(this.props.visualization.year)
  }

  generate = () => {
    //console.log(this.state)
    var visual;

    switch (this.state.chartType) {
      case ChartTypes.BarChart:
        visual = <BarChartWrap
          year = {this.state.year}
          countries = {this.state.countries}
          indicators = {this.state.indicators}
          padding = {100}
          height = {700}
          width = {880}
        />
        break;
      case ChartTypes.Radar:
        visual = <RadarWrap 
          year = {this.state.year}
          countries = {this.state.countries}
          indicators = {this.state.indicators}
          padding = {100}
          height = {700}
          width = {700}
        />
        break;
    }
    return visual
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

    var indicatorOptions = Object.keys(this.props.visualization.indicators).map((key) => {
      return {value: key, text: key + "     " + this.props.visualization.indicators[key]};
    })
    
    var queryComplete = this.state.chartType && this.state.year && this.state.countries.length !== 0 && this.state.indicators.length !== 0;

    
    return(
      <PageWrap>
        <Menu id="sidemenu" vertical style={{margin:0, width:250, marginRight:20, marginLeft:20}} >

          <Menu.Item className="one_selection">
            <h3>Select a chart</h3>
            <Select id="chartType" placeholder='Select a chart' scrolling options={chartOptions} onChange={this.handleChange} >
            </Select>
          </Menu.Item>

          <Menu.Item className="one_selection">
            <h3>Select a Country:</h3>
            <Dropdown 
              id="countries"
              placeholder='Select your country' 
              multiple 
              selection 
              options={this.props.visualization.countryOpts} 
              onChange={this.handleChange}
            />
          </Menu.Item>

          <Menu.Item className="one_selection">
            <h3>Select a year</h3>
            <Select id="year" placeholder='Select a year' scrolling options={yearOptions} onChange={this.handleChange}>
            </Select>
          </Menu.Item>

          <Menu.Item className="one_selection">
            <h3>Select an Indicator</h3>
            <Dropdown 
              id="indicators"
              placeholder='Select your country' 
              multiple 
              selection 
              options={indicatorOptions} 
              onChange={this.handleChange}
            />
          </Menu.Item>
        </Menu>
        
        <h1>Generated Chart</h1>
        <Displaychart>
          {queryComplete?this.generate():<Segment inverted color='blue' secondary>Select parameters and click/tap generate</Segment>}
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
    getCountries: actions.getCountries,
    getIndicators: actions.getIndicators
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToState)(DataVizualiztion)