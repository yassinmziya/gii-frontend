import React from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

import PageWrap from './PageWrap';
import BarChart from './BarChart';
import '../css/rankings.css';

export default class Rankings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            indicator: '4.',
            year: 2017
        }
    }

    componentDidMount = () => {
        axios.get(`http://localhost:3001/api/v1/data/${this.state.year}`).then((res) => {
            //console.log(res);
            this.setState({
                data: res.data
            });
        });
    }

    getRankedData = () => {
        var data = this.state.data.filter(x => x.ISO3.length === 3);
        var rankedData = [];
        data.forEach((x) => {
            rankedData[parseInt(x[this.state.indicator+"rank"], 10)] = x
        })
        console.log(rankedData)
        return rankedData
    }

    render() {
        var data = this.getRankedData()

        return (
            <PageWrap>
                <div id="rankings">
                    <div id="chart">
                        <BarChart 
                            type='h'
                            data={
                                data.map((x) => {
                                    console.log(x)
                                    return {
                                        label: x["ISO3"],
                                        value: x[this.state.indicator+"score"]
                                    }
                                })
                            }
                            height={400}
                            axis
                        />
                    </div>

                    <Table basic='very'>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell collapsing>Rank</Table.HeaderCell>
                            <Table.HeaderCell collapsing>Country</Table.HeaderCell>
                            <Table.HeaderCell collapsing>Score</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>
                        <Table.Body>
                        </Table.Body>
                    </Table>
                </div>
            </PageWrap>
        )
    }
}