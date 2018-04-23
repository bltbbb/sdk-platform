import React, { Component } from 'react'
import { Card,Tooltip,Icon,Row, Col } from 'antd'
import './ListHeader.scss'

class ListHeader extends Component {
    render() {
        return (
            <div className="list-header">
                {this.props.listData.map(v=>(
                    <div className="cart-wrapper" key={Math.random()}>
                        <Card bordered={false} hoverable={true}>
                            <div className='title'>
                                <h1>
                                    {v.text}
                                </h1>
                                <Tooltip title="prompt text">
                                    <span className='tips'><Icon type="exclamation-circle-o" /></span>
                                </Tooltip>
                            </div>
                            <p className='value'>{v.value}</p>
                        </Card>
                    </div>
                ))}
            </div>
        );
    }
}

export default ListHeader;