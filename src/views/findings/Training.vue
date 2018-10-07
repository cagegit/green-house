<template>
    <div>
        <div class="card-list" v-for="item in trainList"  :key="item.id">
            <div class="card-img">
                <img src="@/assets/img/topimg@2x.png" alt=""/>
                <div class="card-date flex">
                    <span>{{item.date}}</span>
                    <span>{{item.time}}</span>
                </div>
            </div>
            <div class="card-txt flex">
                {{item.tit}}
            </div>
        </div>
    </div>
</template>
<script>
    import { Tab, Tabs } from 'vant'
    export default {
    name: "Message",
    components: {
        [Tabs.name]: Tabs,
        [Tab.name]: Tab,
    },
    data() {
        return {
            trainList: [{
                id:1,
                imgUrl:"@/assets/img/topimg@2x.png",
                date:"8月12日",
                time:"16:25",
                tit:"培训：我是文章题目我是文章题目1"
            },
            {
                id:2,
                imgUrl:"@/assets/img/topimg@2x.png",
                date:"8月12日",
                time:"16:25",
                tit:"培训：我是文章题目我是文章题目2"
            },
            {
                id:3,
                imgUrl:"@/assets/img/topimg@2x.png",
                date:"8月12日",
                time:"16:25",
                tit:"培训：我是文章题目我是文章题目3"
            },
            {
                id:4,
                imgUrl:"@/assets/img/topimg@2x.png",
                date:"8月12日",
                time:"16:25",
                tit:"培训：我是文章题目我是文章题目4"
            }
            ]
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
        padding-bottom:1.5rem;
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
            font-size:0.373333rem;
            margin-right:0.16rem;
        }
        
    }
</style>