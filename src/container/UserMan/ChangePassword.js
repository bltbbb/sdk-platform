import React, { Component } from 'react';
import { message,Form,Input,Button } from 'antd'
import axios from 'axios'

const FormItem = Form.Item

class ChangePassword extends Component {
    postChangePassword = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values['newPassword'] !== values['repeatPassword']) {
                    message.error('两次密码不一致，请重新输入！')
                    return
                }
                const data = {...values,userId:this.props.userId}
                axios.post('/user/updatePwd', data).then((res) => {
                    if (res&&res.data.status === 0) {
                        message.success('修改成功！')
                        this.setState({
                            visible1:false
                        })
                    } else {
                        res.data?message.error(res.data.result.result.message):()=>{}
                    }
                }, (err) => {

                })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Form>
                    <FormItem labelCol={{ span: 2, offset: 4 }} wrapperCol={{ span: 12, offset: 1 }} label="旧密码" colon={false}>
                        {getFieldDecorator('passWord', {
                            rules: [{ required: true, message: '请填写旧密码' }],
                        })(
                            <Input placeholder="旧密码" />
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 2, offset: 4 }} wrapperCol={{ span: 12, offset: 1 }} label="新密码" colon={false}>
                        {getFieldDecorator('newPassword', {
                            rules: [{ required: true, message: '请填写新密码' }],
                        })(
                            <Input placeholder="新密码" />
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 2, offset: 4 }} wrapperCol={{ span: 12, offset: 1 }} label="确认密码" colon={false}>
                        {getFieldDecorator('repeatPassword', {
                            rules: [{ required: true, message: '请填写新密码' }],
                        })(
                            <Input placeholder="确认密码" />
                        )}
                    </FormItem>
                </Form>
                <div className="btn-wrapper">
                    <Button style={{ marginRight: 15 }} type="primary" onClick={this.postChangePassword}>确定</Button>
                    <Button onClick={() => this.setState({ visible1: false })}>取消</Button>
                </div>
            </div>
        )
    }
}

const WrappedChangePassword = Form.create()(ChangePassword)

export default WrappedChangePassword;