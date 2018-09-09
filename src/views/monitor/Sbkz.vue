<template>
    <div class="monitor">
        <HeadBar title="设备控制" link="/monitor/main"></HeadBar>
        <DpTab :active="2"></DpTab>
        <div class="main-body">
            <div class="sb-cell" v-for="kz in kzList" :key="kz.id">
                <div class="sb-c-left">
                    <img :src="getImg(kz.properties.type)">
                    <span>{{kz.name}}</span>
                </div>
                <div class="sb-c-right" @click="toSetPage(kz)">
                    <span v-if="kz.properties.ctrl==='1' || kz.properties.ctrl==='2'">{{kz.properties.value?'开启':'关闭'}}</span>
                    <span v-else-if="kz.properties.ctrl==='3'">
                        <i v-if="kz.properties.value===0">停止</i>
                        <i v-if="kz.properties.value===-1">左转</i>
                        <i v-if="kz.properties.value===1">右转</i>
                    </span>
                    <span v-else="kz.properties.ctrl==='4'">{{kz.properties.value+'档'}}</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>

             <!--<div class="sb-cell">-->
                 <!--<div class="sb-c-left">-->
                     <!--<img src="@/assets/img/fengj@2x.png">-->
                     <!--<span>风机设备</span>-->
                 <!--</div>-->
                 <!--<div class="sb-c-right" @click="toSetPage(1)">-->
                     <!--<span>开启</span>-->
                     <!--<i class="van-icon van-icon-arrow"></i>-->
                 <!--</div>-->
             <!--</div>-->
            <!--<div class="sb-cell">-->
                <!--<div class="sb-c-left">-->
                    <!--<img src="@/assets/img/juanlj@2x.png">-->
                    <!--<span>卷帘机</span>-->
                <!--</div>-->
                <!--<div class="sb-c-right">-->
                    <!--<span>关闭</span>-->
                    <!--<i class="van-icon van-icon-arrow"></i>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="sb-cell">-->
                <!--<div class="sb-c-left">-->
                    <!--<img src="@/assets/img/jiawl@2x.png">-->
                    <!--<span>加温炉</span>-->
                <!--</div>-->
                <!--<div class="sb-c-right">-->
                    <!--<span>2档</span>-->
                    <!--<i class="van-icon van-icon-arrow"></i>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="sb-cell">-->
                <!--<div class="sb-c-left">-->
                    <!--<img src="@/assets/img/zidc@2x.png">-->
                    <!--<span>自动窗</span>-->
                <!--</div>-->
                <!--<div class="sb-c-right">-->
                    <!--<span>开启</span>-->
                    <!--<i class="van-icon van-icon-arrow"></i>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="sb-cell">-->
                <!--<div class="sb-c-left">-->
                    <!--<img src="@/assets/img/guang@2x.png">-->
                    <!--<span>灌溉</span>-->
                <!--</div>-->
                <!--<div class="sb-c-right">-->
                    <!--<span>关闭</span>-->
                    <!--<i class="van-icon van-icon-arrow"></i>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="sb-cell">-->
                <!--<div class="sb-c-left">-->
                    <!--<img src="@/assets/img/zheyz@2x.png">-->
                    <!--<span>遮阳罩</span>-->
                <!--</div>-->
                <!--<div class="sb-c-right">-->
                    <!--<span>2档</span>-->
                    <!--<i class="van-icon van-icon-arrow"></i>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="sb-cell">-->
                <!--<div class="sb-c-left">-->
                    <!--<img src="@/assets/img/ship@2x.png">-->
                    <!--<span>视频</span>-->
                <!--</div>-->
                <!--<div class="sb-c-right">-->
                    <!--<span>开启</span>-->
                    <!--<i class="van-icon van-icon-arrow"></i>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="sb-cell">-->
                <!--<div class="sb-c-left">-->
                    <!--<img src="@/assets/img/co2@2x.png">-->
                    <!--<span>二氧化碳发生器</span>-->
                <!--</div>-->
                <!--<div class="sb-c-right">-->
                    <!--<span>关闭</span>-->
                    <!--<i class="van-icon van-icon-arrow"></i>-->
                <!--</div>-->
            <!--</div>-->


        </div>
    </div>
</template>
<script>
    import HeadBar from '../../components/HeadBar'
    import DpTab from '../../components/DpTab'
    import {getControllers} from '../../service'

    export default {
        name: 'Sbkz',
        data() {
           return {
               kzList: [],
               img_1: require("@/assets/img/fengj@2x.png"),
               img_2: require("@/assets/img/zidc@2x.png"),
               img_3: require("@/assets/img/juanlj@2x.png"),
               img_4: require("@/assets/img/guang@2x.png"),
               img_5: require("@/assets/img/jiawl@2x.png"),
               img_6: require("@/assets/img/zheyz@2x.png"),
               img_7: require("@/assets/img/ship@2x.png"),
               img_8: require("@/assets/img/co2@2x.png")
           }
        },
        components: {
            HeadBar,
            DpTab
        },
        created() {
            const {pid,token} = this.$store.state;
            if(!token) {
                this.$router.replace('/login');
            }
            this.name = this.name || '';
            this.getCtrls(pid,token);
        },
        methods: {
           toSetPage(pro) {
               this.$store.commit('setPropertys',Object.assign({},pro.properties));
               // this.$router.push('/monitor/fjsb');
               console.log('Sbkz:'+pro.name);
               this.$router.push({ name: 'fjsb', params: { name: pro.name ,id: pro.id}});
           },
            getImg(num) {
                return this['img_'+num];
            },
            async getCtrls(pid,token) {
                 try {
                    const res = await getControllers(pid,token);
                    console.log(res.data);
                    if(res.data && res.data.results) {
                        res.data.results.forEach(val => {
                            if(val.properties) {
                                val.properties = JSON.parse(val.properties);
                                val.properties.value = 0;
                            }
                        });
                        this.kzList = Object.assign([], res.data.results);
                    }
                 }catch (err) {
                     console.log(err);
                 }
            }
        }
    }
</script>
<style lang="scss">
    .sb-cell {
        background: #FFFFFF;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
        border-radius: 5PX;
        height: 60px;
        line-height: 60px;
        text-align: left;
        padding: 5px 10px;
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        position: relative;
        margin-bottom: 10px;
        overflow: hidden;
        .sb-c-left {
            display: flex;
            align-items: center;
        }
        .sb-c-right {
            i,span {
                color: #B2B2B2;
            }
        }
        img {
            width: 40px;
            height: 40px;
            display: inline-block;
            border: 0;
        }
        span {
            font-size: 14px;
            color: #202323;
            padding-left: 10px;
        }
    }
</style>