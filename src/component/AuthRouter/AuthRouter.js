import React, { Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { getMenuData } from '../../redux/menu.redux'

@connect(
    state=>state,
    { getMenuData }
)

@withRouter
class AuthRouter extends Component {
    componentDidMount(){
        const routerList = ['/login']
        const pathName = this.props.location.pathname
        if(routerList.indexOf(pathName)>-1){
            return void 666
        }
        const cookie = Cookies.get('sdk-cookie')
        if(!cookie){
            this.props.history.push('/login')
        }else {
            axios.post('/getAuthMenus').then(res=>{
                if(res&&res.status === 200){
                    if(res.data.status === 0){
                        if(this.props.menuKey.menuData.length === 0){
                            this.props.getMenuData(res.data.result)
                        }
                    }else {
                        this.props.history.push('/login')
                    }
                }
            })
        }
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default AuthRouter;