import React, { Component } from 'react';
import { Breadcrumb } from 'antd';

import './BreadcrumbComp.scss'

class BreadcrumbComp extends Component {
    render() {
        return (
            <div className="breadcrumbComp">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.props.menuKey.fatherKey}</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.props.menuKey.currentKey}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );
    }
}

export default BreadcrumbComp;