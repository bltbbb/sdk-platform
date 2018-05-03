import React, { Component } from 'react'
import { Layout,Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMenuKey } from '../../../redux/menu.redux'
import urlKeyList from './config'

import './SideMenu.scss'

const { Sider } = Layout;
const SubMenu = Menu.SubMenu

@connect(
    state=>state,
    { getMenuKey }
)

class SideMenu extends Component {
    componentDidMount(){
        const pathname = this.props.location.pathname
        if(!this.props.menuKey.currentKey){
            const data = urlKeyList[pathname]
            this.props.getMenuKey(data)
        }
    }
    handleMenu = ({item, key, keyPath}) =>{
        const data = {
            currentKey : keyPath[0],
            fatherKey : keyPath[1],
        }
        this.props.getMenuKey(data)
      }
    render() {
        return (
            <div className="side-menu-wrapper">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.props.collapsed}>
                    <div className="logo" >
                        <h2>魔方后台</h2>
                    </div>
                    {
                        this.props.menuKey.fatherKey ? 
                        <Menu theme="dark" selectedKeys={[this.props.menuKey.currentKey]} defaultOpenKeys={[this.props.menuKey.fatherKey]} mode="inline" onClick={this.handleMenu}>
                            <SubMenu
                            key="数据概览"
                            title={<span><Icon type="user" /><span>数据概览</span></span>}
                            >
                                <Menu.Item key="实时数据"><Link to='/RealtimeData'>实时数据</Link></Menu.Item>
                                <Menu.Item key="历史趋势"><Link to='/HistoryTrend'>历史趋势</Link></Menu.Item>
                                <Menu.Item key="开发者统计"><Link to='/DevStatistic'></Link>开发者统计</Menu.Item>
                            </SubMenu>
                            <SubMenu
                            key="日志审计"
                            title={<span><Icon type="user" /><span>日志审计</span></span>}
                            >
                                <Menu.Item key="登录日志"><Link to='/LoginLog'>登录日志</Link></Menu.Item>
                                <Menu.Item key="消息推送"><Link to='/MessagePush'>消息推送</Link></Menu.Item>
                                <Menu.Item key="操作日志"><Link to='/OperationLog'></Link>操作日志</Menu.Item>
                                <Menu.Item key="接口调用日志"><Link to='/InterfaceLog'></Link>接口调用日志</Menu.Item>
                                <Menu.Item key="访问日志"><Link to='/AccessLog'></Link>访问日志</Menu.Item>
                            </SubMenu>
                        </Menu> :
                        null
                    }
                </Sider>
            </div>
        )
    }
}

export default SideMenu