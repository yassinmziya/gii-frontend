import React from "react";
import * as d3 from "d3";
// import * as abc from "d3-request";
import Axios from 'axios';
import "../css/tree-profile.css"

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from "./actions";

var prefix = "http://localhost:3001/api"
// const csvfile = require("./test.csv");

class TreeProfile extends React.Component {
    constructor(props) {
        super(props);
        // this.createNewChart = this.createNewChart.bind(this);
        this.state = {
            year: 2016,
            records: [],
            variables: [],
            countries: ['us']};
    }

    getCountries = () => {
        return this.state.countries;
    }

    getData = () => {
        Axios.get(prefix + `/v1/data/${this.props.year}`).then((response) => {
            const data =  response.data;
            var records = data.filter((x)=>{
                return (this.props.iso).includes(x.ISO3)
            })
            console.log(data);
            this.setState((prevState) => ({
                records : records
            }), () => {console.log(this.state.records)})

        })
    }

    getVariables = () => {
        // var ind = this.props.indicators.filter((x) => {
        //     return (x != null);
        // })
        Axios.get(`http://localhost:3001/api/v1/categories/${this.props.year}`).then((res) => {
            console.log(res.data)

            this.setState({
                variables : res.data

            })
        })
    }

    componentDidMount = () => {
        this.getData()
        this.getVariables()
    }
    //
    // componentWillReceiveProps = (nextProps, nextState) => {
    //     console.log('cur',this.props)
    //     console.log('nxt', nextProps)
    //     var update = nextProps.year !== this.props.year
    //         || nextProps.indicators.length !== this.props.indicators.length
    //         || nextProps.countries.length !== this.props.countries.length
    //     console.log(update)
    //     if(update) {
    //         this.getData()
    //         this.getVariables()
    //     }
    // }

    createNewChart = () => {
        var svg = d3.select("svg#haha"),
            width = +svg.attr("style").substring(6, 10),
            height = +svg.attr("style").substring(22, 26),
            g = svg.append("g").attr("transform", "translate(20,0)");
        var experienceName = ["", "Basic 1.0","Alright 2.0","Handy 3.0","Expert 4.0","Guru 5.0"];
        var formatSkillPoints = function (d) {
            return experienceName[d % 6];
        }

        var xScale =  d3.scaleLinear()
            .domain([0,5])
            .range([0, 400]);

        var xAxis = d3.axisTop()
            .scale(xScale)
            .ticks(5)
            .tickFormat(formatSkillPoints);

        var tree = d3.cluster()                 // This D3 API method setup the Dendrogram datum position.
            .size([height, width - 460])    // Total width - bar chart width = Dendrogram chart width
            .separation(function separate(a, b) {
                return a.parent == b.parent            // 2 levels tree grouping for category
                || a.parent.parent == b.parent
                || a.parent == b.parent.parent ? 0.4 : 0.8;
            });

        var stratify = d3.stratify()            // This D3 API method gives cvs file flat data array dimensions.
            .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });


        var realdata = []
        realdata.push({
                "id": "0",
                "name": "zero",
                "score": parseFloat(0),
                // "rank": records[key+"rank"],
                "color": "#800000"
            }
        )
        // realdata.push({
        //         "id": "0.",
        //         "name": "zero",
        //         "score": parseFloat(0),
        //         // "rank": records[key+"rank"],
        //         "color": "#800000"
        //     }
        // )
        var records = this.state.records[0];
        for (var key in this.state.variables){
            var ind = key;
            var name = this.state.variables[key];
            var newrecord = {};
            var color = "#b2eaff";
            if (key.endsWith('.')) {
                var addrecord = {};
                var addkey = key.slice(0, -1);
                realdata.push({
                        "id": "0."+addkey,
                        "name": name,
                        "score": parseFloat(records[key+"score"]),
                        "color": color,
                        "rank": parseInt(records[key+"rank"])
                    }
                )
                color = "#ffdab2";
            }
            realdata.push({
                "id": "0."+key,
                "name": name,
                "score": parseFloat(records[key+"score"]),
                "color": color,
                "rank": parseInt(records[key+"rank"])
            })
        }

        // abc.csv(csvfile, row, function(error, data) {
        var data = realdata;
        console.log(data);
        // if (error) throw error;

        var root = stratify(data);
        tree(root);

        // Draw every datum a line connecting to its parent.
        var link = g.selectAll(".link")
            .data(root.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .attr("d", function(d) {
                return "M" + d.y + "," + d.x
                    + "C" + (d.parent.y + 100) + "," + d.x
                    + " " + (d.parent.y + 100) + "," + d.parent.x
                    + " " + d.parent.y + "," + d.parent.x;
            });

        // Setup position for every datum; Applying different css classes to parents and leafs.
        var node = g.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

        // Draw every datum a small circle.
        node.append("circle")
            .attr("r", 4);

        // Setup G for every leaf datum.
        var leafNodeG = g.selectAll(".node--leaf")
            .append("g")
            .attr("class", "node--leaf-g")
            .attr("transform", "translate(" + 8 + "," + -13 + ")");

        leafNodeG.append("rect")
            .attr("class","shadow")
            .style("fill", function (d) {return d.data.color;})
            .attr("width", 10)
            .attr("height", 30)
            .attr("rx", 20)
            .attr("ry", 10)
            .transition()
            .duration(800)
            .attr("width", function (d) {return xScale(d.data.score/20);});

        leafNodeG.append("text")
            .attr("dy", 20)   //the text in the leaf
            .attr("x", 20)
            .style("text-anchor", "start")
            .text(function (d) {
                return d.data.id.substring(d.data.id.lastIndexOf(".") + 1) +"      "+ d.data.name + ' ' + d.data.score;
            });

        // Write down text for every parent datum
        var internalNode = g.selectAll(".node--internal");
        internalNode.append("text")
            .attr("y", -10)
            .style("text-anchor", "middle")
            .text(function (d) {
                return d.data.id.substring(d.data.id.lastIndexOf(".") + 1) + " " + d.data.name;
            });

        // // Attach axis on top of the first leaf datum.
        var firstEndNode = g.select(".node--leaf");
        // firstEndNode.insert("g")
        //     .attr("class","xAxis")
        //     .attr("transform", "translate(" + 7 + "," + -14 + ")")
        //     .call(xAxis);
        // tick mark for x-axis
        firstEndNode.insert("g")
            .attr("class", "grid")
            .attr("transform", "translate(7," + (height - 15) + ")")
            .call(d3.axisBottom()
                .scale(xScale)
                .ticks(5)
                .tickSize(-height, 0, 0)
                .tickFormat("")
            );

        // Emphasize the y-axis baseline.
        svg.selectAll(".grid").select("line")
            .style("stroke-dasharray","20,1")
            .style("stroke","black");

        // The moving ball
        var ballG = svg.insert("g")
            .attr("class","ballG")
            .attr("transform", "translate(" + 1000 + "," + height/2 + ")");
        ballG.insert("circle")
            .attr("class","shadow")
            .style("fill","steelblue")
            .attr("r", 5);
        ballG.insert("text")
            .style("text-anchor", "middle")
            .attr("dy",5)
            .text("0.0");

        // Animation functions for mouse on and off events.

        d3.selectAll(".node--leaf-g")
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

        function handleMouseOver(d) {
            var leafG = d3.select(this);

            leafG.select("rect")
                .attr("stroke","#4D4D4D")
                .attr("stroke-width","2");


            var ballGMovement = ballG.transition()
                .duration(400)
                .attr("transform", "translate(" + (d.y
                    + xScale(d.data.score/20) + 90) + ","
                    + (d.x + 1.5) + ")");

            ballGMovement.select("circle")
                .style("fill", d.data.color)
                .attr("r", 18);

            ballGMovement.select("text")
                .delay(300)
                .text(d.data.rank);
        }
        function handleMouseOut() {
            var leafG = d3.select(this);

            leafG.select("rect")
                .attr("stroke-width","0");
        }

        // });

        function row(d) {
            return {
                id: d.id,
                name: d.name,
                score: +d.score,
                color: d.color
            };
        }

    }

    render() {
        // this.createNewChart;
        return (
            <div>
                <button onClick={this.createNewChart}>Tree Profile</button>
                <svg id="haha" style={{width: 980, height: 7000}}></svg>
            </div>
        );
    }

}

function mapStateToProps() {
    return {
        // countries: state.countries
    }
}

function matchDispatchToState(dispatch) {
    return bindActionCreators({
        getData: actions.getData,
        getVariables: actions.getVariables,
        createNewChart: actions.createNewChart
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToState)(TreeProfile)