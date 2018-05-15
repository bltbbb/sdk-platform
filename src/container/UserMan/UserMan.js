import React, { Component } from 'react'
import { Card, Input, Form, Button, Select, Table, Modal, DatePicker, message, Tabs, Transfer, Tree } from 'antd'
import axios from 'axios'
import moment from 'moment'

import ChangePassword from './ChangePassword'
import TableComp from '../../component/TableComp/TableComp'
import './UserMan.scss'

const FormItem = Form.Item
const { Option } = Select
const { Column } = Table
const { TextArea } = Input
const { RangePicker } = DatePicker
const { TabPane } = Tabs
const { TreeNode } = Tree

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 17, offset: 1 }
}

const panelColumns = [
    {
        title: '面板名称',
        dataIndex: 'panelName',
    },
    {
        title: '描述',
        dataIndex: 'remark',
    },

    {
        title: '创建人',
        dataIndex: 'createUser',
    },
]
const elementColumns = [
    {
        title: '元素名称',
        dataIndex: 'elementName',
    },
    {
        title: '描述',
        dataIndex: 'remark',
    },

    {
        title: '创建人',
        dataIndex: 'createUser',
    },
]
const dataColumns = [
    {
        title: 'json数据',
        render: (text, record) => {
            return (
                <span>
                    <pre><code>{JSON.stringify(JSON.parse(record.jsonInfo.replace( /^\s*/, '')),null,4)}</code></pre>
                </span>
            )
        }
    },
    {
        title: '描述',
        dataIndex: 'remark',
    }
]

class UserMan extends Component {
    state = {
        tableData: [],
        total: 0,
        size: 10,
        current: 1,
        size1: 10,
        current1: 1,
        total1: 0,
        visible: false,
        visible1: false,
        visible2: false,
        id: 0,
        isEdite: false,
        selectedRowKeys: [],
        selectedRowKeys1: [],
        userId: '',
        transferData: [],
        targetKeys: [],
        treeData: [],
        selectedKeys: [],
        panelCode: '',
        panelName: '',
        elementCode: '',
        elementName: '',
        panelTableData: [],
        elementTableData: [],
        dataTableData: []
    }
    componentDidMount() {
        this.getUser()
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const data = this.props.form.getFieldsValue()
    }
    getUser() {
        const data = {
            pageSize: this.state.size,
            currentPage: this.state.current
        }
        axios.post('/user/page', data).then((res) => {
            if (res.data.status === 0) {
                this.setState({
                    total: res.data.result.totalCount,
                    tableData: res.data.result.result
                })
            }
            else {

            }
        }, (err) => {

        })
    }
    resetForm = (e) => {
        e.preventDefault()
        this.props.form.resetFields()
    }
    pageChange(page, pageSize) {
        this.setState({
            current: page
        })
        this.getData(page, pageSize)
    }
    pageSizeChange(current, size) {
        this.setState({
            size: size
        })
        this.getData(current, size)
    }
    pageChange1(page, pageSize) {
        this.setState({
            current1: page
        })
        this.getDataTableData(page, pageSize)
    }
    pageSizeChange1(current, size) {
        this.setState({
            size1: size
        })
        this.getDataTableData(current, size)
    }
    getTreeData() {
        axios.get('/menu/queryByUserId', {
            params: {
                userId: this.state.userId
            }
        }).then((res) => {
            if (res.data.status === 0) {
                this.setState({
                    visible2: true,
                    treeData: res.data.result.result
                })
            } else {
                message.error(res.data.result.result.message)
            }
        }, (err) => {

        })
    }
    onSelect = (selectedKeys) => {
        this.setState({ selectedKeys });
        const data = {
            userId: this.state.userId,
            privVisitId: selectedKeys[0]
        }
        axios.post('/resPanel/queryVisitPanel', data).then((res) => {
            if (res.data.status === 0) {
                this.panelTableData = res.data.result.result
            } else {

            }
        }, (err) => {

        })
    }
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.privVisitId} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }
    handelAdd = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const rangeValue = values['valueTime'] ? values['valueTime'] : ''
                const dateValue = values['birthday'] ? values['birthday'] : ''
                const data = { ...values, 'birthday': dateValue ? values['birthday'].format('YYYY-MM-DD') : values['birthday'], 'valueTime': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')], validBegin: rangeValue[0].format('YYYY-MM-DD'), validEnd: rangeValue[1].format('YYYY-MM-DD') }
                if (this.state.isEdite) {
                    data.userId = this.state.userId
                    axios.put('/user', data).then(res => {
                        if (res.data.status === 0) {
                            this.getUser()
                            message.success('修改成功')
                            this.setState({
                                visible1: false,
                            });
                        } else {
                            message.error('修改失败')
                        }
                    })
                } else {
                    axios.post('/user', data).then(res => {
                        if (res.data.status === 0) {
                            this.getUser()
                            message.success('添加成功')
                            this.setState({
                                visible: false,
                            });
                        } else {
                            message.error('添加失败')
                        }
                    })
                }
            }
        });
    }
    handleOk = (e) => {
        this.handelAdd(e)
    }
    handleCancel = (e) => {
        this.setState({
            visible: false
        })
    }
    handleOk1 = (e) => {
    }
    handleCancel1 = (e) => {
        this.setState({
            visible1: false,
        })
    }
    handleOk2 = (e) => {
    }
    handleCancel2 = (e) => {
        this.setState({
            visible2: false,
        })
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    onSelectChange1 = (selectedRowKeys1) => {
        this.setState({ selectedRowKeys1 });
    }
    panelRowClick = (record) => {
        // 设置paneltable选中
        const selectedRowKeys1 = [record.id]
        this.setState({ selectedRowKeys1 });

        let data = {
            privVisitId: this.state.selectedKeys[0],
            panelId: record.panelId
        }
        axios.post('/element/queryVisitElement', data).then((res) => {
            if (res.data.status === 0) {
                this.elementTableData = res.data.result.result
            } else {

            }
        }, (err) => {

        })
    }
    configUser(data) {
        this.setState({
            visible1: true,
            isEdite: true,
            userId: data.userId
        })
        this.props.form.setFieldsValue({
            nickName: data.nickName,
            userName: data.userName,
            sex: data.sex + '',
            postcode: data.postcode,
            address: data.address,
            remark: data.remark,
            valueTime: [moment(data.validBegin), moment(data.validEnd)],
            email: data.email,
            birthday: data.birthday ? moment(data.birthday) : null,
            phoneNo: data.phoneNo,
            passWord: data.passWord
        })
        this.getTransferData()
    }
    handelConfig = (e) => {
        this.handelAdd(e)
    }
    getTransferData() {
        axios.post('/role/page', { pageSize: 100, currentPage: 1 }).then(res => {
            if (res.data.status === 0) {
                let data = []
                res.data.result.result.forEach((item, index) => {
                    data.push({
                        title: item.roleName,
                        key: item.roleId
                    });
                });
                this.setState({
                    transferData: data,
                });
            } else {
                message.error('请求失败')
            }
        })
    }
    getTransferTarget() {
        axios.post('/roleUser/queryBySelected').then(res => {
            if (res.data.status === 0) {
                let data = []
                res.data.result.result.forEach((item, index) => {
                    data.push(item.roleId);
                });
                this.setState({
                    targetKeys: data,
                });
            } else {
                message.error('请求失败')
            }
        })
    }
    transferChange = (targetKeys) => {
        this.setState({ targetKeys });
    }
    postTransfer() {
        let data = {
            userId: this.userId,
            roleId: this.targetKeys.join(',')
        }
        axios.post('/roleUser/updateCodeBatch', data).then((res) => {
            if (res.data.status === 0) {
                message.success('修改成功')
                this.getTransferData()
                this.getTransferTarget()
            } else {
                this.$message('修改失败')
            }
        }, (err) => {

        })
    }
    jurisdiction(data) {
        this.setState({
            userId: data.userId
        }, () => {
            this.getTreeData()
            this.getDataTableData()
        })
    }
    onChange(key, e) {
        this.setState({
            [key]: e.target.value
        })
    }
    searchPanel = () => {

    }
    searchElement = () => {

    }
    getDataTableData() {
        let data = {
            userId: this.state.userId,
            pageSize: this.state.size1,
            currentPage: this.state.current1,
          }
        axios.post('/dataauth/queryByUser', data).then((res) => {
            if (res.data.status === 0) {
                this.setState({
                    total1 : res.data.result.totalCount
                })
                this.setState({
                    dataTableData: res.data.result.result
                })
            } else {

            }
        }, (err) => {

        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { selectedRowKeys, selectedRowKeys1 } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const rowSelection1 = {
            selectedRowKeys: selectedRowKeys1,
            onChange: this.onSelectChange1,
            hideDefaultSelections: true,
            type: 'radio'
        };
        return (
            <div className="userMan">
                <div className="search-wrapper">
                    <Card>
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label="用户昵称"
                            >
                                {getFieldDecorator('name', {
                                    rules: [{ required: false }],
                                })(
                                    <Input></Input>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="用户性别"
                                style={{ width: 245 }}
                            >
                                {getFieldDecorator('topSex', {
                                    rules: [{ required: false }],
                                })(
                                    <Select>
                                        <Option value="0">男</Option>
                                        <Option value="1">女</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">查询</Button>
                            </FormItem>
                            <FormItem>
                                <Button onClick={this.resetForm}>重置</Button>
                            </FormItem>
                        </Form>
                    </Card>
                </div>
                <div className="table-wrapper">
                    <Card>
                        <Button type="primary" style={{ marginBottom: 15, marginRight: 15 }} onClick={() => { this.setState({ visible: true, isEdite: false }); this.props.form.resetFields() }}>新增</Button>
                        <Button type="primary" style={{ marginBottom: 15 }}>删除</Button>
                        <Table
                            dataSource={this.state.tableData}
                            rowKey={record => record.userId}
                            rowSelection={rowSelection}
                            pagination={{
                                current: this.state.current,
                                pageSize: this.state.pageSize,
                                total: this.state.total,
                                showTotal: total => `共${total}条`,
                                showSizeChanger: true,
                                onChange: this.pageChange.bind(this),
                                onShowSizeChange: this.pageSizeChange.bind(this)
                            }}
                        >
                            <Column
                                title="昵称"
                                dataIndex="nickName"
                            />
                            <Column
                                title="登录名"
                                dataIndex="userName"
                            />
                            <Column
                                title="性别"
                                render={(text, record) => {
                                    return (
                                        <span>
                                            {record.sex === 1 ? '男' : '女'}
                                        </span>
                                    )
                                }}
                            />
                            <Column
                                title="邮箱"
                                dataIndex="email"
                            />
                            <Column
                                title="生日"
                                dataIndex="birthday"
                            />
                            <Column
                                title="手机"
                                dataIndex="phoneNo"
                            />
                            <Column
                                title="开始时间"
                                dataIndex="validBegin"
                            />
                            <Column
                                title="结束时间"
                                dataIndex="validEnd"
                            />
                            <Column
                                title="操作"
                                render={(text, record) => {
                                    return (
                                        <div>
                                            <Button style={{ marginRight: 15 }} onClick={() => this.configUser(record)}>配置</Button>
                                            <Button onClick={() => this.jurisdiction(record)}>权限查看</Button>
                                        </div>

                                    )
                                }}
                            />
                        </Table>
                    </Card>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        width={700}
                        wrapClassName="userMan-modal"
                    >
                        <Form layout="inline" onSubmit={this.handelAdd}>
                            <FormItem {...formItemLayout} label="用户昵称" colon={false}>
                                {getFieldDecorator('nickName', {
                                    rules: [{ required: true, message: '请填写用户昵称' }],
                                })(
                                    <Input placeholder="用户昵称" />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="登录名称" colon={false}>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '请填写登录名称' }],
                                })(
                                    <Input placeholder="登录名称" />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="性别" colon={false}>
                                {getFieldDecorator('sex', {
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <Select>
                                        <Option value="1">男</Option>
                                        <Option value="2">女</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="密码" colon={false}>
                                {getFieldDecorator('passWord', {
                                    rules: [{ required: true, message: '请填写密码' }],
                                })(
                                    <Input placeholder="密码" />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="手机" colon={false}>
                                {getFieldDecorator('phoneNo', {
                                    rules: [{ required: true, message: '请填写手机' }, { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请填写正确的手机号' }],
                                    validateTrigger: 'onBlur'
                                })(
                                    <Input placeholder="手机" />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="邮箱" colon={false}>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, type: 'email', message: '请填写邮箱' }],
                                })(
                                    <Input placeholder="邮箱" />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="生日" colon={false}>
                                {getFieldDecorator('birthday', {
                                    rules: [{ required: false, message: '请选择生日' }],
                                })(
                                    <DatePicker />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="邮编" colon={false}>
                                {getFieldDecorator('postcode', {
                                    rules: [{ required: false, message: '请填写邮编' }],
                                })(
                                    <Input placeholder="邮编" />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="地址" colon={false}>
                                {getFieldDecorator('address', {
                                    rules: [{ required: false, message: '请填写地址' }],
                                })(
                                    <Input placeholder="地址" />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="有效时间" colon={false}>
                                {getFieldDecorator('valueTime', {
                                    rules: [{ required: true, message: '请选择有效时间' }],
                                })(
                                    <RangePicker />
                                )}
                            </FormItem>
                            <FormItem label="备注" colon={false} style={{ width: '100%' }}>
                                {getFieldDecorator('remark', {
                                    rules: [{ required: false, }],
                                })(
                                    <TextArea autosize={{ minRows: 2 }} placeholder="备注" />
                                )}
                            </FormItem>
                        </Form>
                    </Modal>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible1}
                        onOk={this.handleOk1}
                        onCancel={this.handleCancel1}
                        width={700}
                        wrapClassName="tabs-modal"
                        footer={null}
                    >
                        <Tabs type="card">
                            <TabPane tab="用户资料" key="1">
                                <Form layout="inline" onSubmit={this.handelConfig}>
                                    <FormItem {...formItemLayout} label="用户昵称" colon={false}>
                                        {getFieldDecorator('nickName', {
                                            rules: [{ required: true, message: '请填写用户昵称' }],
                                        })(
                                            <Input placeholder="用户昵称" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="登录名称" colon={false}>
                                        {getFieldDecorator('userName', {
                                            rules: [{ required: true, message: '请填写登录名称' }],
                                        })(
                                            <Input placeholder="登录名称" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="性别" colon={false}>
                                        {getFieldDecorator('sex', {
                                            rules: [{ required: true, message: '请选择' }],
                                        })(
                                            <Select>
                                                <Option value="1">男</Option>
                                                <Option value="2">女</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    {/* <FormItem {...formItemLayout} label="密码" colon={false}>
                                        {getFieldDecorator('passWord', {
                                            rules: [{ required: true, message: '请填写密码' }],
                                        })(
                                            <Input placeholder="密码" />
                                        )}
                                    </FormItem> */}
                                    <FormItem {...formItemLayout} label="手机" colon={false}>
                                        {getFieldDecorator('phoneNo', {
                                            rules: [{ required: true, message: '请填写手机' }, { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请填写正确的手机号' }],
                                            validateTrigger: 'onBlur'
                                        })(
                                            <Input placeholder="手机" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="邮箱" colon={false}>
                                        {getFieldDecorator('email', {
                                            rules: [{ required: true, type: 'email', message: '请填写邮箱' }],
                                        })(
                                            <Input placeholder="邮箱" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="生日" colon={false}>
                                        {getFieldDecorator('birthday', {
                                            rules: [{ required: false, message: '请选择生日' }],
                                        })(
                                            <DatePicker />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="邮编" colon={false}>
                                        {getFieldDecorator('postcode', {
                                            rules: [{ required: false, message: '请填写邮编' }],
                                        })(
                                            <Input placeholder="邮编" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="地址" colon={false}>
                                        {getFieldDecorator('address', {
                                            rules: [{ required: false, message: '请填写地址' }],
                                        })(
                                            <Input placeholder="地址" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="有效时间" colon={false}>
                                        {getFieldDecorator('valueTime', {
                                            rules: [{ required: true, message: '请选择有效时间' }],
                                        })(
                                            <RangePicker />
                                        )}
                                    </FormItem>
                                    <FormItem label="备注" colon={false} style={{ width: '100%' }}>
                                        {getFieldDecorator('remark', {
                                            rules: [{ required: false, }],
                                        })(
                                            <TextArea autosize={{ minRows: 2 }} placeholder="备注" />
                                        )}
                                    </FormItem>
                                </Form>
                                <div className="btn-wrapper">
                                    <Button style={{ marginRight: 15 }} type="primary" onClick={this.handelConfig}>确定</Button>
                                    <Button onClick={() => this.setState({ visible1: false })}>取消</Button>
                                </div>
                            </TabPane>
                            <TabPane tab="角色分配" key="2">
                                <Transfer
                                    dataSource={this.state.transferData}
                                    showSearch
                                    listStyle={{
                                        width: 250,
                                        height: 300,
                                    }}
                                    targetKeys={this.state.targetKeys}
                                    onChange={this.transferChange}
                                    render={item => item.title}
                                    className="userTransfer"
                                />
                                <div className="btn-wrapper">
                                    <Button style={{ marginRight: 15 }} type="primary" onClick={this.postTransfer}>确定</Button>
                                    <Button onClick={() => this.setState({ visible1: false })}>取消</Button>
                                </div>
                            </TabPane>
                            <TabPane tab="密码修改" key="3">
                                <ChangePassword userId={this.state.userId}></ChangePassword>
                            </TabPane>
                        </Tabs>
                    </Modal>
                    <Modal
                        title="用户维护"
                        visible={this.state.visible2}
                        onOk={this.handleOk2}
                        onCancel={this.handleCancel2}
                        width={800}
                        wrapClassName="just-modal"
                        footer={null}
                        maskClosable={true}
                    >
                        <Tabs type="card">
                            <TabPane tab="资源权限" key="1">
                                <div className="just-left">
                                    {this.state.treeData.length > 0 ?
                                        <Tree
                                            onSelect={this.onSelect}
                                        >
                                            {this.renderTreeNodes(this.state.treeData)}

                                        </Tree>
                                        : <span>无数据</span>}
                                </div>
                                <div className="just-right">
                                    <div className="just-right-top">
                                        <div className="input-wrapper" style={{ padding: '0 5px' }}>
                                            <div className="input-main" style={{ marginLeft: 20 }}>
                                                <Input placeholder='接收人' style={{ width: 220, marginRight: '20px' }} value={this.state.panelCode} onChange={this.onChange.bind(this, 'panelCode')}></Input>
                                                <Input placeholder='标题' style={{ width: 220, marginRight: '20px' }} value={this.state.panelName} onChange={this.onChange.bind(this, 'panelName')}></Input>
                                                <Button type="primary" shape="circle" icon="search" onClick={this.searchPanel} />
                                            </div>
                                        </div>
                                        <div className="table-wrapper">
                                            <Table
                                                dataSource={this.state.panelTableData}
                                                columns={panelColumns}
                                                pagination={false}
                                                rowKey={record => record.id}
                                                rowSelection={rowSelection1}
                                                onRow={(record) => {
                                                    return {
                                                        onClick: () => { this.panelRowClick(record) },       // 点击行
                                                    };
                                                }}
                                            >
                                            </Table>
                                        </div>
                                    </div>
                                    <div className="just-right-bottom">
                                        <div className="input-wrapper" style={{ padding: '0 5px' }}>
                                            <div className="input-main" style={{ marginLeft: 20 }}>
                                                <Input placeholder='接收人' style={{ width: 220, marginRight: '20px' }} value={this.state.elementCode} onChange={this.onChange.bind(this, 'elementCode')}></Input>
                                                <Input placeholder='标题' style={{ width: 220, marginRight: '20px' }} value={this.state.elementName} onChange={this.onChange.bind(this, 'elementName')}></Input>
                                                <Button type="primary" shape="circle" icon="search" onClick={this.searchElement} />
                                            </div>
                                        </div>
                                        <div className="table-wrapper">
                                            <Table
                                                dataSource={this.state.elementTableData}
                                                columns={elementColumns}
                                                pagination={false}
                                            >
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="数据权限" key="2">
                                <TableComp
                                    dataSource={this.state.dataTableData}
                                    rowKey={record=>record.id}
                                    columns={dataColumns}
                                    changePage={this.pageChange1.bind(this)}
                                    pageSizeChange={this.pageSizeChange1.bind(this)}
                                    total={this.state.total1}
                                >
                                </TableComp>
                            </TabPane>
                        </Tabs>
                    </Modal>
                </div>
            </div>
        )
    }
}

const WrappedUserMan = Form.create()(UserMan);

export default WrappedUserMan