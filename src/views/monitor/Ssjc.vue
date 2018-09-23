<template>
    <div class="monitor">
        <HeadBar title="实时监测" link="/monitor/main"></HeadBar>
        <DpTab :active="1"></DpTab>
        <div class="main-body">
            <!--\天气-->
             <Weather></Weather>
            <!--天气\-->
            <div class="ss-tip" v-if="warings>0">
                <button type="button" class="btn" @click="toWarPage()">您有{{warings}}个报警，请查看></button>
            </div>

            <div class="ss-card" v-for="item in devices" :key="item.id">
                <div class="ss-line">
                    <div class="ss-title">
                        <span>{{item.name}}</span>
                    </div>
                    <div @click="changeWaring(item.properties)">
                        <img class="ss-xq" src="@/assets/img/xq@2x.png"/>
                    </div>
                </div>
                <div class="ss-line-no-icon">
                    <div class="sb-pre">
                        <img :src="toImg(item.name)"/> <span>{{toLiang(item)}}</span>
                    </div>
                    <div class="sb-next">
                        <p>更新时间：{{item.time}}</p>
                        <p><span class="sb-pink">{{item.properties.sensorType}}级</span>风机已开启</p>
                    </div>
                </div>
            </div>

        </div>
        <van-dialog v-model="show" :show-cancel-button="true">
            <div class="dia-content">
                <div class="title">告警值设置</div>
                <div class="gj-box">
                    <div class="flex-st">
                        <div class="st-left">上限</div>
                        <div class="gj-set">
                            <button type="button">-</button>
                            <div class="sb"><input type="text" :value="limit_high"/></div>
                            <button type="button">+</button>
                        </div>
                    </div>
                    <div class="flex-st">
                        <div class="st-left">下限</div>
                        <div class="gj-set">
                            <button type="button">-</button>
                            <div class="sb"><input type="text" :value="limit_low"/></div>
                            <button type="button">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </van-dialog>
    </div>
</template>
<script>
    import { Tabbar, TabbarItem,Icon,Dialog } from 'vant'
    import Vue from 'vue'
    import HeadBar from '../../components/HeadBar'
    import DpTab from '../../components/DpTab'
    import Weather from '../../components/Weather'
    import {getWarings,getSensors,getLatestSensorData} from '../../service'
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
    Vue.use(Dialog);
    export default {
        name: 'Ssjc',
        components: {
            Weather,
            [Tabbar.name]:Tabbar,
            [TabbarItem.name]:TabbarItem,
            [Icon.name]:Icon,
            HeadBar,
            DpTab
        },
        data() {
            return {
                active: 0,
                show: false,
                air: {},
                weather: [],
                warings: 0,
                devices: [],
                sfImg: require("@/assets/img/tr@2x.png"),
                phImg: require("@/assets/img/PH@2x.png"),
                wdImg: require("@/assets/img/wd@2x.png"),
                limit_low:0,
                limit_high:0
            }
        },
        created(){
           // this.getLocationAndWeather();
            const {pid,token} = this.$store.state;
            if(!pid) {
                this.$router.back();
                return;
            }
            this.getConcatData(pid,token);
            this.countWarings();
        },
        methods: {
            changeWaring({limit_low,limit_high,readout_unit}){
                readout_unit = readout_unit? readout_unit.replace(/RH/g,'') : '';
                this.limit_low = limit_low+readout_unit;
                this.limit_high = limit_high+readout_unit;
                this.show = true;
            },
            countWarings() {
                // type=3 //1：按级别 2：按日期 3：按大棚 &corp_id=1// 客户id&status=1 // 1:报警中 0：历史报警
                const fromTime = "2018-09-01";
                const toTime = new Date().dateFormat("yyyy-MM-dd");
                getWarings(3,1,1,fromTime,toTime).then(res => {
                    if(res && res.data && res.data.status ===1) {
                        if(res.data.results && res.data.results.length>0) {
                            this.warings = res.data.results[0].count;
                        }
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            getConcatData(pid,token) {
                const quest1 = getSensors(pid,token);
                const quest2 = getLatestSensorData(pid);
                Promise.all([quest1,quest2]).then(res => {
                    const results = res.map(item => (item.data && item.data.results) || [] );
                    // console.log(results);
                    results[0].forEach(val => {
                        results[1].forEach(v => {
                            if(val.id === v._id) {
                                val['data'] =v.data ;
                                val['time'] =new Date(v.utime).dateFormat("yyyy-MM-dd hh:mm:ss");
                                val['properties'] = (val.properties && JSON.parse(val.properties)) || {};
                            }
                        });
                        if(results[1].length===0) {
                            val['data'] = 0;
                            val['time'] = new Date().dateFormat("yyyy-MM-dd hh:mm:ss");
                            val['properties'] = {};
                        }
                    });
                    this.devices = results[0];
                }).catch(err => {
                    console.log(err);
                })
            },
            toWarPage(){
                this.$router.push('/warning');
            },
            toImg(txt) {
                if(/温度|光照/g.test(txt)) {
                    return this.wdImg;
                } else if(/湿度/g.test(txt)) {
                    return this.sfImg;
                } else {
                    return this.phImg;
                }
            },
            toLiang(item) {
                let dw = item.properties.readout_unit;
                dw = dw ? dw.replace(/RH/g,''): '';
                return item.data + dw;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../sass/variable";
    .ss-tip {
        margin: 10px auto;
        button {
            color: #FD2B49;
            border-radius: 44px;
        }
    }
    .ss-card {
        background: #FFFFFF;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
        border-radius: 10px;
        margin: 15px auto;
        padding: 10px 15px;
        line-height: 24px;
        .ss-line {
            display: flex;
            justify-content: space-between;
            flex: 1;
            .ss-title {
                color: #191919 !important;
                font-size: 14px;
                img {
                    width: 18px;
                    height: 18px;
                    vertical-align: text-bottom;
                }
                span {
                    padding-left: 5px;
                }
            }
            .ss-xq {
                width: 14px;
                height: 14px;
            }
        }
        .ss-line-no-icon {
            display: flex;
            justify-content: space-between;
            flex: 1;
            color: #777777 !important;
            span:first-child {
                padding-left: 24px;
                margin-right: 5px;
            }
        }
    }
    .sb-pre{
        img {
            padding: 10px 5px;
            vertical-align: bottom;
            width: 30px;
            height: 30px;
        }
        span {
            font-size: 24px;
            line-height: 2.1;
        }
    }
    .sb-next{
        &>p {
            text-align: right;
            color: #777777
        }
    }
    .sb-pink{
        color: $sbjc-pink;
        border: 1px solid $sbjc-pink;
        padding: 0 3px !important;
    }
    .sb-orange{
        color: $sbjc-orange;
        border: 1px solid $sbjc-orange;
        padding: 0 3px !important;
    }
    .sb-yellow{
        color: $sbjc-yellow;
        border: 1px solid $sbjc-yellow;
        padding: 0 3px !important;
    }
    .sb-blue{
        color: $sbjc-blue;
        border: 1px solid $sbjc-blue;
        padding: 0 3px !important;
    }
    .sb-green{
        color: $sbjc-green;
        border: 1px solid $sbjc-green;
        padding: 0 3px !important;
    }
    .dia-content {
        padding: 20px;
        .title{
            font-size: 16px;
            /*font-weight: bold;*/
            color: #4D4C4C;
            letter-spacing: 1.7px;
        }
        .gj-box{
            padding: 20px 40px 0;
        }
        .flex-st{
            display: flex;
            flex: 1;
            justify-content: space-between;
            margin-bottom: 10px;
            line-height: 40px;
            .st-left{
                padding-right: 20px;
                width: 30%;
                color: #4D4C4C;
            }
        }
        .gj-set {
            display: flex;
            flex: 1;
            justify-content: space-between;
            width: 70%;
            .sb {
                text-align: center;
            }
            button {
                border: 1px solid #191A1D;
                width: 39px;
                /* height: 35px; */
                text-align: center;
                color: #191A1D;
                background-color: #fff;
                line-height: 20px;
                height: 20px;
                margin-top: 10px;
            }
            input {
                width: 80%;
                background: #EFEFEF;
                border-radius: 5px;
                padding: 0 5px;
                text-align: center;
                height: 30px;
            }
        }
    }
</style>