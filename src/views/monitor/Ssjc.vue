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
                    <div><van-icon name="wap-nav" /></div>
                </div>
                <div class="ss-line-no-icon">
                    <span>温度</span>
                    <span>40°C</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>获取时间</span>
                    <span>7-24 08:45:44</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>告警级别</span>
                    <span>5级,风机已开启</span>
                </div>
            </div>
            <div class="ss-card">
                <div class="ss-line">
                    <div class="ss-title">温度情况</div>
                    <div><van-icon name="wap-nav" /></div>
                </div>
                <div class="ss-line-no-icon">
                    <span>温度</span>
                    <span>40°C</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>获取时间</span>
                    <span>7-24 08:45:44</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>告警级别</span>
                    <span>5级,风机已开启</span>
                </div>
            </div>
            <div class="ss-card">
                <div class="ss-line">
                    <div class="ss-title">温度情况</div>
                    <div><van-icon name="wap-nav" /></div>
                </div>
                <div class="ss-line-no-icon">
                    <span>温度</span>
                    <span>40°C</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>获取时间</span>
                    <span>7-24 08:45:44</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>告警级别</span>
                    <span>5级,风机已开启</span>
                </div>
            </div>
            <div class="ss-card">
                <div class="ss-line">
                    <div class="ss-title">温度情况</div>
                    <div><van-icon name="wap-nav" /></div>
                </div>
                <div class="ss-line-no-icon">
                    <span>温度</span>
                    <span>40°C</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>获取时间</span>
                    <span>7-24 08:45:44</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>告警级别</span>
                    <span>5级,风机已开启</span>
                </div>
            </div>
            <div class="ss-card">
                <div class="ss-line">
                    <div class="ss-title">温度情况</div>
                    <div><van-icon name="wap-nav" /></div>
                </div>
                <div class="ss-line-no-icon">
                    <span>温度</span>
                    <span>40°C</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>获取时间</span>
                    <span>7-24 08:45:44</span>
                </div>
                <div class="ss-line-no-icon">
                    <span>告警级别</span>
                    <span>5级,风机已开启</span>
                </div>
            </div>



        </div>
    </div>
</template>
<script>
    import { Tabbar, TabbarItem,Icon} from 'vant'
    import HeadBar from '../../components/HeadBar'
    import DpTab from '../../components/DpTab'
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
                active: 0
            }
        }
    }
</script>
<style lang="scss" scoped>
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
</style>