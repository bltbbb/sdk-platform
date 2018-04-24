import React, { Component } from 'react';
import { Card } from 'antd'

import ListHeader from '../../component/ListHeader/ListHeader'
import LineChart from '../../component/LineChart/LineChart'
import TableComp from '../../component/TableComp/TableComp'

import './History.scss'

//头部list 数据
const listData = [
    {
        text: '在线应用数',
        value: 325
    },
    {
        text: '在线应用数',
        value: 325
    },
    {
        text: '在线应用数',
        value: 325
    },
    {
        text: '在线应用数',
        value: 325
    },
    {
        text: '在线应用数',
        value: 325
    },
    {
        text: '在线应用数',
        value: 325
    },
    {
        text: '在线应用数',
        value: 325
    },
]

//chart 数据
const xData = ['00:00','2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00',"22:00"]
const yData = ['1200', '1400', '1008', '1411', '1026', '1288', '1300', '800', '1100', '1000', '1118', '1322']

//表格数据
const dataSource = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  }, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }];
  
const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
}];

class HistoryTrend extends Component {
    render() {
        return (
            <div className="history-wrapper">
                <div className='history-data'>
                    <ListHeader listData={listData}></ListHeader>
                </div>
                <LineChart xData={xData} yData={yData}></LineChart>
                <TableComp dataSource={dataSource} columns={columns}></TableComp>
            </div>
        );
    }
}

export default HistoryTrend;