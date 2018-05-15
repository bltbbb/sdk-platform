import React, { Component } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import axios from 'axios'

const FormItem = Form.Item
const { Option } = Select
const { TextArea } = Input

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 17, offset: 1 }
}


class AddMenuForm extends Component {
    state = {
        menuVisble: false
    }
    postMenu = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const data = {...values,menuPid: this.props.menuId || '-1' ,}
            if (!err) {
                axios.post('/menu', data).then((res) => {
                    if (res.data.status === 0) {
                        message.success('新增成功')
                        this.props.getTreeData()
                        this.props.menuFormCancel()
                    } else {

                    }
                })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal
                    title="新增菜单"
                    visible={this.props.menuVisble}
                    onOk={this.postMenu}
                    onCancel={this.props.menuFormCancel}
                    width={700}
                    wrapClassName="menu-modal"
                >
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
                                    {this.props.menuTypeData.map(v => {
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
                                    {this.props.loadTargetData.map(v => {
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
                </Modal>
            </div>
        );
    }
}

const WrappedAddMenuForm = Form.create()(AddMenuForm);

export default WrappedAddMenuForm;