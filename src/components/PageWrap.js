import React from 'react';
import PageHeader from './PageHeader';

export default class PageWrap extends React.Component {
    render() {
        return (
            <div id="page-wrap">
                <PageHeader/>
                {
                    this.props.children
                }
            </div>
        )
    }
}