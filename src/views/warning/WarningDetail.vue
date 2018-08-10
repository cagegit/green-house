<template>
    <div>
        <HeadBar title="告警详情" link="" class="top-nav-bar"></HeadBar>  
        <div class="war-detail">
            <div class="warn-top">
                <div>
                    
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
        height:8.346667rem;
        margin-top:0.24rem;
    }
    .warn-top{
        padding:0 0.533333rem;
        height:5.866667rem;
        border-bottom:1px solid #E9E7E1;
    }
</style>