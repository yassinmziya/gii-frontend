import React from 'react';

import PageWrap from './components/PageWrap';
import Rankings from './components/Rankings';
import DataVizualization from './components/DataVisualization';

import BarChart from './components/BarChartWrap';
import Radar from './components/RadarWrap';

export default class Test extends React.Component {
    render() {
        return (
            <div>
                <BarChart 
                countries={['USA','TZA','CHE']}
                indicators={['1.','2.','3.','4.','5.','6.']}
                year={'2015'}
                />
                <br/>
                <br/>
                <br/>
                <br/>
                <Radar 
                    height={700}
                    width={700}
                    padding={70}
                    countries={['USA','TZA','CHE']}
                    indicators={['1.','2.','3.','4.','5.','6.']}
                    year={'2015'}
                />
            </div>
        )
    }
}
