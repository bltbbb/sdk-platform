import React, { Component } from 'react';
import { Card } from 'antd'
import ListHeader from '../../component/ListHeader/ListHeader'
import echarts from 'echarts'
import axios from 'axios'

import './realtimeData.scss'

const listData = [
    {
        text: '在线应用数',
        value: 325
    },
    {
        text: '在线应用数',
        value: 325
    },
    {
        text: '在线应用数',
        value: 325
    },
    {
        text: '在线应用数',
        value: 325
    },
    {
        text: '在线应用数',
        value: 325
    },
    {
        text: '在线应用数',
        value: 325
    },
    {
        text: '在线应用数',
        value: 325
    },
]

const mapOption =  {
    tooltip: {
      trigger: 'item',
      transitionDuration: 0.8,
      showDelay: 0,
      backgroundColor: 'rgba(255,255,255,0.9)',
      padding: 15,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.3)',
      textStyle: {
        color: 'rgba(0,0,0,0.9)'
      }
//            ,
//            //formatter: '<div style="padding-bottom:10px;">{b}</div><div><span style="color: #5cc3ff;">累计启动次数: &nbsp;&nbsp;&nbsp;</span>{c}</div>',
//            formatter: function (params, ticket, callback) {
//                if(!params.value){
//                    return `<div style="padding-bottom:10px;">${params.name}</div><div><span style="color: #5cc3ff;">{{charName[0]}} &nbsp;&nbsp;&nbsp;</span>0</div>`
//                }else {
//                    return `<div style="padding-bottom:10px;">${params.name}</div><div><span style="color: #5cc3ff;">{{charName[0]}} &nbsp;&nbsp;&nbsp;</span>${params.value}</div>`
//                }
//            }
    },
    visualMap: {
      min: 1,
      max: 2000,
      left: 'left',
      top: 'bottom',
      text: ['高','低'],           // 文本，默认为数值文本
      calculable: true,
      orient: 'horizontal',
      inverse: 'true',
      inRange: {
        color: ['#E8F3FF','rgb(0, 119, 254)']
      }
    },
    series: {
        type: 'map',
        map: 'china',
        roam: false,
        top: 'top',
        itemStyle: {
          emphasis: {
            areaColor: '#b86dff'
          }
        },
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: true,
            textStyle: {
                color: '#fff'
            }
          }
        },
        data:[
            {
                name: '北京',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '天津',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '上海',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            }
        ]
      }
  }

const pieOption = {
    tooltip: {
       trigger: 'item',
       formatter: '{b}: {c} ({d}%)'
   },
   legend: {
        orient: 'vertical',
        x: 'right',
        y:'center',
        align: 'left',
        itemWidth: 5,
        itemHeight: 5,
        icon: 'circle',
        data:['IOS','安卓','WINDOWS'],
        // formatter:function(name){
        //     var oa = pieOption.series[0].data;
        //     var num = oa[0].value + oa[1].value + oa[2].value;
        //     for(var i = 0; i < pieOption.series[0].data.length; i++){
        //         if(name==oa[i].name){
        //             return name + '     ' + oa[i].value + '     ' + (oa[i].value/num * 100).toFixed(2) + '%';
        //         }
        //     }
        // }
    },
   backgroundColor:'#ffffff',
    series: [{
        radius: [100, 150],
        name: 'pie',
        type: 'pie',
        selectedMode: 'single',
        selectedOffset: 16, //选中是扇区偏移量
        clockwise: true,
        startAngle: 90,
        label: {
            normal: {
                formatter: '{b}\n{d}%'
            },
        },
        labelLine: {
            normal: {
                show: true
            }
        },
         itemStyle: {
           normal: {
               borderWidth: 3,
               borderColor: '#ffffff',
           },
           emphasis: {
               borderWidth: 0,
               shadowBlur: 5,
               shadowOffsetX: 0,
               shadowColor: 'rgba(0, 0, 0, 0.2)'
           }
       },
        data: [
            {
                value: 55,
                name: 'IOS'
            }, {
                value: 70,
                name: '安卓'
            }, {
                value: 25,
                name: 'WINDOWS'
            }
        ]
    }]
}  

class RealtimeData extends Component {
    componentDidMount(){
        this.initMapChat()
        this.initPieChart()
        window.onresize = () => {
            this.mapChart.resize()
            this.pieChart.resize()
        }
    }
    componentDidUpdate(){
        window.dispatchEvent(new Event('resize'))
    }
    initMapChat(){
        this.mapChart = echarts.init(document.getElementById('mapCharts'));
        axios.get('http://47.104.74.197:9998/china.json').then((res)=>{
          echarts.registerMap('china', res.data);
          this.mapChart.setOption(mapOption);
        })
        
    }
    initPieChart(){
        this.pieChart = echarts.init(document.getElementById('pieCharts'));
        this.pieChart.setOption(pieOption);
    }
    getMapData() {
        this.mapChart.setOption({
            series: [{
                data:[
                    {
                        name: '北京',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    }
                ]
            }]
        })
    }
    render() {
        return (
            <div className="realtime-wrapper">
                <div className='realtime-data'>
                    <ListHeader listData={listData}></ListHeader>
                </div>
                <div className="region-wrapper" onClick={this.getMapData.bind(this)}>
                    <Card title="在线用户地区分布" bordered={false}>
                        <div id="mapCharts"></div>
                    </Card>
                </div>
                <div className="pie-wrapper">
                    <Card title="服务器用户占比" bordered={false}>
                        <div id="pieCharts"></div>
                    </Card>
                </div>
            </div>
            
        );
    }
}

export default RealtimeData;