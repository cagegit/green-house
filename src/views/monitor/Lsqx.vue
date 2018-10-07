<template>
    <div class="monitor">
        <HeadBar title="历史曲线" link="/monitor/main"></HeadBar>
        <DpTab :active="3"></DpTab>
        <v-touch v-on:swiperight="onSwipeRight" tag="div">
            <div class="main-body">
                <div class="sb-input-box">
                    <button type="button"><div class="in-box"><span>光照</span> <img src="@/assets/img/Group 3.png"/></div></button>
                </div>
                <div class="date-panel">
                    <van-tabs v-model="active" @click="tabChange">
                        <van-tab class="sb-tab" v-for="item in dataList" :key="item.index" :title="item.title">
                            <div class="time-control">
                                <span class="ctrl" @click="preByTab"><van-icon name="arrow-left" /></span>
                                <span class="title">{{currentTime}}</span>
                                <span class="ctrl" @click="nextByTab"><van-icon name="arrow" /></span>
                            </div>
                        </van-tab>
                    </van-tabs>
                    <div class="chart-wrapper">
                        <canvas id="mountNode"></canvas>
                    </div>
                </div>
            </div>
        </v-touch>
    </div>
</template>
<script>
    import HeadBar from '../../components/HeadBar'
    import DpTab from '../../components/DpTab'
    import { Tab, Tabs,Icon } from 'vant';
    import F2 from '@antv/f2/lib';
    import {getDayLs,getMonthLs,getYearLs} from '../../service';
    import _ from 'lodash/fp';
    const can_width = document.getElementById('app').offsetWidth - 50;
    const can_height = 250;
    function initChart(data) {
        const chart = new F2.Chart({
            id: 'mountNode',
            pixelRatio: window.devicePixelRatio || 1,
            width: can_width,
            height: can_height
        });

        const defs = {
            ctime: {
                type: 'timeCat',
                mask: 'HH:MM',
                tickCount: 5,
                range: [0, 1]
            },
            data: {
                tickCount: 5,
                min: 0,
                alias: '日均光照'
            }
        };
        chart.source(data, defs);
        chart.axis('data',{
            label: function () {
                return {
                    fill: '#fff'
                };
            }
        });
        chart.axis('ctime', {
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
        chart.line().position('ctime*data').shape('smooth').style({
            stroke: '#fff',
            lineWidth: 1
        });
        chart.point().position('ctime*data').shape('smooth').style({
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
                    {title:'季度',index:4},
                    {title:'年',index:3}
                ],
                chartData: [],
                currentTime:'2018-09-20'
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
           // this.tabChange(1);
           this.drawDayChart(261,1,20180901);
           const that = this;
            window.onresize = function () {
               _.debounce(function () {
                   initChart(that.chartData);
               },300);
            };
        },
        methods: {
            tabChange(index) {
                //console.log(index);
               if(index ===1) { // 按月统计
                  //this.drawMonthChart(261,2,201809);
                  this.currentTime = '2018-09';
               } else if(index ===2) {// 按年统计
                   // this.drawYearChart(261,3,2018);
                   this.currentTime = '2018';
               } else if(index ===3) {// 历年统计

               } else { // 按日统计
                 // this.drawDayChart(261,1,20180901);
                   this.currentTime = '2018-09-01'
               }
            },
            preByTab() {
                //console.log(this.active);
            },
            nextByTab() {
                //console.log(this.active);
            },
            drawDayChart(id,type,day) {
                getDayLs(id,type,day).then(res => {
                    //console.log(res.data);
                    if(res.data && res.data.results) {
                        this.chartData =res.data.results.map(val => {
                            const ctime = val.day.toString().replace(/^(\d{4})(\d{2})(\d{2})/,'$1-$2-$3') + " "+val.hour+':'+val.min;
                            return {data:val.data,ctime:ctime};
                        });
                        if(this.chartData.length>0) {
                            this.currentTime = this.chartData[0].ctime.substr(0,10);
                        }
                        initChart(this.chartData);
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            drawMonthChart(id,type,month) {
                getMonthLs(id,type,month).then(res => {
                    //console.log(res.data);
                    if(res.data && res.data.results) {
                        this.chartData =res.data.results;
                        if(this.chartData.length>0) {
                            this.currentTime = this.chartData[0].ctime.substr(0,10);
                        }
                        initChart(this.chartData);
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            drawYearChart(id,type,year) {
                getYearLs(id,type,year).then(res => {
                    //console.log(res.data);
                    if(res.data && res.data.results) {
                        this.chartData =res.data.results;
                        if(this.chartData.length>0) {
                            this.currentTime = this.chartData[0].ctime.substr(0,10);
                        }
                        initChart(this.chartData);
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            onSwipeRight() {
                this.$router.push({name:'main'});
            }
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