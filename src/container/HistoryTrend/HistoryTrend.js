import React, { Component } from 'react';
import { Card } from 'antd'
import ListHeader from '../../component/ListHeader/ListHeader'
import LineChart from '../../component/LineChart/LineChart'
import './History.scss'

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

const xData = ['00:00','2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00',"22:00"]
const yData = ['1200', '1400', '1008', '1411', '1026', '1288', '1300', '800', '1100', '1000', '1118', '1322']

class HistoryTrend extends Component {
    render() {
        return (
            <div className="history-wrapper">
                <div className='history-data'>
                    <ListHeader listData={listData}></ListHeader>
                </div>
                <div className="line-chart-wrapper" >
                    <Card title="历史趋势" bordered={false}>
                        <LineChart xData={xData} yData={yData}></LineChart>
                    </Card>
                </div>
            </div>
        );
    }
}

export default HistoryTrend;