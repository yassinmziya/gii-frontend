import React from 'react';
import {Grid, Table, Button, Tab} from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import actions from './actions';
import '../css/country.css';
import AnimatedMap from './WorldMap/components/map/worldmap2';

class Country extends React.Component {
    
    
    handleTransition = () => {
        this.scrollTo(document.body, 1000, 1000)
    }

    componentDidMount = () => {
        console.log(this.props.match)
        this.props.summarize(this.props.match.params.iso3, this.props.report.year)
    }

    scrollTo = (element, to, duration) => {
        var _self = this;
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;
            
        var animateScroll = function(){        
            currentTime += increment;
            var val = _self.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    easeInOutQuad = (t, b, c, d) => {
        t /= d/2;
          if (t < 1) return c/2*t*t + b;
          t--;
          return -c/2 * (t*(t-2) - 1) + b;
    };

    render() {
        const summary = this.props.report.summary
        
        const panes = [
            { menuItem: 'Country Briefing', render: () => <Tab.Pane attached={false}>Hello...</Tab.Pane> },
            { menuItem: 'Country Profile', render: () => <Tab.Pane attached={false}>World...</Tab.Pane> },
          ]

     
        if(!summary) return null;

        return (
            <div id="country" style={{height: '4000px'}}>
                <div id="jumbotron">
                    <AnimatedMap />
                    <div id="summary">
                        <Grid className="rank" relaxed columns={2}>
                            <Grid.Column width={4}>
                                <h1>{summary.GII.rank}</h1>
                            </Grid.Column>
                            <Grid.Column width={12} verticalAlign="middle">
                                <p>{summary.economy} is ranked {summary.GII.rank}th in the GII 2018</p>
                            </Grid.Column>
                        </Grid>

                        <Grid className="rank" relaxed columns={2}>
                            <Grid.Column width={4}>
                                <h1>{summary.incomeGroup.rank}</h1>
                            </Grid.Column>
                            <Grid.Column width={12} verticalAlign="middle">
                                <p>{summary.economy} is ranked {summary.incomeGroup.rank}th among {summary.incomeGroup.total} {summary.incomeGroup.name} countries</p>
                            </Grid.Column>
                        </Grid>

                        <Grid className="rank" relaxed columns={2}>
                            <Grid.Column width={4}>
                                <h1>{summary.region.rank}</h1>
                            </Grid.Column>
                            <Grid.Column width={12} verticalAlign="middle">
                                <p>{summary.economy} is ranked {summary.region.rank}th among {summary.region.total} {summary.region.name} countries</p>
                            </Grid.Column>
                        </Grid>

                        <Table basic="very">
                            <Table.Row>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row></Table.Row>
                        </Table>
                    </div>
                    <div id="chevron">
                        <Button  
                            icon="chevron down" 
                            circular
                            color='grey' 
                            size="massive"
                            onClick={this.handleTransition}
                        />
                    </div>
                </div>
                {/*JUMBOTRON END*/}

                <div id="content">
                    <div className="title">
                        <h1>{summary.economy}</h1>
                    </div>
                    <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {report: state.report}
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        summarize: actions.summarize,
        setGeo: actions.setGeo

    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Country);