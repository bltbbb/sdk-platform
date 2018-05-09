import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMenuKey } from '../../../redux/menu.redux'
import urlKeyList from './config'

import './SideMenu.scss'

const { Sider } = Layout;
const SubMenu = Menu.SubMenu

const iconClass = {
    Dataoverview: 'info-circle-o',
    LogMan: 'solution',
    Dicenum: 'api',
    Manage: 'setting'
}

@connect(
    state => state,
    { getMenuKey }
)

class SideMenu extends Component {
    rootSubmenuKeys = ['Dataoverview', 'LogMan', 'Dicenum', 'Manage'];
    state = {
        openKeys: [''],
    };
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        console.log(openKeys)
        console.log(latestOpenKey)
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys:[latestOpenKey+''] });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    componentDidMount() {
        const pathname = this.props.location.pathname
        if (!this.props.menuKey.currentKey) {
            const data = urlKeyList[pathname]
            this.props.getMenuKey(data)
            this.setState({
                openKeys: [urlKeyList[pathname].fatherKey+'']
            })
        }
    }
    handleMenu = ({ item, key, keyPath }) => {
        const data = {
            currentKey: keyPath[0],
            fatherKey: keyPath[1],
        }
        this.props.getMenuKey(data)
    }
    render() {
        const menuData = this.props.menuKey.menuData
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
                        this.props.menuKey.currentKey ?
                            <Menu theme="dark" 
                                selectedKeys={[this.props.menuKey.currentKey]} 
                                openKeys={this.state.openKeys} 
                                onOpenChange={this.onOpenChange}
                                mode="inline" 
                                onClick={this.handleMenu}>
                                {menuData.map(v => {
                                    if (v.children) {
                                        return (
                                            !v.emptyFolder
                                            &&
                                            <SubMenu
                                                key={v.menuName}
                                                title={<span><Icon type={iconClass[v.alias]} /><span>{v.menuName}</span></span>}
                                            >
                                                {v.children.map(v1 => {
                                                    return <Menu.Item key={v1.menuName}><Link to={`/${v1.alias}`}>{v1.menuName}</Link></Menu.Item>
                                                })}
                                            </SubMenu>
                                        )
                                    } else {
                                        return (
                                            <Menu.Item key={v.menuName}>
                                                <Link to={`/${v.alias}`}>
                                                    <Icon type={iconClass[v.alias]} />
                                                    <span>{v.menuName}</span>
                                                </Link>
                                            </Menu.Item>
                                        )
                                    }
                                })}
                            </Menu> :
                            null
                    }
                </Sider>
            </div>
        )
    }
}

export default SideMenu