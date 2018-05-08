import React from 'react';
import Axios from 'axios';
import {BarChart} from 'react-d3-components';
import PropTypes from 'prop-types';

import { Button, Dropdown, Menu, Select, Segment, Table, Dimmer, Loader, Image } from 'semantic-ui-react';

var prefix = "http://localhost:3001/api"

export default class RankingsChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {records: [], years: [], indicators: [], error: false}
    }

    getData = () => {
        var years = this.props.years.filter((x) => {return (x != null )})

        var recordCallBacks = years.map((y) => {return Axios.get(prefix + `/v1/data/${y}`)})
        var indicatorCallBacks = years.map((y) => {return Axios.get(prefix + `/v1/categories/${y}`)})

        Axios.all([
            Axios.all(indicatorCallBacks), 
            Axios.all(recordCallBacks)
        ]).then(Axios.spread((ind, res) => {
                var indicators = ind.map((x) => {return x.data})
                var records = res.map((x) => {return x.data})
                this.setState({records: records, years: years, indicators: indicators})
            }
        ))
    }

    componentDidMount = () => {
        this.getData()
        //this.getVariables()
    }

    /*componentWillReceiveProps = (nextProps, nextState) => {
        console.log('cur',this.props)
        console.log('nxt', nextProps)
        var update = nextProps.year !== this.props.year
        console.log(update)
        if(update) {
            this.getData()
            //this.getVariables()
        }
    }*/

    dataByCountry = () => {
        var dataByCountry = this.state.records[0].map((country) => {
            return [country.ISO3, country.Economy, country[this.props.indicator+'rank'], country[this.props.indicator+'score']]})
        
            var indicatorName = this.state.indicators[0][this.props.indicator] // fetch correct indicator name
        
            // [ISO3, Economy, Rank, SortScore, OtherYearScores...]
        for (var i = 1; i < this.state.records.length; i++){

            // fetch the correct indicator code pertaining to the old year and otherwise set error to true
            var oldCode = ""
            var year = this.state.years[i] // fetch year pertaining to iteration of outter for loop
            if (indicatorName === this.state.indicators[i][this.props.indicator]){
                oldCode = this.props.indicator
            } else {
                for (var realCode in this.state.indicators[i]){
                    if (this.state.indicators[i][realCode] === indicatorName) oldCode = realCode
                }
                this.setState({error: true})
            }

            for (var n = 0; n < dataByCountry.length; n++){

                var oldCountryData = this.state.records[i].find((country) => {return country.ISO3 === dataByCountry[n][0]}) //country object of old year corresponding to correct ISO3
                //console.log(this.state.records[i])
                if (oldCountryData !== undefined) {dataByCountry[n].push(oldCountryData[oldCode+'score'])}
            }
        }
        return dataByCountry.sort((a,b) => {return parseInt(a[2], 10) - parseInt(b[2], 10)}) // Sort countries by rank
    }

    handleChange = (e, data) => {
            this.setState({
                [data.id]:data.value
            })
        //console.log(this.state)
      }

    /*tooltip = function(x, y, y0, total) {
        return "Score: " + y.toString();
    }*/

    render() {
        console.log(this.state.indicators)
        if (this.state.error) {
            return(
                <Segment textAlign='center' as='h3'>
                    The years you have selected do not both contain this indicator.
                </Segment>
            )
        }
        if ((this.state.records.length === 0 || this.state.years.length === 0)) {
            return (
                <div>
                    <Segment>
                        <Dimmer active>
                            <Loader>Loading</Loader>
                        </Dimmer>

                        <Image src='/assets/images/wireframe/short-paragraph.png' />
                        <Image src='/assets/images/wireframe/short-paragraph.png' />
                        <Image src='/assets/images/wireframe/short-paragraph.png' />
                    </Segment>
                </div>
                )}
        var dataByCountry = this.dataByCountry()
        dataByCountry = dataByCountry.filter((c) => {return c[0] !== ""})
        console.log(dataByCountry)
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
        console.log(data)

        // nested maps above should return data in the correct format
        
        return(
            <div>
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