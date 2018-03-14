import ReactD3Radar from 'react-d3-radar';
import React from 'react'
import Axios from 'axios'

export default class Radar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                variables:[
                    {key: "Institutions", label: "Institutions"},
                    {key: "Human capital and research", label: "Human capital and research"},
                    {key: "Infrastructure", label: "Infrastructure"}
                ], 
                sets:[
                    {key: "USA", label: "United States of America", values: {"1.score": "86.25", "2.score": "57.21", "3.score": "61.04"}},
                    {key: "TZA", label: "Tanzania, United Republic of", values: {"1.score": "53.87", "2.score": "9.5", "3.score": "36.06"}}
                ]
            },
            year: 2017
        }
        this.getVariables = this.getVariables.bind(this)
        this.getSets = this.getSets.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    getVariables(categories, year) {
        var promises = categories.map(category => {
            return Axios.get(`http://localhost:3001/api/v1/categories/${year}/${category}`)
        })

        return Axios.all(promises).then(function(results) {
            let temp = results.map((r, index) => {
                var key = `${categories[index]}score`
                return {
                    key: key,
                    label: r.data.label
                }
            });
            //console.log(temp)
            return temp
        })
   }

    getSets(countries, categories, year) {
        var promises = countries.map(country => {
            return Axios.get(`http://localhost:3001/api/v1/data/${country}/${year}`)
        })

        return Axios.all(promises).then(function(results) {
            let temp = results.map(r => {
                var country_data = r.data.data
                var valueObj = {}
                categories.forEach(category => {
                    valueObj[`${category}score`] = parseInt(country_data[`${category}score`], 10)
                })
                return {
                        key:country_data.ISO3, 
                        label:r.data.data.Economy,
                        values: valueObj
                    }
                }
            )
            //console.log('temp',temp)
            return temp
        })
    }

    componentDidMount() {
        var self = this
        Axios.all([this.getVariables(['1.', '2.', '3.2.', '4.'], this.state.year), this.getSets(['tza','ind', 'usa'], ['1.', '2.', '3.2.','4.'], this.state.year)])
            .then((results) => {
                var variables = results[0]
                var sets = results[1]
                console.log(variables)
                console.log(sets)

                self.setState({
                    data:{variables:variables, sets:sets},
                    year: this.state.year
                })
            }
        )
    }

    render() {
        //console.log(this.state.data)
        return (
            <ReactD3Radar
                width={500}
                height={500}
                padding={70}
                domainMax={100}
                highlighted={null}
                onHover={
                    (point) => {
                        if (point) {
                            console.log('hovered over a data point');
                        } else {
                            console.log('not over anything');
                        }
                    }
                }
                data={this.state.data}
            />
        
        )
    }
}