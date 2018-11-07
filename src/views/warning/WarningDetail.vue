<template>
        <div>
            <HeadBar title="告警详情" link="" class="top-nav-bar"></HeadBar>
            <div class="main-body">
                <div class="war-detail">
                    <div class="warn-top">
                        <div class="detail-item flex">
                            <div class="warn-type">告警类型</div>
                            <div class="warn-value">{{detailCard.name}}告警</div>
                        </div>
                        <div class="detail-item flex">
                            <div class="warn-type">当前值</div>
                            <div class="warn-value">{{detailCard.data1}}{{detailCard.unitname}}</div>
                        </div>
                        <div class="detail-item flex">
                            <div class="warn-type">正常值</div>
                            <div class="warn-value">{{detailCard.low}}{{detailCard.unitname}}~{{detailCard.high}}{{detailCard.unitname}}</div>
                        </div>
                        <div class="detail-item flex">
                            <div class="warn-type">告警级别</div>
                            <div class="warn-value">{{detailCard.level}}级</div>
                        </div>
                        <div class="detail-item flex">
                            <div class="warn-type">告警时间</div>
                            <div class="warn-value">{{formatDate(detailCard.time1)}}</div>
                        </div>
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
              detailCard:{}
            }
        },
        props: {
            detailWarn:Object
        },
        created(){
            this.detailCard = Object.assign({},JSON.parse(JSON.stringify(this.detailWarn)));
        },
        methods:{
            formatDate(dateStr) {
                let date = new Date(dateStr);
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let today = date.getDate();
                let hour = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                return (year + "-" + month + "-" + today + " " + hour + ":" + minutes + ":" + seconds);
            }
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
        padding: 0 10px;
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