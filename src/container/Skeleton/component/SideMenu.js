import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMenuKey } from '../../../redux/menu.redux'
import urlKeyList from './config'

import './SideMenu.scss'

const { Sider } = Layout;
const SubMenu = Menu.SubMenu

@connect(
    state => state,
    { getMenuKey }
)

class SideMenu extends Component {
    componentDidMount() {
        const pathname = this.props.location.pathname
        if (!this.props.menuKey.currentKey) {
            const data = urlKeyList[pathname]
            this.props.getMenuKey(data)
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
                        this.props.menuKey.fatherKey ?
                            <Menu theme="dark" selectedKeys={[this.props.menuKey.currentKey]} defaultOpenKeys={[this.props.menuKey.fatherKey]} mode="inline" onClick={this.handleMenu}>
                                {menuData.map(v => {
                                    if(v.children){
                                        return (
                                            <SubMenu
                                                key={v.menuName}
                                                title={<span><Icon type="user" /><span>{v.menuName}</span></span>}
                                            >
                                            {v.children.map(v1=>{
                                                return <Menu.Item key={v1.menuName}><Link to={`/${v1.alias}`}>{v1.menuName}</Link></Menu.Item>
                                            })}
                                            </SubMenu>
                                        )
                                    }else {
                                        return (
                                            <Menu.Item key={v.menuName}>
                                                <Icon type="inbox" />
                                                <span>{v.menuName}</span>
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