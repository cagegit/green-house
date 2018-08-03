<template>
    <div class="monitor">
        <HeadBar title="设施信息" link="/monitor/main"></HeadBar>
        <DpTab :active="4"></DpTab>
        <div class="main-body">
            <div class="sb-cell">
                <div class="sb-c-left">
                    <span>图像</span>
                </div>
                <div class="sb-c-right">
                    <img src="@/assets/img/dp@2x.png">
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="sb-cell">
                <div class="sb-c-left">
                    <span>大棚名称</span>
                </div>
                <div class="sb-c-right">
                    <span>一号西红柿大棚</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="sb-cell">
                <div class="sb-c-left">
                    <span>作物种类</span>
                </div>
                <div class="sb-c-right">
                    <span>非转基因西红柿</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="sb-cell">
                <div class="sb-c-left">
                    <span>大棚尺寸</span>
                </div>
                <div class="sb-c-right">
                    <span>200*800</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="sb-cell">
                <div class="sb-c-left">
                    <span>所在地</span>
                </div>
                <div class="sb-c-right">
                    <span>北京市海淀区</span>
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
        name: 'Ssxx',
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
            color: #202323;
        }
        .sb-c-right {
            display: flex;
            align-items: center;
            i,span {
                color: #B2B2B2;
                font-size: 14px;
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