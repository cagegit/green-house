<template>
    <div class="monitor">
        <HeadBar title="历史曲线" link="/monitor/main"></HeadBar>
        <DpTab :active="3"></DpTab>
        <div class="main-body">
            <div class="sb-input-box">
                <button><div class="in-box"><span>温度</span> <img src="@/assets/img/Group 3.png"/></div></button>
            </div>
            <div class="date-panel">
                <van-tabs v-model="active">
                    <van-tab class="sb-tab" v-for="item in dataList" :title="item.title">
                        content of tab {{ item.index }}
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>
<script>
    import HeadBar from '../../components/HeadBar'
    import DpTab from '../../components/DpTab'
    import { Tab, Tabs } from 'vant';
    export default {
        name: 'Lsqx',
        data() {
            return {
                active: 0,
                dataList: [
                    {title:'日',index:1},
                    {title:'月',index:2},
                    {title:'年',index:3},
                    {title:'历年',index:4}
                ]
            };
        },
        components: {
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            HeadBar,
            DpTab
        }

    }
</script>
<style lang="scss">
    @import "../../sass/variable";
    .sb-input-box {
        margin: 10px auto;
       button{
           border: none;
           border-radius: 100px;
           width: 150px;
           height: 30px;
           line-height: 30px;
           text-align: left;
           cursor:pointer;
           background-color: #fff;
       }
        .in-box{
            display: flex;
            justify-content: space-between;
            flex: 1;
            padding: 0 15px;
        }
        img {
            width: 16px;
            height: 16px;
            display: inline-block;
            padding-top: 6px;
        }
    }
    .date-panel {
        background: #FFFFFF;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
        border-radius: 10px;
        margin: 15px auto;
        padding: 10px 15px;
        line-height: 24px;
        .van-tab--active span{
                color: $main-border-color !important;
        }
        .van-tabs__line {
            background-color: $main-border-color !important;
        }
    }
</style>