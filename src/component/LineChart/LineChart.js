import React, { Component } from 'react'
import echarts from 'echarts'
import { Checkbox,message,Card } from 'antd'
import './LIneChart.scss'

const CheckboxGroup = Checkbox.Group;

const checkOptions = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];

const option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#ddd'
            }
        },
        backgroundColor: 'rgba(255,255,255,1)',
        padding: [5, 10],
        textStyle: {
            color: '#7588E4',
        },
        extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
    },
    xAxis: {
        type: 'category',
        data: ['00:00','2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00',"22:00"]
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name: 'IOS',
        data: ['100', '400', '908', '411', '1726', '688', '600', '1100', '1200', '500', '518', '922'],
        type: 'line',
    },{
        name: 'WINDOWS',
        data: ['1200', '1400', '1008', '1411', '1026', '1288', '1300', '800', '1100', '1000', '1118', '1322'],
        type: 'line'
    }]
}

class LineChart extends Component {
    state = {
        checkValue: [] 
    }
    componentDidMount(){
        this.initChat()
        // setTimeout(()=>{this.reciveData()},500)
        window.onresize = () => {
            this.lineChart.resize()
        }
    }
    componentDidUpdate(){
        window.dispatchEvent(new Event('resize'))
    }
    initChat(){
        this.lineChart = echarts.init(document.getElementById('lineChart'))
        this.lineChart.setOption(option)
    }
    reciveData(){
        const xData = this.props.xData
        const yData = this.props.yData
        this.lineChart.setOption({
            xAxis: {
                data: xData
            },
            series: [{
                data: yData
            }]
        })
    }
    onChange(checkedValues) {
        if(checkedValues.length >2){
            message.destroy()
            message.warning('最多只能选择两个数据对比！')
            return
        }
        this.setState({
            checkValue: checkedValues
        })
      }
    render() {
        return (
            <div className="line-chart-wrapper">
                <Card>
                    <div className="checkbox-wrapper">
                        <CheckboxGroup options={checkOptions} value={this.state.checkValue} onChange={this.onChange.bind(this)} />
                    </div>
                    <div id="lineChart"></div>
                </Card>
            </div>
        );
    }
}

export default LineChart;