import React, { Component } from 'react';
import Radar from './components/Radar'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            year: 2017,
            categories: ['1.2.','2.2.','3.2.','4.2.','5.2.','6.2.','7.2.'],
            countries: ['tza', 'egy']
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