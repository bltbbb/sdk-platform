import React, { Component } from 'react';
import { Input,Icon,Button,Form } from 'antd';
import axios from 'axios'
import md5 from 'js-md5'

import logo from './img/TVYTbAXWheQpRcWDaDMu.svg';
import './Login.scss'

const FormItem = Form.Item

class Login extends Component {
    state = {
        isLoading : false
    }
    login = (e) => {
        this.setState({
            isLoading: true
        })
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const data = {
                loginName: values.loginName,
                password: md5(values.password)
            }
            axios.post('/authc/login',data).then(res=>{
                if(res.data.status === 0){
                    this.setState({
                        isLoading: false
                    })
                    this.props.history.push('/RealtimeData')
                }
            })
          }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-wrapper">
                <div className="login-header">
                    魔方后台
                </div>
                <div className="login-form">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div className="form-item">
                            <FormItem>
                                {getFieldDecorator('loginName', {
                                    rules: [{ required: true, message: '请输入用户名' }],
                                })(
                                    <Input 
                                        size="large"
                                        placeholder="Enter your username"
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    />
                                )}
                            </FormItem>
                        </div>
                        <div className="form-item">
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }],
                                })(
                                    <Input 
                                        size="large"
                                        placeholder="Enter your password"
                                        prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        onPressEnter={this.login.bind(this)}
                                    />
                                )}
                            </FormItem>
                        </div>
                        <Button type='primary' size='large' style={{width:'100%'}} onClick={this.login.bind(this)} loading={this.state.isLoading}>登录</Button>
                    </Form>    
                </div>
            </div>
        );
    }
}

const WrapLogin = Form.create()(Login);

export default WrapLogin;