<template>
    <div class="monitor">
        <HeadBar title="设备控制" link="/monitor/main"></HeadBar>
        <DpTab :active="2"></DpTab>
        <div class="main-body">
             <div class="sb-cell">
                 <div class="sb-c-left">
                     <img src="@/assets/img/fengj@2x.png">
                     <span>风机设备</span>
                 </div>
                 <div class="sb-c-right">
                     <span>开启</span>
                     <i class="van-icon van-icon-arrow"></i>
                 </div>
             </div>
            <div class="sb-cell">
                <div class="sb-c-left">
                    <img src="@/assets/img/juanlj@2x.png">
                    <span>卷帘机</span>
                </div>
                <div class="sb-c-right">
                    <span>关闭</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="sb-cell">
                <div class="sb-c-left">
                    <img src="@/assets/img/jiawl@2x.png">
                    <span>加温炉</span>
                </div>
                <div class="sb-c-right">
                    <span>2档</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="sb-cell">
                <div class="sb-c-left">
                    <img src="@/assets/img/zidc@2x.png">
                    <span>自动窗</span>
                </div>
                <div class="sb-c-right">
                    <span>开启</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="sb-cell">
                <div class="sb-c-left">
                    <img src="@/assets/img/guang@2x.png">
                    <span>灌溉</span>
                </div>
                <div class="sb-c-right">
                    <span>关闭</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="sb-cell">
                <div class="sb-c-left">
                    <img src="@/assets/img/zheyz@2x.png">
                    <span>遮阳罩</span>
                </div>
                <div class="sb-c-right">
                    <span>2档</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="sb-cell">
                <div class="sb-c-left">
                    <img src="@/assets/img/ship@2x.png">
                    <span>视频</span>
                </div>
                <div class="sb-c-right">
                    <span>开启</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="sb-cell">
                <div class="sb-c-left">
                    <img src="@/assets/img/co2@2x.png">
                    <span>二氧化碳发生器</span>
                </div>
                <div class="sb-c-right">
                    <span>关闭</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
    import HeadBar from '../../components/HeadBar'
    import DpTab from '../../components/DpTab'
    export default {
        name: 'Sbkz',
        components: {
            HeadBar,
            DpTab
        }
    }
</script>
<style lang="scss" scoped>
    .sb-cell {
        background: #FFFFFF;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
        border-radius: 5PX;
        height: 60px;
        line-height: 60px;
        text-align: left;
        padding: 5px 10px;
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        position: relative;
        margin-bottom: 10px;
        overflow: hidden;
        .sb-c-left {
            display: flex;
            align-items: center;
        }
        .sb-c-right {
            i,span {
                color: #B2B2B2;
            }
        }
        img {
            width: 40px;
            height: 40px;
            display: inline-block;
            border: 0;
        }
        span {
            font-size: 16px;
            color: #202323;
            padding-left: 10px;
        }
    }
</style>