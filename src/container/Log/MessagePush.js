import React, { Component } from 'react';
import axios from 'axios'
import { Input,Button } from 'antd'

import DateComp from '../../component/DateComp/DateComp'
import TableComp from '../../component/TableComp/TableComp'

const columns = [
    {
        title: '日志ID ',
        dataIndex: 'logId',
    }, 
    {
        title: '附件',
        dataIndex: 'filePath',
    }, 
    
    {
        title: '内容',
        dataIndex: 'msgCont',
    },
    {
        title: '标题',
        dataIndex: 'msgTitle',
    },
    {
        title: '消息类型',
        dataIndex: 'msgType',
    },
    {
        title: '接收人',
        dataIndex: 'receiver',
    },
    {
        title: '开始发送时间 ',
        dataIndex: 'sendBeginTime',
    },
    {
        title: '结束发送时间 ',
        dataIndex: 'sendEndTime',
    },
];

class LoginLog extends Component {
    state = {
        tableData: [],
        total : 0,
        user: '',
        explore: '',
        size: 10,
        current: 1,
    }
    componentDidMount() {
        this.getData(1,10)
    }
    getData(page,size,startDate,stopDate){
        const data = {
            pageSize: size,
            currentPage: page,
            receiver: this.state.user,
            msgTitle: this.state.explore,
            sendBeginTimeStart: startDate,
            sendEndTimeStop: stopDate
        }
        axios.post('/logMsgSend/page', data).then(res => {
            this.setState({
                tableData: res.data.result.result,
                total: res.data.result.totalCount
            })
        })
    }
    pageChange(page, pageSize){
        this.setState({
            current: page
        })
        this.getData(page,pageSize)
    }
    pageSizeChange(current, size){
        this.setState({
            size: size
        })
        this.getData(current, size)
    }
    onChange(key,event){
        this.setState({
            [key]: event.target.value
        });
    }
    handleSearch(){
        this.getData(this.state.current,this.state.size)
    }
    dateChange(start,end){
        this.getData(this.state.current,this.state.size,start,end)
    }
    render() {
        return (
            <div className="login-log-wrapper">
                <DateComp dateChange={this.dateChange.bind(this)}></DateComp>
                <div className="input-wrapper" style={{padding: '0 5px'}}>
                    <div className="input-main" style={{padding: '15px 20px 10px',background:'#fff'}}>
                        <Input placeholder='接收人' style={{ width: 200,marginRight:'20px' }} value={this.state.user} onChange = {this.onChange.bind(this,'user')}></Input>
                        <Input placeholder='标题' style={{ width: 200,marginRight:'20px' }} value={this.state.explore}></Input>
                        <Button type="primary" shape="circle" icon="search" onClick={this.handleSearch.bind(this)} />
                    </div>
                </div>
                <TableComp 
                    dataSource={this.state.tableData} 
                    columns={columns} 
                    changePage={this.pageChange.bind(this)}
                    pageSizeChange={this.pageSizeChange.bind(this)}
                    total={this.state.total}
                    >
                </TableComp>
            </div>
        );
    }
}

export default LoginLog;