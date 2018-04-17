import React from 'react';

import PageWrap from './components/PageWrap';
import Rankings from './components/Rankings';
import WorldMap from './components/WorldMap/App';
import DataVizualization from './components/DataVisualization';
import {Button} from 'semantic-ui-react';

import BarChart from './components/BarChartWrap';
import Radar from './components/RadarWrap';

export default class Test extends React.Component {
    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <div>
                <Button circular icon='arrow left' basic color="brown" onClick={this.goBack}/>
                <BarChart 
                countries={['USA','TZA','CHE']}
                indicators={['1.','2.','3.','4.']}
                year={'2015'}
                />
                <br/>
                <br/>
                <br/>
                <br/>
                <Radar 
                    height={700}
                    width={700}
                    padding={100}
                    countries={['USA','TZA','CHE']}
                    indicators={['1.','2.','3.','4.','5.','6.']}
                    year={'2015'}
                />
                <br/>
                <br/>
                <br/>
                <br/>
                <WorldMap />
            </div>
        )
    }
}
