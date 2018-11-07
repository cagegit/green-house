<template>
           <div>
               <div class="dp-tab2">
                   <button type="button" @click="switchBtn(0)">当前告警</button>
                   <button type="button" @click="switchBtn(1)" class="active">历史告警</button>
               </div>
            <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                class="warn-list">
                <van-cell class="warn-item" v-for="(item,index) in warnList" :key="index" @click="toDetail(item)">
                    <div class="flex item-top">
                        <div class="house-name">{{item.pengName}}</div>
                        <div class="warn-time"><span>{{formatDate(item.time1)}} </span></div>
                    </div>
                    <div class="item-bottom flex">
                        <span>{{item.name}}：</span>
                        <span class="warn-rank">{{item.level}}级告警</span>
                        <!-- <span>{{item.addr}}</span>       -->
                    </div>
                </van-cell>
            </van-list>
            </div>
</template>
<script>
    import FootBar from '@/components/FootBar'
    import { Cell, List } from 'vant'
    import { getWaringList } from '@/service'
    export default {
        name: "historyWarn",
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
                warnList:[]
            }
             
        },
         mounted(){
            this.detailCard = Object.assign({},this.detailWarn);
        },
        methods:{
            switchBtn(num) {
                if(num ===1) {
                    this.$router.push({name:'historywarn'});
                } else {
                    this.$router.push({name:'currentwarn'});
                }
            },
            toDetail(item){
               this.$router.push({name:'warningDetail',params:{detailWarn:item}});
            },
            onLoad() {
                this.loading = true;
                getWaringList(this.$store.state.user.id,0,this.currentPage).then(res =>{
                    this.finished = false;
                    if (res.data && Array.isArray(res.data.results)) {
                        this.currentPage += 1;
                        this.warnList = this.warnList.concat(res.data.results);
                        const total = res.data.Total || 0;
                        if(this.warnList.length>=total) {
                          this.finished = true;
                        }
                    }
                    this.loading = false;
                }).catch(err => {
                    console.log(err);
                    this.loading = false;
                });
            },
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
            color: #ccc;
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