<template>
    <div>
        <HeadBar title="告警详情" link="" class="top-nav-bar"></HeadBar>  
        <div class="war-detail">
            <div class="warn-top">
                <div class="detail-item flex">
                    <div class="warn-type">告警类型</div>
                    <div class="warn-value">湿度告警</div>
                </div>
                <div class="detail-item flex">
                    <div class="warn-type">当前值</div>
                    <div class="warn-value">80%</div>
                </div>
                <div class="detail-item flex">
                    <div class="warn-type">正常值</div>
                    <div class="warn-value">50%~70%</div>
                </div>
                <div class="detail-item flex">
                    <div class="warn-type">告警级别</div>
                    <div class="warn-value">2级   风机已开启</div>
                </div>
                <div class="detail-item flex">
                    <div class="warn-type">告警时间</div>
                    <div class="warn-value">今天 5:04</div>
                </div>
            </div>
            <div class="warn-bottom">
                <div class="detail-item flex">
                    <div class="warn-type">告警位置</div>
                </div>
                <div class="detail-item flex">
                    <div class="warn-value">房山区农委—园区1—一号西红柿大棚</div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
    import HeadBar from '@/components/HeadBar'
    export default {
        name: "WarningDetail",
        components: {
            HeadBar
        },
        data() {
            return {
              
            }
        },
        methods:{
        }
    }
</script>
<style lang="scss" scoped>
    .flex{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .content-warp {
        padding: 0 0.533333rem;
        margin-bottom:1.733333rem;
    }
    .top-nav-bar{
        background:#F5F7F9;
        margin-bottom:0.666667rem;

    }
    .van-nav-bar .van-icon{
        color:#4B4A4A !important;
        font-size:0.533333rem !important;
        font-weight:600 !important;
    }
    .van-nav-bar__title{
        font-size: 34px;
        color: #202323;
        font-weight:800 !important;
    }
    .war-detail{
        background: #FFFFFF;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
        border-radius: 20px;
        margin-top:0.24rem;
    }
    .warn-top{
        padding:0.24rem 0.533333rem 0;
        border-bottom:1px solid #E9E7E1;
        margin-top:0.24rem;
    }
    .detail-item{
        height:1.093333rem;
        justify-content:space-between;
        font-size: 0.4rem;
        color: #777777;
        letter-spxcing: -0.0096rem;
        line-height: 1.093333rem;
    }
    .warn-value{
        color: #4B4A4A;
    }
    .warn-bottom{
        padding:0 0.533333rem 0.24rem;
    }
</style>