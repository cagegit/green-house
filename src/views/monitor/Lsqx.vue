<template>
    <v-touch v-on:swiperight="onSwipeRight" tag="div">
        <div>
            <HeadBar title="历史曲线" link="/monitor/main"></HeadBar>
            <DpTab :active="3"></DpTab>
                <div class="main-body">
                    <div class="sb-input-box">
                        <button type="button" @click="dqShow=!dqShow"><div class="in-box"><span>{{currentDevice}}</span> <img src="@/assets/img/Group 3.png"/></div></button>
                    </div>
                    <div class="date-panel">
                        <van-tabs v-model="active" @click="tabChange">
                            <van-tab class="sb-tab" v-for="item in dataList" :key="item.index" :title="item.title">
                                <div class="time-control" @click="selectDate">
                                    <span class="ctrl"><van-icon name="arrow-left" /></span>
                                    <span class="title">{{currentTime}}</span>
                                    <span class="ctrl"><van-icon name="arrow" /></span>
                                </div>
                            </van-tab>
                        </van-tabs>
                        <div class="chart-wrapper" @click="toHengPage">
                            <canvas id="mountNode"></canvas>
                        </div>
                    </div>
                </div>
            <van-popup v-model="dqShow" position="bottom">
                <van-picker show-toolbar
                        :columns="pickerList"
                        @cancel="onCancel"
                        @confirm="onConfirm"/>
            </van-popup>
            <!--// 选择日-->
            <van-popup v-model="isDayShow" position="bottom">
                <van-datetime-picker
                        v-model="currentDay"
                        type="date"
                        :min-date="minDate"
                        :max-date="maxDate"
                        @confirm="dayConfirm"
                        @cancel="isDayShow=false"
                />
            </van-popup>
            <!--// 选择月-->
            <van-popup v-model="isMonthShow" position="bottom">
                <van-datetime-picker
                        v-model="currentMonth"
                        type="year-month"
                        :min-date="minMonth"
                        :max-date="maxMonth"
                        @confirm="monthConfirm"
                        @cancel="isMonthShow=false"
                />
            </van-popup>
            <!--// 选择年-->
            <van-popup v-model="isYearShow" position="bottom">
                <van-picker show-toolbar
                            :columns="yearList"
                            @cancel="isYearShow=false"
                            @confirm="yearConfirm"/>
            </van-popup>
        </div>
    </v-touch>
</template>
<script>
    import HeadBar from '../../components/HeadBar'
    import DpTab from '../../components/DpTab'
    import { Tab, Tabs,Icon,Picker,Popup,DatetimePicker } from 'vant';
    import F2 from '@antv/f2/lib';
    import {getDayLs,getMonthLs,getYearLs} from '../../service';
    import _ from 'lodash/fp';
    const can_width = document.getElementById('app').offsetWidth - 50;
    const can_height = 250;
    function initChart(data,aliasName,masks) {
        let ticks = 5;
        if(masks==='YYYY-MM-DD') {
            ticks = 4;
        }
        const chart = new F2.Chart({
            id: 'mountNode',
            pixelRatio: window.devicePixelRatio || 1,
            width: can_width,
            height: can_height
        });

        const defs = {
            ctime: {
                type: 'timeCat',
                mask: masks,
                tickCount: ticks,
                range: [0, 1]
            },
            data: {
                tickCount: 5,
                min: 0,
                alias: aliasName
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
        chart.line().position('ctime*data').shape('smooth').color('#EED5FF').size(2);
        chart.point().position('ctime*data').shape('smooth').color('#EED5FF').size(4);
        chart.render();
    }
    Date.prototype.dateFormat = function(fmt) { //author: meizz
        let o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(let k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    };
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
                currentTime:'2018-09-20',
                deviceId:'',
                currentIndex: 0,
                pickerTitle: '传感器',
                pickerList: [],
                currentDevice: '光照',
                currentMask: 'HH:MM',
                dqShow:false,
                isDayShow: false,
                currentDay: new Date(2018, 9, 1),
                minDate: new Date(2018, 8, 1),
                maxDate: new Date(),
                isMonthShow:false,
                currentMonth: new Date(2018,9),
                minMonth: new Date(2018,8),
                maxMonth: new Date(),
                currentYear: 2018,
                yearList: [],
                isYearShow:false,
                deviceList: [],
                selType: {
                    day:1,
                    month:2,
                    year: 3
                }
            };
        },
        components: {
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            [Icon.name]:Icon,
            [Picker.name]:Picker,
            [Popup.name]:Popup,
            [DatetimePicker.name]:DatetimePicker,
            HeadBar,
            DpTab
        },
        mounted() {
           const { sensorList } = this.$store.state;
           this.deviceList = sensorList;
           this.pickerList = sensorList.map(item => {
               return item.name.replace(/(传感器|\(.*\)|（.*）)/g,'');
           });
           // 年
            const date = new Date();
            const cYear = date.getFullYear();
            this.yearList = [cYear];
            if(sensorList.length>0) {
                this.deviceId = sensorList[0].id;
                this.drawDayChart(20180901);
            }
           const that = this;
            window.onresize = function () {
               _.debounce(function () {
                   initChart(that.chartData);
               },300);
            };
        },
        methods: {
            tabChange(index) {
                console.log(index);
               if(index ===1) { // 按月统计
                  if(this.currentIndex===0) {
                      this.currentTime = this.currentTime.slice(0,-3);
                   } else {
                       this.currentTime = '2018-09';
                   }
                  this.drawMonthChart(this.currentTime.replace(/-/g,''));
               } else if(index ===2) {// 季度统计
                   // 季度
               } else if(index ===3) {// 历年统计
                   this.currentTime = this.currentTime.slice(0,4);
                   this.drawYearChart(this.currentTime);
               } else { // 按日统计
                   if(this.currentIndex===1) {
                      this.currentTime = this.currentTime+'-01';
                   } else {
                      this.currentTime = '2018-09-01';
                   }
                   this.drawYearChart(this.currentTime.replace(/-/g,''));
               }
               this.currentIndex = index;
            },
            selectDate() {
               const index = this.currentIndex;
               if(index ===1) { // 月
                   this.isMonthShow = true;
               } else if(index ===2) { // 季度

               } else if(index === 3) {
                   this.isYearShow = true;
               } else {
                   this.isDayShow = true; // 日
               }
            },
            drawDayChart(day) {
                const type = this.selType.day;
                const id = this.deviceId;
                if(!id) {
                   return;
                }
                 this.currentMask = 'HH:MM';
                getDayLs(id,type,day).then(res => {
                    if(res.data && res.data.results && Array.isArray(res.data.results)) {
                        this.chartData =res.data.results.map(val => {
                            const ctime = val.day.toString().replace(/^(\d{4})(\d{2})(\d{2})/,'$1-$2-$3') + " "+val.hour+':'+val.min;
                            return {data:val.data,ctime:ctime};
                        });
                        if(this.chartData.length>0) {
                            this.currentTime = this.chartData[0].ctime.substr(0,10);
                        }
                        setTimeout(() => {
                           initChart(this.chartData,this.currentDevice,this.currentMask);
                        },500);
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            drawMonthChart(month) {
                const type = this.selType.month;
                const id = this.deviceId;
                if(!id) {
                   return;
                }
                this.currentMask = 'YYYY-MM-DD';
                getMonthLs(id,type,month).then(res => {
                    //console.log(res.data);
                         if(res.data && res.data.results && Array.isArray(res.data.results)) {

                        this.chartData =res.data.results.map(item => {
                             const dateStr = item._id.toString().replace(/(\d{4})(\d{2})(\d{2})/,'$1-$2-$3');
                             return {data:item.data_avg,ctime:dateStr};
                        });
                        setTimeout(() => {
                           initChart(this.chartData,this.currentDevice,this.currentMask);
                        },500);
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            drawYearChart(year) {
                const type = this.selType.year;
                const id = this.deviceId;
                if(!id) {
                   return;
                }
                this.currentMask = 'YYYY-MM';
                getYearLs(id,type,year).then(res => {
                    //console.log(res.data);
                    if(res.data && res.data.results && Array.isArray(res.data.results)) {
                        this.chartData =res.data.results.map(item => {
                            const dateStr = item._id.toString().replace(/(\d{4})(\d{2})/,'$1-$2');
                             return {data:item.avg,ctime:dateStr};
                        });
                        setTimeout(() => {
                           initChart(this.chartData,this.currentDevice,this.currentMask);
                        },500);
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            onSwipeRight() {
                this.$router.push({name:'main'});
            },
            toHengPage() {
                this.$store.commit('setChartData',this.chartData);
                this.$store.commit('setCharParams',{alias:this.currentDevice,mask:this.currentMask});
                this.$router.push({name:'heng'});
            },
            onConfirm(value, index) {
                this.currentDevice = value;
                this.deviceId = (this.deviceList[index]&& this.deviceList[index].id) || this.deviceId ;
                this.dqShow = false;
                this.tabChange(this.currentIndex);
            },
            onCancel() {
                this.dqShow = false;
            },
            dayConfirm(val) {
                console.log(val);
                this.currentTime = new Date(val).dateFormat("yyyy-MM-dd");
                this.isDayShow = false;
                this.drawDayChart(this.currentTime.replace(/-/g,''));
            },
            monthConfirm(val) {
                console.log(val);
                this.currentTime = new Date(val).dateFormat("yyyy-MM");
                this.isMonthShow = false;
                this.drawMonthChart(this.currentTime.replace(/-/g,''));
            },
            yearConfirm(val) {
                console.log(val);
                this.currentTime = val;
                this.isYearShow = false;
               this.drawYearChart(this.currentTime);
            }
        }

    }
</script>
<style lang="scss" scoped>
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