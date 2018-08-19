<template>
    <div class="monitor">
        <HeadBar title="历史曲线" link="/monitor/main"></HeadBar>
        <DpTab :active="3"></DpTab>
        <div class="main-body">
            <div class="sb-input-box">
                <button><div class="in-box"><span>温度</span> <img src="@/assets/img/Group 3.png"/></div></button>
            </div>
            <div class="date-panel">
                <van-tabs v-model="active">
                    <van-tab class="sb-tab" v-for="item in dataList" :key="item.index" :title="item.title">
                        <div class="time-control">
                            <span class="ctrl"><van-icon name="arrow-left" /></span>
                            <span class="title">2017-10-20</span>
                            <span class="ctrl"><van-icon name="arrow" /></span>
                        </div>
                    </van-tab>
                </van-tabs>
                <div class="chart-wrapper">
                    <canvas id="mountNode"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import HeadBar from '../../components/HeadBar'
    import DpTab from '../../components/DpTab'
    import { Tab, Tabs,Icon } from 'vant';
    import F2 from '@antv/f2/lib';
    import _ from 'lodash/fp';
    function initChart() {
        const data =
            [{
            time: '2016-08-08 00:00:00',
            tem: 10
        }, {
            time: '2016-08-08 00:10:00',
            tem: 22
        }, {
            time: '2016-08-08 00:30:00',
            tem: 20
        }, {
            time: '2016-08-09 00:35:00',
            tem: 26
        }, {
            time: '2016-08-09 01:00:00',
            tem: 20
        }, {
            time: '2016-08-09 01:20:00',
            tem: 26
        }, {
            time: '2016-08-10 01:40:00',
            tem: 28
        }, {
            time: '2016-08-10 02:00:00',
            tem: 20
        }, {
            time: '2016-08-10 02:20:00',
            tem: 18
        }];

        const chart = new F2.Chart({
            id: 'mountNode',
            width: document.getElementById('app').offsetWidth - 50,
            height: 250
        });

        const defs = {
            time: {
                type: 'timeCat',
                mask: 'HH:MM',
                tickCount: 4,
                range: [0, 1]
            },
            tem: {
                tickCount: 5,
                min: 0,
                alias: '日均温度'
            }
        };
        chart.source(data, defs);
        chart.axis('tem',{
            label: function () {
                return {
                    fill: '#fff'
                };
            }
        });
        chart.axis('time', {
            label: function label(text, index, total) {
                let textCfg = {};
                if (index === 0) {
                    textCfg.textAlign = 'left';
                } else if (index === total - 1) {
                    textCfg.textAlign = 'right';
                }
                textCfg.fill ='#fff';
                return textCfg;
            }
        });
        chart.tooltip({
            showCrosshairs: true
        });
        chart.line().position('time*tem').shape('smooth').style({
            stroke: '#fff',
            lineWidth: 3
        });
        chart.point().position('time*tem').shape('smooth').style({
            stroke: '#fff',
            lineWidth: 6
        });
        chart.render();
    }
    export default {
        name: 'Lsqx',
        data() {
            return {
                active: 0,
                dataList: [
                    {title:'日',index:1},
                    {title:'月',index:2},
                    {title:'年',index:3},
                    {title:'历年',index:4}
                ]
            };
        },
        components: {
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            [Icon.name]:Icon,
            HeadBar,
            DpTab
        },
        mounted() {
            initChart();
            window.onresize = function () {
               _.debounce(function () {
                   initChart();
               },300);
            };
        }

    }
</script>
<style lang="scss">
    @import "../../sass/variable";
    .sb-input-box {
        margin: 10px auto;
       button{
           border: none;
           border-radius: 100px;
           width: 150px;
           height: 30px;
           line-height: 30px;
           text-align: left;
           cursor:pointer;
           background-color: #fff;
       }
        .in-box{
            display: flex;
            justify-content: space-between;
            flex: 1;
            padding: 0 15px;
        }
        img {
            width: 16px;
            height: 16px;
            display: inline-block;
            padding-top: 6px;
        }
    }
    .date-panel {
        background: #FFFFFF;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
        border-radius: 10px;
        margin: 15px auto;
        padding: 10px 15px;
        line-height: 24px;
        .van-tab--active span{
                color: $main-border-color !important;
        }
        .van-tabs__line {
            background-color: $main-border-color !important;
        }
    }
    #mountNode {
        background-image: linear-gradient(-138deg, #2EF4D0 0%, #21BBEF 100%);
        border-radius: 10px;
    }
    .time-control {
        display: flex;
        flex: 1;
        justify-content: space-between;
        padding: 10px 5px;
        .ctrl {
            color: #44E3A8;
            font-weight: bolder;
        }
        .title{
            color:#5E5F63;
        }
    }
</style>