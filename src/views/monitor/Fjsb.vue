<template>
    <div class="monitor">
        <HeadBar title="风机设备" link="/monitor/main"></HeadBar>
        <div class="main-body">
            <div class="sb-com-cell" style="margin-top: 10px">
                <div class="fj-flex">
                    <div class="sb-c-left">
                        <span>手动</span>
                    </div>
                    <div class="sb-c-right">
                        <van-switch v-model="handCheck" />
                    </div>
                </div>
                <div class="fj-content">
                    <div class="fj-slider">
                        <van-slider v-model="current" :step="25" bar-height="5px" />
                        <div class="slider-kd">
                            <span>关闭</span>
                            <span>25%</span>
                            <span>50%</span>
                            <span>75%</span>
                            <span>100%</span>
                        </div>
                    </div>
                    <div class="fj-zx">
                        <div class="zx-item" @click="currentZx=1">
                            <img :src="currentZx===1?zxMap.leftPress:zxMap.leftNormal">
                            <span :class="{'active':currentZx===1}">左转</span>
                        </div>
                        <div class="zx-item" @click="currentZx=2">
                            <img :src="currentZx===2?zxMap.stopPress:zxMap.stopNormal">
                            <span :class="{'active':currentZx===2}">停止</span>
                        </div>
                        <div class="zx-item" @click="currentZx=3">
                            <img :src="currentZx===3?zxMap.rightPress:zxMap.rightNormal">
                            <span :class="{'active':currentZx===3}">右转</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sb-com-cell">
                <div class="fj-flex">
                    <div class="sb-c-left">
                        <span>自动</span>
                    </div>
                    <div class="sb-c-right">
                        <van-switch v-model="autoCheck" />
                    </div>
                </div>
                <div class="fj-content" v-if="autoCheck">
                    <div class="fj-in-flex">
                        <div class="sb-c-left">
                            <span>开启时间</span>
                        </div>
                        <div class="sb-c-right">
                            <input type="text" placeholder="请选择" readonly/>
                            <i class="van-icon van-icon-arrow"></i>
                        </div>
                    </div>
                    <div class="fj-in-flex">
                        <div class="sb-c-left">
                            <span>关闭时间</span>
                        </div>
                        <div class="sb-c-right">
                            <input type="text" placeholder="请选择" readonly/>
                            <i class="van-icon van-icon-arrow"></i>
                        </div>
                    </div>
                    <div class="fj-in-flex">
                        <div class="sb-c-left">
                            <span>重复</span>
                        </div>
                        <div class="sb-c-right" @click="chongFu()">
                            <input type="text" placeholder="请选择" readonly/>
                            <i class="van-icon van-icon-arrow"></i>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import { Switch,Slider } from 'vant'
    import HeadBar from '../../components/HeadBar'
    export default {
        name: 'Fjsb',
        data() {
            return {
                handCheck:true,
                autoCheck: false,
                current: 0,
                currentZx: 1, // 1:左转 2：停止 3:右转
                zxMap: {
                    leftNormal: require('@/assets/img/left-normal@2x.png'),
                    leftPress: require('@/assets/img/left-press@2x.png'),
                    stopNormal: require('@/assets/img/stop-normal@2x.png'),
                    stopPress: require('@/assets/img/stop-press@2x.png'),
                    rightNormal: require('@/assets/img/right-normal@2x.png'),
                    rightPress: require('@/assets/img/right-press@2x.png'),
                }
            }
        },
        components: {
            [Switch.name]:Switch,
            [Slider.name]:Slider,
            HeadBar
        },
        methods: {
            chongFu() {
                this.$router.push('/monitor/fuxuan');
            }
        },
        watch: {
            'handCheck':function (isCheck) {
                this.autoCheck = !isCheck;
            },
            'autoCheck':function (isCheck) {
                this.handCheck = !isCheck;
            }
        }
    }
</script>
<style lang="scss">
    .sb-com-cell {
        background: #FFFFFF;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
        border-radius: 5PX;
        text-align: left;
        position: relative;
        margin-bottom: 10px;
        /*overflow: hidden;*/
        .fj-flex{
            display: flex;
            flex: 1;
            justify-content: space-between;
            align-items: center;
            padding: 5px 10px;
            height: 60px;
            line-height: 60px;
            overflow: hidden;
        }
        .fj-in-flex {
            display: flex;
            flex: 1;
            justify-content: space-between;
            align-items: center;
            padding: 5px 10px;
            height: 50px;
            line-height: 50px;
            overflow: hidden;
            .sb-c-left span{
                color: #4B4A4A
            }
            .sb-c-right span {
                color: #B2B2B2;
            }
            input{
                width: 50px;
                font-size: 14px;
                text-align: right;
                padding-right: 5px;
                color:#B2B2B2;
            }
        }
        .fj-content{
            border-top: 1px solid #ddd;
            padding: 5px;
        }
        .fj-slider {
            margin-top: 10px;
            padding: 15px;
            .van-slider__button,.van-slider__bar {
               background-color: #44E3A8;
            }
        }
        .slider-kd {
            display: flex;
            flex: 1;
            justify-content: space-between;
            padding: 15px 0;
            span {
                color: #B2B2B2;
            }
        }
        .fj-zx {
            margin-top: 10px;
            padding: 15px;
            display: flex;
            flex: 1;
            justify-content: space-between;

        }
        .zx-item {
            text-align: center;
            img {
                width: 40px;
                height: 40px;
            }
            span {
                display: block;
                padding-top: 5px;
            }
            .active {
               color:  #16CF9D;
            }
        }
        .sb-c-left {
            display: flex;
            align-items: center;
        }
        .sb-c-right {
            display: flex;
            align-items: center;
            i,span {
                color: #B2B2B2;
            }
        }
        > img {
            width: 40px;
            height: 40px;
            display: inline-block;
            border: 0;
        }
        > span {
            font-size: 16px;
            color: #202323;
            padding-left: 10px;
        }
    }
</style>