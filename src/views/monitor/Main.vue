<template>
    <div class="monitor-main">
        <HeadBar title="监测" :left="false" link=""></HeadBar>
        <div class="body">
            <div class="banner">
                <img src="@/assets/img/topimg@2x.png" alt=""/>
            </div>
            <div class="select-box">
                <button><div class="in-box"><span>地区1</span> <img src="@/assets/img/Group 3.png"/></div></button>
                <button><div class="in-box"><span>园区1</span> <img src="@/assets/img/Group 3.png"/></div></button>
            </div>
            <!--<div class="dp-box">-->
                <!--<img src="@/assets/img/dp@2x.png">-->
                <!--<span>1号西红柿大棚</span>-->
                <!--<div class="mark">-->
                    <!--<i class="mark-con"></i>-->
                    <!--<span>告警</span>-->
                <!--</div>-->
            <!--</div>-->
            <DapCell :title="'1号西红柿大棚'" :src="src" :isMark="true" @click.native="toNextPage()"></DapCell>
            <DapCell :title="'1号西红柿大棚'" :src="src" :isMark="true" @click.native="toNextPage()"></DapCell>
            <DapCell :title="'1号西红柿大棚'" :src="src" :isMark="true" @click.native="toNextPage()"></DapCell>
            <DapCell :title="'1号西红柿大棚'" :src="src" :isMark="false" @click.native="toNextPage()"></DapCell>
            <DapCell :title="'1号西红柿大棚'" :src="src" :isMark="false" @click.native="toNextPage()"></DapCell>
            <DapCell :title="'1号西红柿大棚'" :src="src" :isMark="false" @click.native="toNextPage()"></DapCell>
            <DapCell :title="'1号西红柿大棚'" :src="src" :isMark="false" @click.native="toNextPage()"></DapCell>
            <div style="margin-bottom: 60px;"></div>
        </div>
        <FootBar :active="0"></FootBar>
    </div>
</template>
<script>
    import { Cell, CellGroup,Row, Col } from 'vant';
    import HeadBar from '../../components/HeadBar'
    import FootBar from "../../components/FootBar";
    import DapCell from "../../components/DpCell";
    export default {
        name: 'MonitorMain',
        data() {
            return {
                src: require('@/assets/img/dp@2x.png')
            }
        },
        components: {
            FootBar,
            HeadBar,
            DapCell,
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell,
            [Row.name]:Row,
            [Col.name]:Col
        },
        methods: {
            toNextPage() {
                this.$router.push("/monitor/ssjc");
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../sass/variable";
    .monitor-main {
       .body{
           padding-left: $page-padding;
           padding-right: $page-padding;
       }
        .banner {
            margin: 10px auto;
            img {
                width: 100%;
            }
        }
        .van-cell-group{
            margin-top: 5px;
            text-align: left;
            background: transparent ;
        }
        .van-cell {
            background: #FFFFFF;
            box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
            border-radius: 5PX;
        }
        .select-box {
            display: flex;
           justify-content: space-between;
            flex: 1;
            padding: 0 10px;
            margin-bottom: 10px;
            button {
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
    }
</style>