import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { Button, Dropdown, Menu, Select, Segment, Table , Rating, Header, Icon, Container, Divider } from 'semantic-ui-react';

var prefix = "http://localhost:3001/api"

export default class ProfilePage extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {records: {}, indicatorNames: {}, indicatorCodes: [], economy: ""}
    }

    getData = () => {
        Axios.all([
        Axios.get(prefix + `/v1/data/${this.props.iso}/${this.props.year}`),
        Axios.get(prefix + `/v1/categories/${this.props.year}`),
        Axios.get(prefix + `/v1/countries/${this.props.iso}`)]).then(Axios.spread((res, cat, econ) => {
            var indicatorCodes = []
            for (var code in cat.data){
                if (cat.data.hasOwnProperty(code)) indicatorCodes.push(code)
            }
            console.log(res.data.data)
            console.log(cat.data)
            this.setState({records: res.data.data, indicatorNames: cat.data, indicatorCodes: indicatorCodes, economy: econ.data.iso3})
        }))
    }

    componentDidMount = () => {
        this.getData()
        //this.getVariables()
    }

    isStrength = (rank) => {
        if (isNaN(rank)) return false
        if (rank <= 3) return true
        return false
    }

    render() {
        if (this.state.indicatorCodes.length === 0) return null

        // Each data array -> [Indicator code, indicator name, score, rank]
        var data = this.state.indicatorCodes.map((code) => {
            return [code, this.state.indicatorNames[code], this.state.records[code + "score"], this.state.records[code + "rank"]] 
        })
        console.log(data)
        
        return(
            <div>

            <div>
                    <Segment textAlign='center' >
                    <Header as='h1'>
                    {this.state.economy}
                    <Header sub>{this.props.iso} | {this.props.year}</Header>
                    </Header>
                    </Segment>
            </div>

            <Table  compact size='small'>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell collapsing><Header>Indicator</Header></Table.HeaderCell>
                <Table.HeaderCell collapsing><Header>Score</Header></Table.HeaderCell>
                <Table.HeaderCell collapsing><Header>Rank</Header></Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((ind, i) => {
                    return (<Table.Row key={i}>
                        <Table.Cell collapsing>
                        <Header as={(ind[0].length === 2) ? 'h2' : 'h4'}>
                            <Header.Content>
                                {ind[0] + " "}
                                {this.isStrength(parseInt(ind[3]))
                                ? <Icon name='plus'  color='brown' inverted />
                                : <div/>}
                                <Header.Subheader>{ind[1]}</Header.Subheader>
                            </Header.Content>
                        </Header>
                        </Table.Cell>
                        <Table.Cell >
                            <Header as='h4'>
                            {isNaN(parseFloat(ind[2])) ? ind[2] : parseFloat(ind[2])}
                            </Header>
                        </Table.Cell>
                        <Table.Cell >
                            <Header as='h4'>
                            {isNaN(parseInt(ind[3])) ? ind[3] : parseInt(ind[3])}
                            </Header>
                        </Table.Cell>
                    </Table.Row>)
                    })}
            </Table.Body>
        </Table>
        </div>
        )
    }
}

ProfilePage.propTypes = {
    year : PropTypes.string.isRequired,
    iso : PropTypes.string.isRequired
}