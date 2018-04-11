import React from 'react';
import { Table, Accordion, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageWrap from './PageWrap';
import BarChart from './BarChart';
import actions from './actions';
import '../css/rankings.css';

class Rankings extends React.Component {

    componentDidMount = () => {
        this.props.getData(this.props.rankings.year)
    }

    getRankedData = () => {
        var data = this.props.rankings.data.filter(x => x.ISO3.length === 3);

        var rankedData = [];
        data.forEach((x) => {
            var data_present = !Number.isNaN(parseInt(x[this.props.rankings.indicator+"score"], 10))

            if(data_present) {
                //console.log(x[this.state.indicator+"rank"])
                var index = parseInt(x[this.props.rankings.indicator+"rank"], 10)

                var i = 0
                if(rankedData[index] !== undefined) {
                    while(rankedData[index + i] !== undefined) {
                        i++;
                    }
                } 
                rankedData[index + i] = x
            }
                
        })
        //console.log(rankedData)
        return rankedData
    }

    handleYear = (e, {value}) => {
        this.props.getData(value)
        this.props.setYear(value)
        //console.log(year)
    }

    render() {
        var data = this.getRankedData()
        var yearDropdownOptions = [
            { key: '2017', value: 2017, text: 2017},
            { key: '2016', value: 2016, text: 2016},
            { key: '2015', value: 2015, text: 2015},
            { key: '2014-p', value: '2014-p', text: '2014-p'},
            { key: '2014-c', value: '2014-c', text: '2014-c'},
            { key: 2013, value: 2013, text: 2013},
            { key: 2012, value: 2012, text: 2012},
            { key: 2011, value: 2011, text:2011}
        ]

        return (
            <PageWrap>
                <div id="rankings">
                    <div id="chart">
                        <BarChart 
                            type='h'
                            data={
                                data.map((x, i) => {
                                    return {
                                        label: x["ISO3"],
                                        value: parseInt(x[this.props.rankings.indicator+"score"], 10)
                                    }
                                })
                            }
                            height={400}
                            axis
                            max={100}
                        />
                    </div>
                    <div>
                    <Dropdown defaultValue={2017} onChange={this.handleYear} placeholder='Select Year' fluid selection options={yearDropdownOptions}/>
                    </div>
                    <Table basic='very'>
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
                                data.map((x, i) => {
                                    return (<Table.Row key={i}>
                                        <Table.Cell collapsing textAlign='center'>
                                            {x[this.props.rankings.indicator+"rank"]}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {x["Economy"]}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {x["ISO3"]}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {parseFloat(x[this.props.rankings.indicator+"score"])}
                                        </Table.Cell>
                                    </Table.Row>)
                                })
                            }
                        </Table.Body>
                    </Table>
                </div>
            </PageWrap>
        )
    }
}

function mapStateToProps(state) {
    return {
        rankings: state.rankings
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getData: actions.getData,
        setYear: actions.setYear
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps) (Rankings)