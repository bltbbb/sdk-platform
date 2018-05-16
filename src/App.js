import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import AuthRouter from './component/AuthRouter/AuthRouter'
import { Provider } from 'react-redux'

import configureStore from './configureStore'
import history from './history'
import './config'
import './index.css'

import asyncComponent from './component/AsyncComponent/AsyncComponent'

const LoginWrap = asyncComponent(() => import("./container/Login/Login"));
const SkeletonWrap = asyncComponent(() => import("./container/Skeleton/Skeleton"));
const store = configureStore()

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div style={{ width: '100%', height: '100%' }}>
                        <AuthRouter></AuthRouter>
                        <Switch>
                            {/* <Route path="/geniusinfo" component={GeniusInfo}></Route>
                        <Route path="/bossinfo" component={BossInfo}></Route> */}
                            <Route path="/login" component={LoginWrap}></Route>
                            {/* <Route path="/register" component={Register}></Route> 
                        <Route path="/chat/:id" component={Chat}></Route>  */}
                            <Route component={SkeletonWrap}></Route>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App