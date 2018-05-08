import React from 'react'
import PageWrap from './PageWrap';

import { Dropdown, Menu, Select, Segment } from 'semantic-ui-react';
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
    this.setState({
      [data.id]:data.value
    })
  }

  componentDidMount = () => {
    this.props.getCountries()
  }

  generate = () => {
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
    getCountries: actions.getCountries
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToState)(DataVizualiztion)