import React from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

import PageWrap from './PageWrap';
import '../css/rankings.css';

export default class Rankings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            indicator: '1.rank',
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
            rankedData[parseInt(x[this.state.indicator], 10)] = x
        })
        console.log(rankedData)
        return rankedData
    }

    render() {
        this.getRankedData()

        return (
            <PageWrap>
                <div id="rankings">
                    <div id="chart">
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