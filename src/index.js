import React from 'react'
import ReactDom from 'react-dom'
import { createStore,applyMiddleware,compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter,Route,Switch } from 'react-router-dom'
import AuthRouter from './component/AuthRouter/AuthRouter'

import './index.css'
import reducer from './reducer'
import './config'
import asyncComponent from './component/AsyncComponent/AsyncComponent'

// import Login from './container/Login/Login'
// import Skeleton from './container/Skeleton/Skeleton'

const LoginWrap = asyncComponent(() => import("./container/Login/Login"));
const SkeletonWrap = asyncComponent(() => import("./container/Skeleton/Skeleton"));

const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
))

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div style={{width:'100%',height:'100%'}}>
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
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)