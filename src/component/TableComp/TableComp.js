import React, { Component } from 'react'
import { Table,Card } from 'antd'

import './TableComp.scss'

class TableComp extends Component {
    state={
        pageSize: 10,
        current:1
    }
    onChange(page, pageSize){
        this.setState({
            current: page
        })
        this.props.changePage(page, pageSize)
    }
    onShowSizeChange(current, size){
        this.setState({
            pageSize: size
        })
        this.props.pageSizeChange(current, size)
    }
    render() {
        return (
            <div className="table-comp-wrapper">
                <Card bordered={false}>
                    <Table 
                        dataSource={this.props.dataSource} 
                        columns={this.props.columns} 
                        rowKey={()=>Math.random()}
                        pagination={{
                            current : this.state.current,
                            pageSize : this.state.pageSize,
                            total : this.props.total,
                            showTotal : total=>`共${total}条`,
                            showSizeChanger: true,
                            onChange: this.onChange.bind(this),
                            onShowSizeChange: this.onShowSizeChange.bind(this)
                        }}
                        />
                </Card>
            </div>
        )
    }
}

export default TableComp