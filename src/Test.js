import React from 'react';

import PageWrap from './components/PageWrap';
import Rankings from './components/Rankings';
import WorldMap from './components/WorldMap/App';
import DataVizualization from './components/DataVisualization';
import {Button} from 'semantic-ui-react';

import BarChart from './components/BarChartWrap';
import Radar from './components/RadarWrap';
import RankingsChart from './components/RankingsChartWrap';
import ProfilePage from './components/ProfilePage';

export default class Test extends React.Component {
    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <PageWrap>
            <div>
                <Button circular icon='arrow left' basic color="brown" onClick={this.goBack}/>
                <ProfilePage
                year = '2011'
                iso = 'NZL'
                />
                
                <RankingsChart 
                years={['2017','2016','2015']}
                indicator='GII'
                />
            </div>
            </PageWrap>
        )
    }
}
