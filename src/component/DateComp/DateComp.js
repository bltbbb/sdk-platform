import React, { Component } from 'react'
import { DatePicker,Radio  } from 'antd'
import moment from 'moment'

import './DateComp.scss'

const { RangePicker } = DatePicker
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class DateComp extends Component {
    constructor(props){
        super(props)
        this.state = {
            dateValue:  [moment(),moment()]
        }
    }
    disabledDate(current) {
        return current && current > moment().endOf('day');
      }
    setDateData(value){
        this.setState({
            dateValue: value
        })
    }
    onChange(e) {
        const { value } = e.target
        switch (value) {
            case 'today':
                this.setDateData([moment(),moment()])
                break;
            case 'yesterday':
                this.setDateData([moment().subtract(1, 'days'),moment().subtract(1, 'days')])
                break;
            case '7day':
                this.setDateData([moment().subtract(7, 'days'),moment()])
                break;
            case '30day':
                this.setDateData([moment().subtract(30, 'days'),moment()])
                break;
            case '60day':
                this.setDateData([moment().subtract(60, 'days'),moment()])
                break;
            case 'all':
                this.setDateData([])
                break;
            default:
                break;
        }
      }
    pickerChange(dates,dateStrings){
        if(!!dates){
            this.setDateData(dates)
        }
    }
    render() {
        return (
            <div className="dateComp">
                <div className="roadio-wrapper">
                    <RadioGroup onChange={this.onChange.bind(this)} defaultValue='today'>
                        <RadioButton value='today'>今天</RadioButton>
                        <RadioButton value='yesterday'>昨天</RadioButton>
                        <RadioButton value='7day'>近7天</RadioButton>
                        <RadioButton value='30day'>近30天</RadioButton>
                        <RadioButton value='60day'>近60天</RadioButton>
                        <RadioButton value='all'>全部</RadioButton>
                    </RadioGroup>
                </div>
                <RangePicker onChange={this.pickerChange.bind(this)} placeholder={['开始','结束']} value={this.state.dateValue} disabledDate={this.disabledDate} />
            </div>
        )
    }
}

export default DateComp