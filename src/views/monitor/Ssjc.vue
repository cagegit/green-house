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

            <div class="ss-card">
                <div class="ss-line">
                    <div class="ss-title">
                        <img src="@/assets/img/wd@2x.png"/>
                        <span>温度情况</span>
                    </div>
                    <div @click="changeWaring(1)">
                        <img class="ss-xq" src="@/assets/img/xq@2x.png"/>
                    </div>
                </div>
                <div class="ss-line-no-icon">
                    <span>温度</span>
                    <span class="sb-pink">40°C</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>获取时间</span>
                    <span>7-24 08:45:44</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>告警级别</span>
                    <span class="sb-pink">5级,风机已开启</span>
                </div>
            </div>
            <div class="ss-card">
                <div class="ss-line">
                    <div class="ss-title">
                        <img src="@/assets/img/tr@2x.png"/>
                        <span>土壤情况</span>
                    </div>
                    <div @click="changeWaring(1)">
                        <img class="ss-xq" src="@/assets/img/xq@2x.png"/>
                    </div>
                </div>
                <div class="ss-line-no-icon">
                    <span>温度</span>
                    <span class="sb-orange">40°C</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>获取时间</span>
                    <span>7-24 08:45:44</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>告警级别</span>
                    <span class="sb-orange">4级,风机已开启</span>
                </div>
            </div>
            <div class="ss-card">
                <div class="ss-line">
                    <div class="ss-title">
                        <img src="@/assets/img/PH@2x.png"/>
                        <span>PH值情况</span>
                    </div>
                    <div @click="changeWaring(1)">
                        <img class="ss-xq" src="@/assets/img/xq@2x.png"/>
                    </div>
                </div>
                <div class="ss-line-no-icon">
                    <span>温度</span>
                    <span class="sb-yellow">40°C</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>获取时间</span>
                    <span>7-24 08:45:44</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>告警级别</span>
                    <span class="sb-yellow">3级,风机已开启</span>
                </div>
            </div>
            <div class="ss-card">
                <div class="ss-line">
                    <div class="ss-title">
                        <img src="@/assets/img/PH@2x.png"/>
                        <span>PH值情况</span>
                    </div>
                    <div @click="changeWaring(1)">
                        <img class="ss-xq" src="@/assets/img/xq@2x.png"/>
                    </div>
                </div>
                <div class="ss-line-no-icon">
                    <span>温度</span>
                    <span class="sb-blue">40°C</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>获取时间</span>
                    <span>7-24 08:45:44</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>告警级别</span>
                    <span class="sb-blue">2级,风机已开启</span>
                </div>
            </div>
            <div class="ss-card">
                <div class="ss-line">
                    <div class="ss-title">
                        <img src="@/assets/img/tr@2x.png"/>
                        <span>土壤情况</span>
                    </div>
                    <div @click="changeWaring(1)">
                        <img class="ss-xq" src="@/assets/img/xq@2x.png"/>
                    </div>
                </div>
                <div class="ss-line-no-icon">
                    <span>温度</span>
                    <span class="sb-green">40°C</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>获取时间</span>
                    <span>7-24 08:45:44</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>告警级别</span>
                    <span class="sb-green">1级,风机已开启</span>
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
                            <div class="sb"><input type="text" value="26℃"/></div>
                            <button type="button">+</button>
                        </div>
                    </div>
                    <div class="flex-st">
                        <div class="st-left">下限</div>
                        <div class="gj-set">
                            <button type="button">-</button>
                            <div class="sb"><input type="text" value="26℃"/></div>
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
    import {getWarings} from '../../service'
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
                warings: 0
            }
        },
        created(){
           // this.getLocationAndWeather();
            this.countWarings();
        },
        methods: {
            changeWaring(num){
                console.log(num);
                this.show = true;
            },
            countWarings() {
                // type=3 //1：按级别 2：按日期 3：按大棚 &corp_id=1// 客户id&status=1 // 1:报警中 0：历史报警
                const fromTime = "2018-09-01";
                const toTime = new Date().dateFormat("yyyy-MM-dd");
                getWarings(3,1,1,fromTime,toTime).then(res => {
                    // console.log(res);
                    if(res && res.data && res.data.status ===1) {
                        if(res.data.results && res.data.results.length>0) {
                            this.warings = res.data.results[0].count;
                        }
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            toWarPage(){
                this.$router.push('/warning');
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
            }
        }
    }
    .sb-pink{
        color: $sbjc-pink;
    }
    .sb-orange{
        color: $sbjc-orange;
    }
    .sb-yellow{
        color: $sbjc-yellow;
    }
    .sb-blue{
        color: $sbjc-blue;
    }
    .sb-green{
        color: $sbjc-green;
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