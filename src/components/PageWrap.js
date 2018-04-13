import React from 'react';

import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import {Link} from 'react-router-dom';
import '../css/page-wrap.css';

export default class PageWrap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-wrap">
                <PageHeader />
                <div className="page-body">
                    <div id="header">
                        <div className="title">
                            <h1>ANALYSIS</h1>
                        </div>
                        <div>
                            <div className="underline"></div>
                        </div>
                        <div className="subtitle">
                            <h2>EXPLORE ECONOMY REPORTS FROM THE GII 2017</h2>
                        </div>
                        <div className="nav">
                            <div className="table">
                                <ul>
                                    <Link to="/">
                                        <li>VIEW RANKINGS BY INDICATOR</li>
                                    </Link>
                                    <li>/</li>
                                    <li> IN-DEPTH ECONOMY REPORTS</li> 
                                    <li>/</li>
                                    <li>COMPARE TWO ECONOMIES</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {
                        this.props.children
                    }
                </div>
                <PageFooter/>
            </div>
        )
    };
}