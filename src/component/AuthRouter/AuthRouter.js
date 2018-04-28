import React, { Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'

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
        }
        // axios.get('/user/info').then(res=>{
        //     if(res.status === 200){
        //         if(res.data.code === 0){
        //             const type = res.data.result.type
        //             if(type === 'boss'&&pathName === '/genius'){
        //                 this.props.history.push('/boss')
        //             }
        //             this.props.loadData(res.data.result)
        //         }else {
        //             this.props.history.push('/login')
        //         }
        //     }
        // })
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default AuthRouter;