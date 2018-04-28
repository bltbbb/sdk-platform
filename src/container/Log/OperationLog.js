import React, { Component } from 'react';
import axios from 'axios'
import { Input,Card,Button,Select } from 'antd'

import DateComp from '../../component/DateComp/DateComp'
import TableComp from '../../component/TableComp/TableComp'

const { Option } = Select

const columns = [
    {
        title: '日志ID ',
        dataIndex: 'logId',
        width: 100
    }, 
    {
        title: '浏览器类型',
        dataIndex: 'browserType',
        width: 100
    }, 
    
    {
        title: '客户端IP',
        dataIndex: 'clientIp',
        width: 100
    },
    {
        title: '是否报错',
        render: (text, record) => {
            return (
                <span>
                    {record.isError === 1 ? '是': '否'}
                </span>
            )
        }
    },
    {
        title: '登录名',
        dataIndex: 'mainAccount',
        width: 100
    },
    {
        title: '详细内容',
        dataIndex: 'oprCont',
    },
    {
        title: '操作对象',
        dataIndex: 'oprObj',
    },
    {
        title: '操作类型',
        dataIndex: 'oprType',
        width: 100
    },
    {
        title: '服务IP',
        dataIndex: 'serverIp',
        width: 100
    },
    {
        title: '用户UA',
        dataIndex: 'userAgent',
    },
    {
        title: '操作时间',
        dataIndex: 'oprBeginTime',
        width: 100
    },
];

class OperationLog extends Component {
    state = {
        tableData: [],
        total : 0,
        user: '',
        isError: [],
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
            isError: this.state.explore,
            oprBeginTimeStart: startDate,
            oprEndTimeStop: stopDate
        }
        axios.post('/logOperate/page', data).then(res => {
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
                        <Select placeholder="是否报错" style={{ width: 200,marginRight:'20px' }} allowClear value={this.state.isError} onChange={value=>this.setState({isError:value})}>
                            <Option value="1">是</Option>
                            <Option value="-1">否</Option>
                        </Select>
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

export default OperationLog;