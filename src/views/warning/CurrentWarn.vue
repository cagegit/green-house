<template>
    <div>
        <div class="switch-tab flex">
        <div class="mess active-tab"
        >当前警告</div>
        <div class="mess"
        @click="switchBtn"
        >历史警告</div>
    </div>
    <div class="warn-list">
        <div class="warn-item" v-for="item in warnList" :key="item.id" @click="toDetail">
            <div class="flex item-top">
                <div class="house-name">{{item.houseName}}</div>   
                <div class="warn-time"><span>{{item.date}}  </span><span> {{item.time}}</span></div>
            </div>
            <div class="item-bottom flex">
                <span>{{item.type}}：</span>
                <span class="warn-rank">4级告警</span>
                <span>{{item.addr}}</span>      
            </div>      
        </div>
    </div>
    <FootBar :active="3"></FootBar>
    </div>
    
</template>
<script>
    import FootBar from '@/components/FootBar'
    export default {
        name: "currentWarn",
         components: {
            FootBar
        },
        data() {
            return {
                warnList:[{
                    id:1,
                    houseName:"一号西红柿大棚",
                    date:"7月12",
                    time:"12:25",
                    type:"湿度传感器",
                    rank:"4级告警",
                    addr:"房山区农委--园区1"
                },{
                    id:2,
                    houseName:"二号西红柿大棚",
                    date:"7月12",
                    time:"12:25",
                    type:"湿度传感器",
                    rank:"4级告警",
                    addr:"房山区农委--园区1"
                },{
                    id:3,
                    houseName:"三号西红柿大棚",
                    date:"7月12",
                    time:"12:25",
                    type:"湿度传感器",
                    rank:"4级告警",
                    addr:"房山区农委--园区1"
                },{
                    id:4,
                    houseName:"四号西红柿大棚",
                    date:"7月12",
                    time:"12:25",
                    type:"湿度传感器",
                    rank:"4级告警",
                    addr:"房山区农委--园区1"
                },{
                    id:5,
                    houseName:"五号西红柿大棚",
                    date:"7月12",
                    time:"12:25",
                    type:"湿度传感器",
                    rank:"4级告警",
                    addr:"房山区农委--园区1"
                }
                ]
            }
             
        },
        methods:{
            toDetail(){
                this.$router.push("/warning/warningDetail");
            },
            switchBtn(){
                this.$router.push("/warning/historywarn");
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
    .switch-tab{
        margin-bottom:0.733333rem;
        flex-wrap:nowrap;
        justify-content:flex-start;
        margin-top:0.293333rem;
    }
    .mess {
        width: 3.2rem;
        font-family: PingFangSC-Regular;
        height: 1.013333rem;     
        border-radius:0.4rem;
        text-align:center;
        line-height:0.8rem;
        border:1px solid #eee;
        margin-right:0.306667rem;
        font-size:0.453333rem;
        font-weight:500;
        color: #A1ABB7;
        line-height: 0.933333rem;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
    }
    
    .active-tab{
        background: #44E3A8;
        font-size: 0.64rem;
        color: #202323;
    }
    .warn-list{
        padding-bottom:1.5rem;
    }
    .warn-item{
        background: #FFFFFF;
        border: 0.026667rem solid rgba(253,43,73,0.40);
        box-shadow: 0 0.08rem 0.133333rem 0 rgba(190,190,190,0.20);
        border-radius: 0.266667rem;
        height:2.586667rem;
        margin-bottom:0.4rem;
    }
    .item-top{
        padding:0 0.4rem;
        justify-content:space-between;
        height:1.146667rem;
        background: rgba(253,43,73,0.20);
        .house-name{
            font-size: 0.453333rem;
            color: #FD2B49;
        }
        .warn-time{
            opacity: 0.3;
            font-family: PingFangSC-Regular;
            font-size: 0.373333rem;
            color: #000000;
        }
    }
    .item-bottom{
        font-size: 0.4rem;
        color: #5E5F63;
        letter-spacing: -0.0.0096rem;
        line-height: 1.44rem;
        height:1.44rem;
        justify-content:flex-start;
        padding:0 0.4rem;
        .warn-rank{
            margin-right:0.293333rem;
        }
    }
</style>