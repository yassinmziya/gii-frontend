import React from 'react';

import PageWrap from './components/PageWrap';
import Rankings from './components/Rankings';
import Radar from './components/RadarWrap';

export default class Test extends React.Component {
    render() {
        return (
            <Radar 
                countries={["TZA","CHE","USA"]} 
                year={2017} 
                indicators={["1.", "2.", "3.", "4.", "5."]}
                height={600}
                width={600}
                padding={100}
            />
        )
    }
}