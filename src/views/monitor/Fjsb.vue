<template>
    <div class="monitor">
        <HeadBar :title="name+'设备'" link="/monitor/main"></HeadBar>
        <div class="main-body">
            <div class="sb-com-cell" style="margin-top: 10px" v-if="pro.ctrl==='1' || pro.ctrl==='2'">
                <div class="fj-flex">
                    <div class="sb-c-left">
                        <span>手动</span>
                    </div>
                    <div class="sb-c-right">
                        <van-switch v-model="handCheck" />
                    </div>
                </div>
            </div>
            <!--三路控制-->
            <div class="sb-com-cell" style="margin-top: 10px" v-if="pro.ctrl==='3'">
                <!--<div class="fj-flex">-->
                    <!--<div class="sb-c-left">-->
                        <!--<span>手动</span>-->
                    <!--</div>-->
                    <!--<div class="sb-c-right">-->
                        <!--<van-switch v-model="handCheck" />-->
                    <!--</div>-->
                <!--</div>-->
                <div class="fj-content">
                    <div class="fj-zx">
                        <div class="zx-item" @click="setZx(-1)">
                            <img :src="currentZx===-1?zxMap.leftPress:zxMap.leftNormal">
                            <span :class="{'active':currentZx===-1}">左转</span>
                        </div>
                        <div class="zx-item" @click="setZx(0)">
                            <img :src="currentZx===0?zxMap.stopPress:zxMap.stopNormal">
                            <span :class="{'active':currentZx===0}">停止</span>
                        </div>
                        <div class="zx-item" @click="setZx(1)">
                            <img :src="currentZx===1?zxMap.rightPress:zxMap.rightNormal">
                            <span :class="{'active':currentZx===1}">右转</span>
                        </div>
                    </div>
                </div>
            </div>
            <!--阶段控制-->
            <div class="sb-com-cell" style="margin-top: 10px" v-if="pro.ctrl==='4'">
                <!--<div class="fj-flex">-->
                    <!--<div class="sb-c-left">-->
                        <!--<span>手动</span>-->
                    <!--</div>-->
                    <!--<div class="sb-c-right">-->
                        <!--<van-switch v-model="handCheck" />-->
                    <!--</div>-->
                <!--</div>-->
                <div class="fj-content">
                    <div class="fj-slider">
                        <van-slider v-model="current" :step="25" bar-height="8px" />
                        <div class="slider-kd">
                            <span>关闭</span>
                            <span>25%</span>
                            <span>50%</span>
                            <span>75%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sb-com-cell"  v-if="pro.ctrl==='1' || pro.ctrl==='2'">
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
    import {setController} from '../../service'
    export default {
        name: 'Fjsb',
        props: {
            name:String
        },
        data() {
            return {
                handCheck:false,
                autoCheck: false,
                current: 0,
                currentZx: 0, // -1:左转 0：停止 1:右转
                zxMap: {
                    leftNormal: require('@/assets/img/left-normal@2x.png'),
                    leftPress: require('@/assets/img/left-press@2x.png'),
                    stopNormal: require('@/assets/img/stop-normal@2x.png'),
                    stopPress: require('@/assets/img/stop-press@2x.png'),
                    rightNormal: require('@/assets/img/right-normal@2x.png'),
                    rightPress: require('@/assets/img/right-press@2x.png'),
                },
                pro:{}
            }
        },
        components: {
            [Switch.name]:Switch,
            [Slider.name]:Slider,
            HeadBar
        },
        mounted() {
            const {propertys,token} = this.$store.state;
            if(!token) {
                this.$router.replace('/login');
            }
            if(!propertys) {
                this.$router.replace('/monitor/sbkz');
            }
            console.log(propertys);
            this.pro = propertys;
            if(this.pro) {
                this.currentZx = this.pro.value || 0;
                this.current = this.pro.value || 0;
                this.handCheck = !!this.pro.value;
            }
        },
        methods: {
            chongFu() {
                this.$router.push('/monitor/fuxuan');
            },
            setZx(num) {
                this.currentZx = num;
                this.pro.value = num;
                // this.$store.commit('setPropertys',Object.assign({},this.pro));
                // "{"gatewayId":"123456789","deviceId":"307","type":"2","ctrl":"2","Channel":"18"}"
                this.setCtrl();
            },
            setCtrl() {
                const {deviceId,Channel,value,gatewayId} = this.pro;
                setController(deviceId,Channel,value,gatewayId)
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        watch: {
            'handCheck':function (isCheck) {
                this.pro.value = isCheck?1:0;
                this.setCtrl();
                this.autoCheck = !isCheck;
            },
            'autoCheck':function (isCheck) {
                this.handCheck = !isCheck;
            },
            'current': function (val) {
                this.pro.value = val;
                // this.$store.commit('setPropertys',Object.assign({},this.pro));
                this.setCtrl();
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
            .van-switch--on {
                background-color:#44E3A8;
            }
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
                color: #B2B2B2;
            }
            .active {
               color:  #16CF9D;
            }
        }
        .sb-c-left {
            display: flex;
            align-items: center;
            span {
                font-size: 16px;
                color: #202323;
                padding-left: 10px;
            }
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

    }
</style>