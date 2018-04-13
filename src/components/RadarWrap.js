import React from 'react';
import ReactDOM from 'react-dom';
import Radar from 'react-d3-radar';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class RadarWrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            variables: []
        }

    }

    init = () => {
        axios.all([
            axios.get(`http://localhost:3001/api/v1/data/${this.props.year}`),
            axios.post(`http://localhost:3001/api/v1/categories/${this.props.year}`, this.props.indicators)
            ]
        ).then(axios.spread((dataRes, variablesRes) => {
            var records = dataRes.data.filter((x) => {
                return (this.props.countries).includes(x.ISO3)
            }) 

            this.setState({
                records:records,
                variables: variablesRes.data
            })
        }))
    }
    
    componentDidMount = () => {
        this.init()
    }

    componentDidUpdate = () => {
        var paths = document.getElementsByTagName('path');
        var colors = Array.from(paths).map(x => document.defaultView.getComputedStyle(x).stroke)

    }

    render() {
        if(this.state.variables.length === 0) return null

        var variables = this.state.variables.map((x,i) => {
            return {key: ""+this.props.indicators[i], label: x}
        })

        var sets = this.state.records.map((x,i) => {
            var values = {}
            this.props.indicators.forEach( element => {
                values[element] = this.state.records[i][element+'score']
            });
            return {
                key: x.ISO3,
                label: x.Economy,
                values: values
            };
        });

        return (
            <Radar
                width={this.props.width}
                height={this.props.height}
                padding={this.props.padding}
                domainMax={100}
                highlighted={null}
                onHover={(point) => {
                    if (point) {
                        console.log('hovered over a data point');
                    } else {
                    console.log('not over anything');
                    }
                }}
                data={{
                    variables: variables,
                    sets: sets,
                }}
            />
        )
    }
}

RadarWrap.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.number,
    data: PropTypes.shape(
        {
            countries: PropTypes.arrayOf(PropTypes.string),
            indicators: PropTypes.arrayOf(PropTypes.string),
            year: PropTypes.arrayOf(PropTypes.string)
        }
    )
}

/*<RadarWrap
    width={12}
    data={{
        countries:["USA", "TZA", "AUS"],
        indicators:["4.1.1", "4.1."]
    }}
/>*/