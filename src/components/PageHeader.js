import React from 'react';

export default class PageHeader extends React.Component {
    render() {
        return (
            <div className="page-header">
                <div id="main">
                    <img src="https://www.globalinnovationindex.org/images/logo.png" alt="GII logo"/>
                </div>
                <div id="sub" className="hide">
                </div>
            </div>
        )
    }
}