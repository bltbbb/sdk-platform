import React, { Component } from 'react';
import TableComp from '../../component/TableComp/TableComp'
import axios from 'axios'
import { Button, Modal, Table, Card, Form, Row, Col, Input, Icon, message, Select,InputNumber } from 'antd'

import './Enumerating.scss'

const { Column } = Table;
const { Option } = Select;
const FormItem = Form.Item

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 17, offset: 1 }
};

class Enumerating extends Component {
    state = {
        tableData: [],
        total: 0,
        size: 10,
        current: 1,
        visible: false,
        id: 0
    }
    componentDidMount() {
        this.getData(1, 10)
    }
    getData(page, size, startDate, stopDate) {
        const data = {
            pageSize: size,
            currentPage: page,
            isEdite: false
        }
        axios.post('dicenum/page', data).then(res => {
            this.setState({
                tableData: res.data.result.result,
                total: res.data.result.totalCount
            })
        })
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
    showModal = (data) => {
        if (data.enumCode) {
            this.setState({
                isEdite: true,
                id: data.id
            })
            this.props.form.setFieldsValue({
                enumCode: data.enumCode,
                enumGroup: data.enumGroup,
                enumValue: data.enumValue,
                enumTxt: data.enumTxt,
                isCache: data.isCache+'',
                sortIndex: data.sortIndex,
                remark: data.remark,
            });
        } else {
            this.setState({
                isEdite: false
            })
            this.props.form.setFieldsValue({
                enumCode: '',
                enumGroup: '',
                enumValue: '',
                enumTxt: '',
                isCache: '',
                sortIndex: '',
                remark: '',
            });
        }
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.handleSubmit(e)
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.isEdite) {
                    axios.put('/dicenum', { ...values, isCache: values.isCache === '是' ? 1 : 0, id: this.state.id }).then(res => {
                        if (res.data.status === 0) {
                            message.success('修改成功')
                            this.getData(this.state.current, this.state.size)
                            this.setState({
                                visible: false,
                            });
                        } else {
                            message.error('修改失败')
                        }
                    })
                } else {
                    axios.post('/dicenum', values).then(res => {
                        if (res.data.status === 0) {
                            message.success('添加成功')
                            this.getData(this.state.current, this.state.size)
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
    handleDelete = (id) => {
        axios.delete('/dicenum', {
            params:{
                id:id
            }
        }).then(res => {
            if (res.data.status === 0) {
                message.success('删除成功')
                this.getData(this.state.current, this.state.size)
            } else {
                message.error('删除失败')
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="enumerating-wrapper">
                <div className="input-wrapper" style={{ padding: '0 5px' }}>
                    <div className="input-main" style={{ padding: '15px 20px 0', background: '#fff' }}>
                        <Button type="primary" onClick={this.showModal}>新增</Button>
                    </div>
                </div>
                <div className="enumerating-wrapper">
                    <Card bordered={false}>
                        {this.state.tableData
                            ?
                            <Table
                                dataSource={this.state.tableData}
                                total={this.state.total}
                                rowKey={() => Math.random()}
                                pagination={{
                                    current : this.state.current,
                                    pageSize : this.state.pageSize,
                                    total : this.state.total,
                                    showTotal : total=>`共${total}条`,
                                    showSizeChanger: true,
                                    onChange: this.pageChange.bind(this),
                                    onShowSizeChange: this.pageSizeChange.bind(this)
                                }}
                            >
                                <Column
                                    title="CODE"
                                    dataIndex="enumCode"
                                />
                                <Column
                                    title="分组"
                                    dataIndex="enumGroup"
                                />
                                <Column
                                    title="值"
                                    dataIndex="enumValue"
                                />
                                <Column
                                    title="名称"
                                    dataIndex="enumTxt"
                                />
                                <Column
                                    title="备注"
                                    dataIndex="remark"
                                />
                                <Column
                                    title="是否缓存"
                                    render={(text, record) => {
                                        return (
                                            <span>
                                                {record.isCache === 1 ? '是' : '否'}
                                            </span>
                                        )
                                    }}
                                />
                                <Column
                                    title="排序"
                                    dataIndex="sortIndex"
                                />
                                <Column
                                    title="操作"
                                    render={(text, record) => {
                                        return (
                                            <div>
                                                <Button type="primary" style={{ marginRight: 15 }} onClick={() => this.showModal(record)}>修改</Button>
                                                <Button type="danger" onClick={()=>this.handleDelete(record.id)}>删除</Button>
                                            </div>

                                        )
                                    }}
                                />
                            </Table>
                            : null}
                    </Card>
                </div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={700}
                    wrapClassName="enumerate-modal"
                >
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <div>
                            <FormItem {...formItemLayout} label="Code" colon={false}>
                                {getFieldDecorator('enumCode', {
                                    rules: [{ required: true, message: '请填写CODE' }],
                                })(
                                    <Input placeholder="CODE" />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="分组" colon={false}>
                                {getFieldDecorator('enumGroup', {
                                    rules: [{ required: true, message: '请填写分组' }],
                                })(
                                    <Input placeholder="分组" />
                                )}
                            </FormItem>
                        </div>
                        <FormItem {...formItemLayout} label="是否缓存" colon={false}>
                            {getFieldDecorator('isCache', {
                                rules: [{ required: true, message: '请选择' }],
                            })(
                                <Select>
                                    <Option value="1">是</Option>
                                    <Option value="2">否</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="值" colon={false}>
                            {getFieldDecorator('enumValue', {
                                rules: [{ required: true, message: '请填写值' }],
                            })(
                                <Input placeholder="值" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="排序" colon={false}>
                            {getFieldDecorator('sortIndex', {
                                rules: [{ required: true, message: '请填写排序' }],
                            })(
                                <InputNumber min={1} max={99999}  placeholder="排序" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="名称" colon={false}>
                            {getFieldDecorator('enumTxt', {
                                rules: [{ required: true, message: '请填写名称' }],
                            })(
                                <Input placeholder="名称" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="备注" colon={false}>
                            {getFieldDecorator('remark', {
                                rules: [{ required: false, }],
                            })(
                                <Input placeholder="备注" />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const WrapEnumerating = Form.create()(Enumerating);

export default WrapEnumerating;