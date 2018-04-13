import React from 'react';

import PageWrap from './components/PageWrap';
import Rankings from './components/Rankings';
import BarChart from './components/BarChartWrap';

export default class Test extends React.Component {
    render() {
        return <BarChart year={2017} countries = {['USA', 'TZA', 'AUS', 'FRA', 'GBR', 
        /*'ABW',
        'AFG',
        'AGO',
        'AIA',
        'ALA',
        'ALB',
        'AND',
        'ANT',
        'ARE',
        'ARG',
        'ARM',
        'ASM',
        'ATF',
        'ATG',
        'AUT',
        'AZE',
        'BDI',
        'BEL',
        'BEN',
        'BFA',
        'BGD',
        'BVT',
        'CAF',
        'CAN',
        'CCK',
        'CHE',
        'CHL',
        'CHN'*/
    ]} indicators = {['5.1', '4.1', '3.1.1']}/>
    }
}