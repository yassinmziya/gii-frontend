import React, { Component } from 'react';
import Radar from './components/Radar'
import { Dropdown } from 'semantic-ui-react'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            year: 2016,
            categories: ['1.1.','2.1.', '3.1.','4.1.'],
            countries: ['CHE','USA']
        }
    }

    onChange = (event, data) => {
        // /console.log(data)
        this.setState({
            year: data.value
        })
        console.log(this.state.year)
    }

    render() {
    return (
        <div>
            <Radar 
                categories ={this.state.categories}
                countries ={this.state.countries}
                year={this.state.year}
            />
        </div>
    );
  }
}

export default App;