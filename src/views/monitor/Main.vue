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
            <van-cell-group>
                <van-cell title="一号大棚" icon="location" @click.native="toNextPage()"/>
            </van-cell-group>
            <van-cell-group >
                <van-cell title="一号大棚" icon="location" @click.native="toNextPage()"/>
            </van-cell-group>
            <van-cell-group >
                <van-cell title="一号大棚" icon="location" @click.native="toNextPage()"/>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="一号大棚" icon="location" @click.native="toNextPage()"/>
            </van-cell-group>
            <van-cell-group >
                <van-cell title="一号大棚" icon="location" @click.native="toNextPage()"/>
            </van-cell-group>
            <van-cell-group >
                <van-cell title="一号大棚" icon="location" @click.native="toNextPage()"/>
            </van-cell-group>
        </div>
        <FootBar :active="0"></FootBar>
    </div>
</template>
<script>
    import { Cell, CellGroup,Row, Col } from 'vant';
    import HeadBar from '../../components/HeadBar'
    import FootBar from "../../components/FootBar";
    export default {
        name: 'MonitorMain',
        components: {
            FootBar,
            HeadBar,
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell,
            [Row.name]:Row,
            [Col.name]:Col
        },
        methods: {
            toNextPage() {
                this.$router.replace("/monitor/ssjc");
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