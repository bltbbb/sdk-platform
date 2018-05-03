import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMenuKey } from '../../redux/menu.redux'

@connect(
    state=>state,
    { getMenuKey }
)

    
class DevStatistic extends Component {
    // renderPage(){
    //     this.props.getMenuKey({
    //         currentKey: '登录日志',
    //         fatherKey: '日志审计'
    //     })
    //     return <Redirect to="/LoginLog"></Redirect>
    // }
    render() {
        const arr = this.props.pagechange.menu
        const pathname = this.props.history.location.pathname
        return (
            <div>
                {/* {
                    arr.indexOf(pathname) === -1
                    ? this.renderPage()
                    : <div>111</div>
                } */}
                111
            </div>
        );
    }
}

export default DevStatistic;