<template>
    <div>
        <div class="switch-tab flex">
        <div class="mess active-tab"
        >当前警告</div>
        <div class="mess"
        @click="switchBtn"
        >历史警告</div>
    </div>
    <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad" 
        class="warn-list">

        <van-cell class="warn-item" v-for="(item,index) in warnList" :key="index" @click="toDetail(item)">
            <div class="flex item-top">
                <div class="house-name">{{item.peng.name}}</div>   
                <div class="warn-time"><span>{{item.peng.ctime}} </span></div>
            </div>
            <div class="item-bottom flex">
                <span>{{item.name}}：</span>
                <span class="warn-rank">{{item.level}}级告警</span>
                <!-- <span>{{item.addr}}</span>       -->
            </div>      
        </van-cell>

    </van-list>
    <FootBar :active="3"></FootBar>
    </div>
    
</template>
<script>
    import FootBar from '@/components/FootBar'
    import { Cell, List } from 'vant'
    import { getWaringList } from '@/service'
    export default {
        name: "currentWarn",
         components: {
            [List.name]: List,
            [Cell.name]: Cell,
            FootBar
        },
        data() {
            return {
                loading: false,
                finished: false,
                currentPage: 0,
                warnList:[],
                currentPage:0
            }
             
        },
        mounted(){
            // this.getWaringListFn(this.$store.state.user.id,1,0);
        },
        methods:{
            toDetail(item){
                this.$router.push({name:'warningDetail',params:{detailWarn:item}});
            },
            switchBtn(){
                this.$router.push("/warning/historywarn");
            },
            onLoad() {
                getWaringList(this.$store.state.user.id,1,this.currentPage).then(res =>{
                    if (res.data.results) {
                        this.currentPage += 1;
                        this.loading = false;
                        if (res.data.results.length == 0) {
                            this.finished = true
                        } else {
                            this.warnList = Object.assign([], this.warnList, res.data.results)
                            for (var i = 0; i < this.warnList.length; i++) {
                                var date = new Date(this.warnList[i].peng.ctime);
                                var year = date.getFullYear();
                                var month = date.getMonth() + 1;
                                var today = date.getDate();
                                var hour = date.getHours();
                                var minutes = date.getMinutes();
                                var seconds = date.getSeconds();
                                var formatTime = year + "-" + month + "-" + today + " " + hour + ":" + minutes + ":" + seconds
                                this.warnList[i].peng.ctime = formatTime;
                            }
                        }
                    }
                })
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
        padding:0;
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