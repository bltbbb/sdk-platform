import React, { Component } from 'react';
import axios from 'axios'
import { Input,Button } from 'antd'

import DateComp from '../../component/DateComp/DateComp'
import TableComp from '../../component/TableComp/TableComp'

const columns = [
    {
        title: '客户端id ',
        dataIndex: 'clientIp',
    }, 
    {
        title: '浏览器类型',
        dataIndex: 'browserType',
    }, 
    
    {
        title: '登录时间',
        dataIndex: 'loginTime',
    },
    {
        title: '服务器ip',
        dataIndex: 'serverIp',
    },
    {
        title: '登录名',
        dataIndex: 'mainAccount',
    },
    {
        title: '客户端ua',
        dataIndex: 'userAgent',
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
            mainAccount: this.state.user,
            browserType: this.state.explore,
            startDate: startDate,
            stopDate: stopDate
        }
        axios.post('/logLogin/page', data).then(res => {
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
                        <Input placeholder='操作用户' style={{ width: 200,marginRight:'20px' }} value={this.state.user} onChange = {this.onChange.bind(this,'user')}></Input>
                        <Input placeholder='浏览器' style={{ width: 200,marginRight:'20px' }} value={this.state.explore}></Input>
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