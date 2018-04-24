import React, { Component } from 'react'
import { Table,Card } from 'antd'

import './TableComp.scss'



class TableComp extends Component {
    render() {
        return (
            <div className="table-comp-wrapper">
                <Card title="详细数据" bordered={false}>
                    <Table dataSource={this.props.dataSource} columns={this.props.columns} />
                </Card>
            </div>
        )
    }
}

export default TableComp