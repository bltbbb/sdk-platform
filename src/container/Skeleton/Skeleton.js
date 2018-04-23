import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import './Skeleton.scss'

import SideMenu from './component/SideMenu'
import BreadcrumbComp from '../../component/BreadcrumbComp/BreadcrumbComp'
import DateComp from '../../component/DateComp/DateComp'

//router component
import RealtimeData from '../RealtimeData/RealtimeData'
import HistoryTrend from '../HistoryTrend/HistoryTrend'

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

@connect(
  state=>state
)

class Skeleton extends Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
      this.setState({
          collapsed: !this.state.collapsed,
      });
  }
  render() {
    return (
      <Layout id="main-layout">
          <SideMenu collapsed={this.state.collapsed} {...this.props}></SideMenu>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <BreadcrumbComp menuKey={this.props.menuKey}></BreadcrumbComp>
          {this.props.location.pathname === '/RealtimeData' ? null : <DateComp></DateComp>}
          <Content style={{ margin: '24px 16px', background: '#f0f2f5', minHeight: 280 }}>
            <Route path='/RealtimeData' component={RealtimeData}></Route>
            <Route path='/HistoryTrend' component={HistoryTrend}></Route>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Skeleton