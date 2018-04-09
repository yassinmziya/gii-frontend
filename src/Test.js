import React from 'react';

import BarChart from './components/BarChart';

export default class Test extends React.Component {
    render() {
        return (
            <BarChart
                height={500}
                width={1000}
                type="h"
            />
        )
    }
}