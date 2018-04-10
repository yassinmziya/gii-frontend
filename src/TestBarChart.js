import React from 'react';
import axios from 'axios';

import BarChart from './components/BarChart';

export default class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:3001/api/v1/data/2017').then((res) => {
            console.log(res.data);
            var data = res.data.filter(x => x.ISO3.length === 3)
            this.setState({
                
                data: data.map(
                    (x) => {
                        return {label:x.ISO3, value: x["1.1.1rank"]}
                })
            })
        })
    }

    render() {


        return (
            <BarChart
                height={500}
                width={1000}
                type="h"
                data={this.state.data}
            />
        )
    }
}