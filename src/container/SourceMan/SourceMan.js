import React, { Component } from 'react'
import { Tabs, Button, Tree, message, Card, Form, Input, Select, Table, Modal } from 'antd'
import axios from 'axios'

import './SourceMan.scss'
import AddMenuForm from './Component/AddMenuForm'

const FormItem = Form.Item
const { TreeNode } = Tree
const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input
const { Column } = Table

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 17, offset: 1 }
}

class SourceMan extends Component {
    state = {
        selectedKeys: [],
        treeData: [],
        menuTypeData: [],
        loadTargetData: [],
        elementTypeData: [],
        privVisitId: '',
        urlSelectedData: [],
        urlNotSelectedData: [],
        current: 1,
        size: 10,
        total: 0,
        current1: 1,
        size1: 10,
        total1: 0,
        current2: 1,
        size2: 10,
        total2: 0,
        menuId: '',
        panelTableData: [],
        panelName: '',
        elmentTableData: [],
        elmentName: '',
        urlPath: '',
        panelModalVisble: false,
        elementModalVisble: false,
        mPanelName: '',
        mRemark: '',
        changePanel: false,
        mElementName: '',
        mElementRemark: '',
        changeElement: false,
        panelId: '',
        elementType: '',
        queryPanelName: '',
        queryElementName: '',
        menuVisble: false,
        urlModalVisble: false,
    }
    componentDidMount() {
        this.getTreeData()
        this.getMenuType()
        this.getTargetType()
        this.getElementType()
    }
    onSelect = (selectedKeys, info) => {
        this.props.form.setFieldsValue({
            menuName: info.node.props.dataRef.menuName,
            remark: info.node.props.dataRef.remark,
            menuLevel: info.node.props.dataRef.menuLevel,
            menuType: info.node.props.dataRef.menuType + '',
            urlPath: info.node.props.dataRef.urlPath,
            loadTarget: info.node.props.dataRef.loadTarget + '',
            sortIndex: info.node.props.dataRef.sortIndex,
            isShare: info.node.props.dataRef.isShare + '',
            fullPath: info.node.props.dataRef.fullPath,
            alias: info.node.props.dataRef.alias
        })
        this.setState({
            privVisitId: selectedKeys[0],
            menuId: info.node.props.dataRef.menuId,
            selectedKeys
        }, () => {
            this.getUrlSelected()
            this.getPanelData()
            this.getElementData()
        })
    }
    addMenu = () => {
        this.setState({
            menuVisble: true
        })
    }
    deleteMenu = () => {
        axios.delete('/menu', {
            params: {
                menuId: this.state.menuId
            }
        }).then((res) => {
            if (res.data.status === 0) {
                this.getTreeData()
                message.success('删除成功')
                this.props.form.setFieldsValue()
            } else {
                message.error('删除失败')
            }
        })
    }
    postMenu = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const data = { ...values, menuId: this.state.menuId }
            if (!err) {
                axios.put('/menu', data).then((res) => {
                    if (res.data.status === 0) {
                        message.success('修改成功')
                        this.getTreeData()
                    } else {

                    }
                })
            }
        });
    }
    menuFormCancel = () => {
        this.setState({
            menuVisble: false
        })
    }
    getTreeData = () => {
        axios.get('/menu').then((res) => {
            if (res.data.status === 0) {
                this.setState({
                    treeData: res.data.result.result
                })
            } else {
                message.error(res.data.result.result.message)
            }
        })
    }
    getMenuType() {
        axios.get('/dicenum', {
            params: {
                type: 1
            }
        }).then((res) => {
            if (res.data.status === 0) {
                this.setState({
                    menuTypeData: res.data.result.result
                })
            }
        })
    }
    getTargetType() {
        axios.get('/dicenum', {
            params: {
                type: 3
            }
        }).then((res) => {
            if (res.data.status === 0) {
                this.setState({
                    loadTargetData: res.data.result.result
                })
            }
        })
    }
    getElementType() {
        axios.get('/dicenum', {
            params: {
                type: 4
            }
        }).then((res) => {
            if (res.data.status === 0) {
                this.setState({
                    elementTypeData: res.data.result.result
                })
            }
        })
    }
    addUrl = () => {
        this.setState({
            urlModalVisble: true
        })
        this.getUrlNotSelected()
    }
    getUrlSelected(current, size) {
        let data = {
            pageSize: size || this.state.current,
            currentPage: current || this.state.size,
            privVisitId: this.state.privVisitId
        }
        axios.post('/confUrl/queryUrlSelected', data).then((res) => {
            if (res.data.status === 0) {
                this.setState({
                    total: res.data.result.totalCount
                })
                this.setState({
                    urlSelectedData: res.data.result.result
                })
            } else {
                message.error(res.data.result.result.message)
            }
        }, (err) => {

        })
    }
    getUrlNotSelected() {
        let data = {
            privVisitId: this.state.privVisitId
        }
        axios.post('/confUrl/queryUrlNotSelected', data).then((res) => {
            if (res.data.status == 0) {
                this.setState({
                    urlNotSelectedData: res.data.result.result
                })
            } else {
                this.$message(res.data.result.result.message)
            }
        })
    }
    urlDelete(data) {
        axios.delete('/privUrl', {
            params: {
                id: data.visitUrlId
            }
        }).then((res) => {
            if (res.data.status == 0) {
                this.getUrlSelected()
                message.success('删除成功')
            } else {
                message.error('删除失败')
            }
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
            return <TreeNode {...item} key={item.privVisitId} dataRef={item} />;
        });
    }
    onChange(key, event) {
        this.setState({
            [key]: event.target.value
        });
    }
    handleSearch() {
        this.getUrlSelected(this.state.current, this.state.size)
    }
    pageChange(page, pageSize) {
        this.setState({
            current: page
        })
        this.getUrlSelected(page, pageSize)
    }
    pageSizeChange(current, size) {
        this.setState({
            size: size
        })
        this.getUrlSelected(current, size)
    }
    pageChange1(page, pageSize) {
        this.setState({
            current1: page
        })
        this.getPanelData(page, pageSize)
    }
    pageSizeChange1(current, size) {
        this.setState({
            size1: size
        })
        this.getPanelData(current, size)
    }
    pageChange2(page, pageSize) {
        this.setState({
            current2: page
        })
        this.getElementData(page, pageSize)
    }
    pageSizeChange2(current, size) {
        this.setState({
            size2: size
        })
        this.getElementData(current, size)
    }
    handlePanelSearch() {
        this.getPanelData(this.state.current1, this.state.size1)
    }
    handleElementSearch() {
        this.getElementData(this.state.current2, this.state.size2)
    }
    getPanelData(current, size) {
        let data = {
            menuId: this.state.menuId,
            currentPage: current || this.state.current,
            pageSize: size || this.state.size,
            panelName: this.state.queryPanelName
        }
        axios.post('/resPanel/page', data).then((res) => {
            if (res.data.status === 0) {
                this.setState({
                    total1: res.data.result.totalCount
                })
                this.setState({
                    panelTableData: res.data.result.result
                })
            } else {

            }
        })
    }
    getElementData(current, size) {
        let data = {
            menuId: this.state.menuId,
            currentPage: current || this.state.current,
            panelId: this.state.panelId,
            pageSize: size || this.state.size,
            elementName: this.state.queryElementName
        }
        axios.post('/element/page', data).then((res) => {
            if (res.data.status === 0) {
                this.setState({
                    total2: res.data.result.totalCount,
                    elementTableData: res.data.result.result
                })
            } else {

            }
        })
    }
    deletePanelData(data) {
        axios.delete('/resPanel', {
            params: {
                panelId: data.panelId
            }
        }).then((res) => {
            if (res.data.status === 0) {
                message.success('删除成功')
                this.getPanelData()
            } else {

            }
        })
    }
    deleteElementData(data) {
        axios.delete('/element', {
            params: {
                elementId: data.elementId
            }
        }).then((res) => {
            if (res.data.status === 0) {
                message.success('删除成功')
                this.getElementData()
            } else {

            }
        })
    }
    editePanelData(data) {
        this.setState({
            panelModalVisble: true,
            mPanelName: data.panelName,
            mRemark: data.remark,
            changePanel: true,
            panelId: data.panelId
        })
    }
    editeElementData(data) {
        this.setState({
            elementModalVisble: true,
            mElementName: data.elementName,
            mElementRemark: data.remark,
            changeElement: true,
            elementId: data.elementId,
            elementType: data.elementType + ''
        })
    }
    commitPanelHandle() {
        if (this.state.menuId === '') {
            message.info('请先选择一个菜单！')
            return
        }
        let data = {
            menuId: this.state.menuId,
            panelName: this.state.mPanelName,
            remark: this.state.mRemark
        }
        if (this.state.changePanel) {
            data.panelId = this.state.panelId
            axios.put('/resPanel', data).then((res) => {
                if (res.data.status === 0) {
                    message.success('修改成功')
                    this.setState({
                        panelModalVisble: false
                    })
                    this.getPanelData()
                } else {

                }
            })
        } else {
            axios.post('/resPanel', data).then((res) => {
                if (res.data.status === 0) {
                    message.success('提交成功')
                    this.setState({
                        panelModalVisble: false
                    })
                    this.getPanelData()
                } else {

                }
            })
        }
    }
    commitElementHandle() {
        if (this.state.menuId === '') {
            message.info('请先选择一个菜单！')
            return
        }
        let data = {
            menuId: this.state.menuId,
            elementName: this.state.mElementName,
            remark: this.state.mElementRemark,
            panelId: this.state.panelId,
            elementType: this.state.elementType
        }
        if (this.state.changeElement) {
            data.elementId = this.state.elementId
            axios.put('/element', data).then((res) => {
                if (res.data.status === 0) {
                    message.success('修改成功')
                    this.setState({
                        elementModalVisble: false
                    })
                    this.getElementData()
                } else {

                }
            })
        } else {
            axios.post('/element', data).then((res) => {
                if (res.data.status === 0) {
                    message.success('提交成功')
                    this.setState({
                        elementModalVisble: false
                    })
                    this.getElementData()
                } else {

                }
            })
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };
        return (
            <div className="sorcerman-wrapper">
                <Card>
                    <Tabs type="card">
                        <TabPane tab="资源权限" key="1">
                            <div className="left">
                                <div className="btn-wrapper">
                                    <Button type="primary" style={{ marginRight: 15 }} onClick={this.addMenu}>新增</Button>
                                    <Button type="danger" onClick={this.deleteMenu}>删除</Button>
                                </div>
                                <div className="tree-wrapper">
                                    <Tree
                                        onSelect={this.onSelect}
                                        selectedKeys={this.state.selectedKeys}
                                    >
                                        {this.renderTreeNodes(this.state.treeData)}
                                    </Tree>
                                </div>
                                <AddMenuForm
                                    menuVisble={this.state.menuVisble}
                                    menuTypeData={this.state.menuTypeData}
                                    loadTargetData={this.state.loadTargetData}
                                    menuFormCancel={this.menuFormCancel}
                                    getTreeData={this.getTreeData}
                                    menuId={this.state.menuId}
                                ></AddMenuForm>
                            </div>
                            <div className="right">
                                <Tabs type="card">
                                    <TabPane tab="信息维护" key="1">
                                        <Form layout="inline" onSubmit={this.handleSubmit}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="菜单名称"
                                            >
                                                {getFieldDecorator('menuName', {
                                                    rules: [{ required: true }],
                                                })(
                                                    <Input></Input>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="菜单别名"
                                            >
                                                {getFieldDecorator('alias', {
                                                    rules: [{ required: true }],
                                                })(
                                                    <Input></Input>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="菜单层次"
                                            >
                                                {getFieldDecorator('menuLevel', {
                                                    rules: [{ required: true }],
                                                })(
                                                    <Input></Input>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="URL路径"
                                            >
                                                {getFieldDecorator('urlPath', {
                                                    rules: [{ required: false }],
                                                })(
                                                    <Input></Input>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="菜单类型"
                                            >
                                                {getFieldDecorator('menuType', {
                                                    rules: [{ required: true }],
                                                })(
                                                    <Select>
                                                        {this.state.menuTypeData.map(v => {
                                                            return <Option value={v.enumValue} key={v.id}>{v.enumTxt}</Option>
                                                        })}
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="排序索引"
                                            >
                                                {getFieldDecorator('sortIndex', {
                                                    rules: [{ required: true }],
                                                })(
                                                    <Input></Input>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="加载类型"
                                            >
                                                {getFieldDecorator('loadTarget', {
                                                    rules: [{ required: false }],
                                                })(
                                                    <Select>
                                                        {this.state.loadTargetData.map(v => {
                                                            return <Option value={v.enumValue} key={v.id}>{v.enumTxt}</Option>
                                                        })}
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="全路径"
                                            >
                                                {getFieldDecorator('fullPath', {
                                                    rules: [{ required: false }],
                                                })(
                                                    <Input></Input>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="isShare"
                                            >
                                                {getFieldDecorator('isShare', {
                                                    rules: [{ required: true }],
                                                })(
                                                    <Select>
                                                        <Option value="1">是</Option>
                                                        <Option value="2">否</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="描述"
                                            >
                                                {getFieldDecorator('remark', {
                                                    rules: [{ required: true }],
                                                })(
                                                    <TextArea></TextArea>
                                                )}
                                            </FormItem>
                                        </Form>
                                        <div className="btn-wrapper">
                                            <Button type="primary" onClick={this.postMenu}>保存</Button>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="URL配置" key="2">
                                        <div className="input-wrapper">
                                            <div className="input-main">
                                                <div className="input-main">
                                                    <Input placeholder='Url地址' style={{ width: 200, marginRight: '20px' }} value={this.state.urlPath} onChange={this.onChange.bind(this, 'user')}></Input>
                                                    <Button type="primary" onClick={this.handleSearch.bind(this)} style={{ marginRight: 15 }}>查询</Button>
                                                    <Button type="primary" onClick={this.addUrl}>新增</Button>
                                                </div>
                                            </div>
                                        </div>
                                        <Table
                                            dataSource={this.state.urlTableData}
                                            rowKey={record => record.urlId}
                                            pagination={{
                                                current: this.state.current,
                                                pageSize: this.state.size,
                                                total: this.state.total,
                                                showTotal: total => `共${this.state.total}条`,
                                                showSizeChanger: true,
                                                onChange: this.pageChange.bind(this),
                                                onShowSizeChange: this.pageSizeChange.bind(this)
                                            }}
                                        >
                                            <Column
                                                title="URL路径"
                                                dataIndex="urlPath"
                                            />
                                            <Column
                                                title="Method"
                                                dataIndex="method"
                                            />
                                            <Column
                                                title="创建人"
                                                dataIndex="createUser"
                                            />
                                            <Column
                                                title="操作"
                                                render={(text, record) => {
                                                    return (
                                                        <div>
                                                            <Button onClick={this.urlDelete}>删除</Button>
                                                        </div>
                                                    )
                                                }}
                                            />
                                        </Table>
                                        <Modal
                                            title="Url库"
                                            visible={this.state.urlModalVisble}
                                            onOk={() => this.commitUrlHandle()}
                                            onCancel={() => this.setState({ urlModalVisble: false })}
                                            width={600}
                                            wrapClassName="url-modal"
                                        >
                                            <Select
                                                showSearch
                                                style={{ width: '100%',marginBottom: 15 }}
                                                onChange={this.selectChange}
                                                placeholder="Select a person"
                                            >
                                                {
                                                    this.state.urlNotSelectedData.map(v=>(
                                                        <Option key={v.urlId} value={v.index}>{v.urlPath}</Option>
                                                    ))
                                                }
                                            </Select>
                                            <Table
                                                dataSource={this.state.urlNotSelectedData}
                                                rowKey={record => record.id}
                                                pagination={false}
                                                rowSelection={rowSelection}
                                                scroll={{ y: 500 }}
                                            >
                                                <Column
                                                    title="Url路径"
                                                    dataIndex="urlPath"
                                                    width={200}
                                                />
                                                <Column
                                                    title="Method"
                                                    dataIndex="method"
                                                    width={100}
                                                />
                                                <Column
                                                    title="创建人"
                                                    dataIndex="createUser"
                                                    width={100}
                                                />
                                            </Table>
                                        </Modal>
                                    </TabPane>
                                    <TabPane tab="资源配置" key="3">
                                        <div className="top">
                                            <div className="input-wrapper">
                                                <div className="input-main">
                                                    <div className="input-main">
                                                        <Input placeholder='面板名称' style={{ width: 200, marginRight: '20px' }} value={this.state.queryPanelName} onChange={this.onChange.bind(this, 'queryPanelName')}></Input>
                                                        <Button type="primary" onClick={this.handlePanelSearch.bind(this)} style={{ marginRight: 15 }}>查询</Button>
                                                        <Button type="primary" onClick={() => this.setState({ panelModalVisble: true, changePanel: false, mPanelName: '', mRemark: '' })}>新增</Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <Table
                                                dataSource={this.state.panelTableData}
                                                rowKey={record => record.id}
                                                pagination={{
                                                    current: this.state.current1,
                                                    pageSize: this.state.size1,
                                                    total: this.state.total1,
                                                    showTotal: total => `共${this.state.total1}条`,
                                                    showSizeChanger: true,
                                                    onChange: this.pageChange1.bind(this),
                                                    onShowSizeChange: this.pageSizeChange1.bind(this)
                                                }}
                                            >
                                                <Column
                                                    title="面板名称"
                                                    dataIndex="panelName"
                                                />
                                                <Column
                                                    title="描述"
                                                    dataIndex="remark"
                                                />
                                                <Column
                                                    title="操作"
                                                    render={(text, record) => {
                                                        return (
                                                            <div>
                                                                <Button type="primary" style={{ marginRight: 15 }} onClick={this.editePanelData.bind(this, record)}>编辑</Button>
                                                                <Button type="danger" onClick={this.deletePanelData.bind(this, record)}>删除</Button>
                                                            </div>
                                                        )
                                                    }}
                                                />
                                            </Table>
                                            <Modal
                                                title="新增面板"
                                                visible={this.state.panelModalVisble}
                                                onOk={() => this.commitPanelHandle()}
                                                onCancel={() => this.setState({ panelModalVisble: false })}
                                                width={500}
                                                wrapClassName="panel-modal"
                                            >
                                                <Form>
                                                    <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 18, offset: 1 }} label="面板名称" colon={false}>
                                                        <Input placeholder="面板名称" value={this.state.mPanelName} onChange={this.onChange.bind(this, 'mPanelName')} />
                                                    </FormItem>
                                                    <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 18, offset: 1 }} label="描述" colon={false}>
                                                        <TextArea autosize={{ minRows: 2 }} placeholder="描述" value={this.state.mRemark} onChange={this.onChange.bind(this, 'mRemark')} />
                                                    </FormItem>
                                                </Form>
                                            </Modal>
                                        </div>
                                        <div className="bottom">
                                            <div className="input-wrapper">
                                                <div className="input-main">
                                                    <div className="input-main">
                                                        <Input placeholder='元素名称' style={{ width: 200, marginRight: '20px' }} value={this.state.queryElementName} onChange={this.onChange.bind(this, 'queryElementName')}></Input>
                                                        <Button type="primary" onClick={this.handleElementSearch.bind(this)} style={{ marginRight: 15 }}>查询</Button>
                                                        <Button type="primary" onClick={() => this.setState({ elementModalVisble: true, changeElement: false, mElementName: '', mElementRemark: '', elementType: '' })}>新增</Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <Table
                                                dataSource={this.state.elementTableData}
                                                rowKey={record => record.id}
                                                pagination={{
                                                    current: this.state.current2,
                                                    pageSize: this.state.size2,
                                                    total: this.state.total2,
                                                    showTotal: total => `共${this.state.total2}条`,
                                                    showSizeChanger: true,
                                                    onChange: this.pageChange2.bind(this),
                                                    onShowSizeChange: this.pageSizeChange2.bind(this)
                                                }}
                                            >
                                                <Column
                                                    title="元素名称"
                                                    dataIndex="elementName"
                                                />
                                                <Column
                                                    title="元素类型"
                                                    render={(text, record) => {
                                                        return (
                                                            <div>
                                                                {record.elementType === 1 ? <span>图Chat</span> : ''}
                                                                {record.elementType === 2 ? <span>按钮</span> : ''}
                                                                {record.elementType === 3 ? <span>表格</span> : ''}
                                                            </div>
                                                        )
                                                    }}
                                                />
                                                <Column
                                                    title="描述"
                                                    dataIndex="remark"
                                                />
                                                <Column
                                                    title="操作"
                                                    render={(text, record) => {
                                                        return (
                                                            <div>
                                                                <Button type="primary" style={{ marginRight: 15 }} onClick={this.editeElementData.bind(this, record)}>编辑</Button>
                                                                <Button type="danger" onClick={this.deleteElementData.bind(this, record)}>删除</Button>
                                                            </div>
                                                        )
                                                    }}
                                                />
                                            </Table>
                                            <Modal
                                                title="元素"
                                                visible={this.state.elementModalVisble}
                                                onOk={() => this.commitElementHandle()}
                                                onCancel={() => this.setState({ elementModalVisble: false })}
                                                width={500}
                                                wrapClassName="panel-modal"
                                            >
                                                <Form>
                                                    <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 18, offset: 1 }} label="元素名称" colon={false}>
                                                        <Input placeholder="元素名称" value={this.state.mElementName} onChange={this.onChange.bind(this, 'mElementName')} />
                                                    </FormItem>
                                                    <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 18, offset: 1 }} label="元素类型" colon={false}>
                                                        <Select allowClear value={this.state.elementType} onChange={value => this.setState({ elementType: value })}>
                                                            {this.state.elementTypeData.map(v => {
                                                                return <Option value={v.enumValue} key={v.id}>{v.enumTxt}</Option>
                                                            })}
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 18, offset: 1 }} label="描述" colon={false}>
                                                        <TextArea autosize={{ minRows: 2 }} placeholder="描述" value={this.state.mElementRemark} onChange={this.onChange.bind(this, 'mElementRemark')} />
                                                    </FormItem>
                                                </Form>
                                            </Modal>
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="数据权限" key="2"></TabPane>
                    </Tabs>
                </Card>
            </div>
        );
    }
}

const WrappedSourceMan = Form.create()(SourceMan);

export default WrappedSourceMan;