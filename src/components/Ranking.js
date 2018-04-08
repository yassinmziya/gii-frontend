import React from 'react';
import axios from 'axios';
import {Grid, Table, Dropdown} from 'semantic-ui-react';

var request_prefix = 'http://localhost:3001/'

export default class Rankings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: 2017,
            countries: null,
            ranking: null
        }
    }

    allCountries = () => {
        axios.get(request_prefix + 'api/v1/countries').then((response) => {
            // console.log(response.data.countries)
            this.setState({
                countries: response.data.countries
            })
            console.log(this.state)
        }).catch((err) => {
            console.log(err)
        });
    }

    componentDidMount = () => {
        this.allCountries();
    }

    render() {
        // console.log(this.state)
        var countryOpts = this.state.countries && this.state.countries.map((x) => {
                return {
                    key: x.iso3,
                    value: x.iso3,
                    text: x.country,
                }
            }
        )

        var yearOpts = [2017, 2016, 2015, '2014p', '2014c', 2013, 2012, 2011].map(x => 
            {
                key:x
                value:x
                text:x
            }
        )

        
        return (
            <Grid className="rankings">
                <Grid.Row columns="equal">
                    <Grid.Column>
                        <Dropdown 
                            placeholder="Economy"
                            options={countryOpts}
                            selection
                            fluid
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Dropdown 
                            placeholder="GII Indicator"
                            selection
                            fluid
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered color="blue">
                    <Grid.Column columns={16}>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}