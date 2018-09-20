<template>
    <div>
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          class="card-wrap"
        >
            <van-cell class="card-list" v-for="(item,index) in cardList"  :key="index">
                <div class="card-img">
                    <img :src="item.imgUrl" alt=""/>
                    <div class="card-date flex">
                        <span>{{item.ctime}}</span>
                        <!-- <span>{{item.time}}</span> -->
                    </div>
                </div>
                <div class="card-txt flex">
                    {{item.title}}
                </div>
            </van-cell>
        </van-list>

    </div>
</template>
<script>
    import { Tab, Tabs, List, Cell } from 'vant'
    import {getFindList, getFindTab} from '../../service'
    export default {
        name: "Message",
        components: {
            [Tabs.name]: Tabs,
            [Tab.name]: Tab,
            [List.name]: List,
            [Cell.name]: Cell
        },
        data() {
            return {
                cardList: [{
                    id:1,
                    imgUrl:"@/assets/img/topimg@2x.png",
                    date:"8月12日",
                    time:"16:25",
                    tit:"消息：我是文章题目我是文章题目1"
                }],
                list: [],
                loading: false,
                finished: false,
                currentPage:0,
                type:1
            }
        },
        mounted(){
            // this.getTabList();
        },
        methods: {
            onLoad() {
                getFindList(this.$store.state.token, this.currentPage, 10,this.type).then(res=>{
                    if(res.data.code==1){
                        this.currentPage +=1;
                        this.loading = false;
                        if (res.data.results.length == 0) {
                            this.finished = true
                            for(var i=0; i<this.cardList.length; i++){
                                var date = new Date(this.cardList[i].ctime);
                                var year = date.getFullYear();
                                var month = date.getMonth()+1;
                                var today = date.getDate();
                                var hour = date.getHours();
                                var minutes = date.getMinutes();
                                var seconds = date.getSeconds();
                                var formatTime = year + "-" + month + "-" + today + " " + hour + ":" + minutes + ":" + seconds
                                this.cardList[i].ctime = formatTime;
                            }
                        }else{
                            this.cardList = Object.assign([],this.cardList,res.data.results)
                            //console.log("dddddddddddd:")
                            //console.log(res.data.results)
                            //console.log(this.cardList)
                        }
                    }
                })
            },
            
        }
    }
</script>
<style lang="scss" scoped>
    .flex{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .mess {
        width: 2.0rem;
        height: 0.8rem;     
        border-radius:0.4rem;
        text-align:center;
        line-height:0.8rem;
        border:1px solid #eee;
        margin-right:0.306667rem;
    }
    .switch-tab{
        margin-bottom:0.533333rem;
        flex-wrap:nowrap;
        justify-content:flex-start;
    }
    .active-tab{
        background: #44E3A8;
        color:#ffffff;
    }
    .card-list{
        background: #FFFFFF;
        box-shadow: 0 0.08rem 0.133333rem 0 rgba(190,190,190,0.20);
        border-radius: 0.266667rem;
        width:8.933333rem;
        height:4.106667rem;
        margin-bottom:0.4rem;
        padding:0;
    }
    .card-img{
        height:2.666667rem;
        position:relative;
        img{
            height:2.666667rem;
            width:100%;
            display:block;
        }
    }
    .card-txt{
        font-size:0.453333rem;
        margin-top:0.4rem;
    }
    .card-date{
        padding:0 0.32rem;
        height:0.586667rem;
        background: rgba(0,0,0,0.40);    
        position:absolute;
        top:0;
        right:0;
        border-top-right-radius:0.266667rem;
        span{
            color:#fff;
            font-size:0.426667rem;
            margin-right:0.16rem;
        }
        
    }
</style>