import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getMenuKey } from '../../redux/menu.redux'

@connect(
    state=>state,
    { getMenuKey }
)

    
class DevStatistic extends Component {
    render() {
        return (
            <div>
               
            </div>
        );
    }
}

export default DevStatistic;