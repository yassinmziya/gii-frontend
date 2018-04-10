import React from 'react';

export default class PageHeader extends React.Component {
    render() {
        return (
            <div className="page-header">
                <div id="nav">
                    {
                        this.props.children
                    }
                </div>
                <div id="sub-menu" className="hide">
                </div>
            </div>
        )
    };
}