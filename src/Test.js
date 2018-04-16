import React from 'react';

import PageWrap from './components/PageWrap';
import Rankings from './components/Rankings';
import BarChart from './components/BarChartWrap';
import Radar from './components/Radar';

export default class Test extends React.Component {
    render() {
        return <BarChart year='2014-c' countries = {['USA', 'TZA', 'AUS', 'FRA', 
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
        'CAN',
        'CCK',
        'CHE',
        'CHL',
        'CHN'*/
    ]} indicators = {['5.1', '4.1', '3.1.1']}/>
    }
}