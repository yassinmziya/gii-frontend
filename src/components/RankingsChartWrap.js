import React from 'react';
import Axios from 'axios';
import {BarChart} from 'react-d3-components';
import PropTypes from 'prop-types';

import { Button, Dropdown, Menu, Select, Segment, Table, Dimmer, Loader, Image, Header} from 'semantic-ui-react';
import { truncate } from 'fs';
import PageWrap from './PageWrap';

var prefix = "http://localhost:3001/api"

export default class RankingsChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {records: [], years: ['2017','2016','2015'], indicator: 'GII', indicators: [], error: false}
    }

    getData = () => {
        //console.log('trace og')
        var years = this.state.years

        var recordCallBacks = years.map((y) => {return Axios.get(prefix + `/v1/data/${y}`)})
        var indicatorCallBacks = years.map((y) => {return Axios.get(prefix + `/v1/categories/${y}`)})

        Axios.all([
            Axios.all(indicatorCallBacks), 
            Axios.all(recordCallBacks)
        ]).then(Axios.spread((ind, res) => {
                var indicators = ind.map((x) => {return Object.assign({GII: 'Global Innovation Index', Input: 'Innovation Input Sub-Index', Output: 'Innovation Output Sub-Index', Efficiency: 'Innovation Efficiency Ratio'}, x.data)})
                var records = res.map((x) => {return x.data})
                this.setState({records: records, years: years, indicators: indicators})
            }
        ))
        //console.log(this.state.indicators)
    }

    componentDidMount = () => {
        //console.log('trace 0')
        this.getData()
        //this.getVariables()
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //console.log('trace 1')
        var update = prevState.years.length !== this.state.years.length
        //|| prevState.indicator !== this.state.years.length
        if (update) {
            this.getData()
        }
        //if (this.state.error) {
        //    this.setState({indicator: 'GII', error: false})
        //}
        //this.getVariables()
    }
/*
    componentWillReceiveProps = (nextProps, nextState) => {
        console.log('cur',this.props)
        console.log('nxt', nextProps)
        var update = nextState.years.length !== this.state.years.length
        || nextState.indicator !== this.state.indicator
        console.log(update)
        if(update) {
            this.getData()
            //this.getVariables()
        }
    }*/

    dataByCountry = () => {
        //console.log('trace 2')
        var dataByCountry = this.state.records[0].map((country) => {
            return [country.ISO3, country.Economy, country[this.state.indicator+'rank'], country[this.state.indicator+'score']]})
        
            var indicatorName = this.state.indicators[0][this.state.indicator] // fetch correct indicator name
        
            // [ISO3, Economy, Rank, SortScore, OtherYearScores...]
        for (var i = 1; i < this.state.records.length; i++){

            // fetch the correct indicator code pertaining to the old year and otherwise set error to true
            var oldCode = ""
            if (indicatorName === this.state.indicators[i][this.state.indicator]){oldCode = this.state.indicator} 
            else {for (var realCode in this.state.indicators[i]) {if (this.state.indicators[i][realCode] === indicatorName) oldCode = realCode}}

            for (var n = 0; n < dataByCountry.length; n++){

                var oldCountryData = this.state.records[i].find((country) => {return country.ISO3 === dataByCountry[n][0]}) //country object of old year corresponding to correct ISO3
                //console.log(this.state.records[i])
                if (oldCountryData !== undefined) {dataByCountry[n].push(oldCountryData[oldCode+'score'])}
            }
        }
        return dataByCountry.sort((a,b) => {return parseInt(a[2], 10) - parseInt(b[2], 10)}) // Sort countries by rank
    }

    handleChange = (e, data) => {
        //console.log('trace 3');
        if (data.value.length === 0){
            this.setState(
                {years: ['2017','2016','2015']}
            )
        } else {
            this.setState({
                [data.id]:data.value
            })
        }
    }

    /*tooltip = function(x, y, y0, total) {
        return "Score: " + y.toString();
    }*/

    render() {
        //console.log('trace 4')
        //console.log(this.state.indicators)

        if ((this.state.records.length === 0 || this.state.years.length === 0)) {
            return (
                <div>
                    <PageWrap>
                    <Segment>
                        <Dimmer active>
                            <Loader>Loading</Loader>
                        </Dimmer>

                        <Image src='/assets/images/wireframe/short-paragraph.png' />
                        <Image src='/assets/images/wireframe/short-paragraph.png' />
                        <Image src='/assets/images/wireframe/short-paragraph.png' />
                    </Segment>
                    </PageWrap>
                </div>
                )}

        const yearOptions = [
            {value:'2011', text:'2011'},
            {value:'2012', text:'2012'},
            //{value:'2013', text:'2013'},
            {value:'2014-c', text:'2014-c'},
            {value:'2014-p', text:'2014-p'},
            {value:'2015', text:'2015'},
            {value:'2016', text:'2016'},
            {value:'2017', text:'2017'}
            ];

            //console.log(Object.keys(this.state.indicators[0]))

            // [valid indicators for selected years]
            
            var indicatorOptions = Object.keys(this.state.indicators[0]).map((code) => {
                var indicatorName = this.state.indicators[0][code]
                // array of booleans denoting if an indicator is valid for its corresponding year in this.state.indicators
                return {value: code, text: "(" + code + ") " + this.state.indicators[0][code]}
            });

        
        //var indicatorOptions = indicatorOptions.filter((ind) => {
        //    return ind.value !== ""
        //})

        var dataByCountry = this.dataByCountry()
        //console.log(dataByCountry)
        dataByCountry = dataByCountry.filter((c) => {return c[0] !== ""})
        //console.log(dataByCountry)
        var yearlist = this.state.years
        //console.log(yearlist)
        var data = yearlist.map((year) => {
            var i = yearlist.indexOf(year);
            //console.log(year)
            return ({
                label: year,
                values: dataByCountry.map((country) => {return {x: country[0], y: parseFloat(country[i+3], 10)}})
            })
        })
        
        //console.log(dataByCountry)

        // nested maps above should return data in the correct format
        
        return(
            <div>
            <PageWrap>
            <Segment textAlign='center' attached='top' >
                <Header as='h1' >
                Rankings
                <Header sub></Header>
                </Header>
            </Segment>
            
            <Segment attached="top">
            <div id='chart'>
                <BarChart
                groupedBars
                axes
                data={data}
                width={this.props.width?this.props.width:dataByCountry.length * 60}
                height={this.props.height?this.props.height:500}
                padding={this.props.padding?this.props.padding:0}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                //tooltipHtml={this.tooltip}
                yAxis={{label: "Score"}}/>
            </div>
            </Segment>

            <Segment textAlign='left' attached='bottom' >
                <p>Countries are sorted by rank in the chosen indicator for the leftmost input year. The below table also shows data from the leftmost input year. </p>
                <p>* If every country has no data for one year, it is because the indicator was not used that year. </p>
                <p>** If one country has no data for a year or multiple, it is because that data was not collected for the country. </p>
            </Segment>
            
            <Segment textAlign='center' attached='top'>
            <Header as='h3'>
            Select your years
            </Header>
            </Segment>
            <Dropdown
            search
            id="years"
            multiple
            selection
            fluid
            placeholder='2017, 2016, 2015'
            options={yearOptions} 
            onChange={this.handleChange}
            />
            
            <Segment textAlign='center' attached='top' >
            <Header as='h3'>
            Select an indicator
            </Header>
            </Segment>
            <Dropdown 
            search
            id="indicator"
            selection
            fluid
            placeholder='GII'
            options={indicatorOptions} 
            onChange={this.handleChange}
            />

           <Table >
           <Table.Header>
           <Table.Row>
               <Table.HeaderCell collapsing textAlign='center'>Rank</Table.HeaderCell>
               <Table.HeaderCell collapsing>Country</Table.HeaderCell>
               <Table.HeaderCell collapsing>ISO3</Table.HeaderCell>
               <Table.HeaderCell collapsing>Score</Table.HeaderCell>
           </Table.Row>
           </Table.Header>
           <Table.Body>
               {
                   dataByCountry.map((country, i) => {
                       return (<Table.Row key={i}>
                           <Table.Cell collapsing textAlign='center'>
                               {country[2]}
                           </Table.Cell>
                           <Table.Cell>
                               {country[1]}
                           </Table.Cell>
                           <Table.Cell>
                               {country[0]}
                           </Table.Cell>
                           <Table.Cell>
                               {parseFloat(country[3])}
                           </Table.Cell>
                       </Table.Row>)
                   })
               }
           </Table.Body>
       </Table>
       </PageWrap>
       </div>
        )
    }
}

RankingsChart.propTypes = {
    years : PropTypes.arrayOf(PropTypes.string).isRequired,
    indicator : PropTypes.string.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
    padding: PropTypes.number,
}