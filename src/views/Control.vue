<template>
    <div class="control-main">
        <HeadBar title="控制" :left="false" link=""></HeadBar>
        <div class="main-body">
            <div class="banner">
                <img src="@/assets/img/topimg@2x.png" alt=""/>
            </div>
            <div class="select-box">
                <button><div class="in-box"><span>地区1</span> <img src="@/assets/img/Group 3.png"/></div></button>
                <button><div class="in-box"><span>园区1</span> <img src="@/assets/img/Group 3.png"/></div></button>
            </div>
            <div class="control-panel">
                <div class="flex-row">
                    <div class="sb-box">
                        <img src="@/assets/img/fengj@2x.png"/>
                        <div class="sb-name">风机</div>
                    </div>
                    <div class="sb-box">
                        <img src="@/assets/img/zidc@2x.png"/>
                        <div class="sb-name">自动窗</div>
                    </div>
                    <div class="sb-box">
                        <img src="@/assets/img/juanlj@2x.png"/>
                        <div class="sb-name">卷帘机</div>
                    </div>
                    <div class="sb-box">
                        <img src="@/assets/img/guang@2x.png"/>
                        <div class="sb-name">灌溉1型</div>
                    </div>
                </div>
                <div class="flex-row">
                    <div class="sb-box">
                        <img src="@/assets/img/guang@2x.png"/>
                        <div class="sb-name">灌溉2型</div>
                    </div>
                    <div class="sb-box">
                        <img src="@/assets/img/jiawl@2x.png"/>
                        <div class="sb-name">加温炉</div>
                    </div>
                    <div class="sb-box">
                        <img src="@/assets/img/zheyz@2x.png"/>
                        <div class="sb-name">遮阳罩</div>
                    </div>
                    <div class="sb-box">
                        <img src="@/assets/img/ship@2x.png"/>
                        <div class="sb-name">视频</div>
                    </div>
                </div>
                <div class="flex-row">
                    <div class="sb-box">
                        <img src="@/assets/img/co2@2x.png"/>
                        <div class="sb-name">CO2发生器</div>
                    </div>
                </div>

            </div>
        </div>
        <FootBar></FootBar>
    </div>
</template>
<script>
    import HeadBar from '../components/HeadBar'
    import FootBar from "../components/FootBar";
    export default  {
        name:'Control',
        components: {
            HeadBar,
            FootBar
        }
    }
</script>
<style lang="scss" scoped>
    .control-main {
        .banner {
            margin: 10px auto;
            img {
                width: 100%;
            }
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

        .control-panel {
            background: #FFFFFF;
            box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
            border-radius: 10px;
            margin: 15px auto;
            padding: 10px 15px;
            line-height: 24px;
        }
    }
    .flex-row {
        display: flex;
        flex:1;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .sb-box{
        text-align: center;
        padding: 5px;
        img{
            width: 50px;
            height: 50px;
            display: inline-block;
            border: 0;
        }
        .sb-name{
            font-size: 14px;
            color: #4B4A4A;
        }
    }
</style>