<template>
    <div class="monitor">
        <HeadBar title="实时监测" link="/monitor/main"></HeadBar>
        <DpTab :active="1"></DpTab>
        <div class="main-body">
            <!--<div>-->
                <!--天气-->
            <!--</div>-->
            <div class="ss-tip">
                <button type="button" class="btn">您有4个报警，请查看></button>
            </div>

            <div class="ss-card">
                <div class="ss-line">
                    <div class="ss-title">温度情况</div>
                    <div @click="changeWaring(1)"><van-icon name="wap-nav" /></div>
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
                    <div class="ss-title">土壤情况</div>
                    <div @click="changeWaring(1)"><van-icon name="wap-nav" /></div>
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
                    <div class="ss-title">PH值情况</div>
                    <div @click="changeWaring(1)"><van-icon name="wap-nav" /></div>
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
                    <div class="ss-title">PH值情况</div>
                    <div @click="changeWaring(1)"><van-icon name="wap-nav" /></div>
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
                    <div class="ss-title">土壤情况</div>
                    <div @click="changeWaring(1)"><van-icon name="wap-nav" /></div>
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
    Vue.use(Dialog);
    export default {
        name: 'Ssjc',
        components: {
            [Tabbar.name]:Tabbar,
            [TabbarItem.name]:TabbarItem,
            [Icon.name]:Icon,
            HeadBar,
            DpTab
        },
        data() {
            return {
                active: 0,
                show: false
            }
        },
        methods: {
            changeWaring(num){
                console.log(num);
                this.show = true;
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
            }
        }
        .ss-line-no-icon {
            display: flex;
            justify-content: space-between;
            flex: 1;
            color: #777777 !important;
            span:first-child {
                padding-left: 10px;
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
                height: 40px;
            }
        }
    }
</style>