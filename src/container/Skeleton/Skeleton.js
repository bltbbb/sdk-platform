import React, { Component } from 'react'
import { Layout, Menu, Icon, Dropdown } from 'antd'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'

import './Skeleton.scss'

import SideMenu from './component/SideMenu'
import BreadcrumbComp from '../../component/BreadcrumbComp/BreadcrumbComp'
// import asyncComponent from '../../component/AsyncComponent/AsyncComponent'

//router component
import RealtimeData from '../RealtimeData/RealtimeData'
import HistoryTrend from '../HistoryTrend/HistoryTrend'
import DevStatistic from '../DevStatistic/DevStatistic'
import LoginLog from '../Log/LoginLog'
import MessagePush from '../Log/MessagePush'
import OperationLog from '../Log/OperationLog'
import InterfaceLog from '../Log/InterfaceLog'
import AccessLog from '../Log/AccessLog'
import Enumerating from '../Enumerating/Enumerating'
import UserMan from '../UserMan/UserMan'
import SourceMan from '../SourceMan/SourceMan'

// const RealtimeDataWrap = asyncComponent(() => import("../RealtimeData/RealtimeData"));
// const HistoryTrendWrap = asyncComponent(() => import("../HistoryTrend/HistoryTrend"));
// const LoginLogWrap = asyncComponent(() => import("../Log/LoginLog"));
// const MessagePushWrap = asyncComponent(() => import("../Log/MessagePush"));
// const OperationLogWrap = asyncComponent(() => import("../Log/OperationLog"));
// const InterfaceLogWrap = asyncComponent(() => import("../Log/InterfaceLog"));
// const AccessLogWrap = asyncComponent(() => import("../Log/AccessLog"));

const { Header, Content } = Layout;

@connect(
  state=>state
)

class Skeleton extends Component {
  state = {
    collapsed: false,
    dropdown: false
  };
  toggle = () => {
      this.setState({
          collapsed: !this.state.collapsed,
      });
  }
  toggledropdown(val){
    this.setState({
      dropdown: val
    })
  }
  loginOut(){
    this.props.history.push('/login')
  }
  //菜单权限
  // componentWillUpdate() {
  //   const arr = this.props.pagechange.menu
  //   const pathname = this.props.history.location.pathname
  //   if(arr.indexOf(pathname) === -1){
  //     this.props.history.push('/LoginLog')
  //   }
  // }
  render() {
    const dropdownData = (
      <Menu>
        <Menu.Item key="0">
          <span style={{padding:'0 5px'}} onClick={this.loginOut.bind(this)}><Icon type="logout"></Icon> 退出登录</span>
        </Menu.Item>
      </Menu>
    )
    return (
      <Layout id="main-layout">
          <SideMenu collapsed={this.state.collapsed} {...this.props}></SideMenu>
        <Layout>
          <div className="skeleton-header">
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div className={`header-user${this.state.dropdown?' dropdown-header':''}`} onMouseEnter={this.toggledropdown.bind(this,true)} onMouseLeave={this.toggledropdown.bind(this,false)}>
                <Dropdown overlay={dropdownData} placement="bottomRight">
                  <p>admin<Icon type="down" /></p>
                </Dropdown>
              </div>
            </Header>
          </div>
          <BreadcrumbComp menuKey={this.props.menuKey}></BreadcrumbComp>
          <Content style={{ margin: '24px 16px', background: '#f0f2f5', minHeight: 280 }}>
            <Route path='/RealtimeData' component={RealtimeData}></Route>
            <Route path='/HistoryTrend' component={HistoryTrend}></Route>
            <Route path='/DevStatistic' component={DevStatistic}></Route>
            <Route path='/LoginLog' component={LoginLog}></Route>
            <Route path='/MessagePush' component={MessagePush}></Route>
            <Route path='/OperationLog' component={OperationLog}></Route>
            <Route path='/InterfaceLog' component={InterfaceLog}></Route>
            <Route path='/AccessLog' component={AccessLog}></Route>
            <Route path='/Dicenum' component={Enumerating}></Route>
            <Route path='/UserMan' component={UserMan}></Route>
            <Route path='/SourceMan' component={SourceMan}></Route>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default hot(module)(Skeleton)