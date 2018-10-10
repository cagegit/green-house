<template>
    <v-touch v-on:swiperight="onSwipeRight" tag="div">
        <div>
            <HeadBar title="设备控制" link="/monitor/main"></HeadBar>
            <DpTab :active="2"></DpTab>
                <div class="main-body">
                    <div class="sb-cell" v-for="kz in kzList" :key="kz.id" @click="toSetPage(kz)">
                        <div class="sb-c-left">
                            <img :src="getImg(kz.properties.type)">
                            <span>{{kz.name}}</span>
                        </div>
                        <div class="sb-c-right">
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
                </div>
        </div>
    </v-touch>
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
               // img_2: require("@/assets/img/zidc@2x.png"),
               // img_3: require("@/assets/img/juanlj@2x.png"),
               // img_4: require("@/assets/img/guang@2x.png"),
               // img_5: require("@/assets/img/jiawl@2x.png"),
               // img_6: require("@/assets/img/zheyz@2x.png"),
               // img_7: require("@/assets/img/ship@2x.png"),
               // img_8: require("@/assets/img/co2@2x.png")
           }
        },
        components: {
            HeadBar,
            DpTab
        },
        created() {
            const {pid,token} = this.$store.state;
            this.name = this.name || '';
            this.getCtrls(pid,token);
        },
        methods: {
           toSetPage(pro) {
               this.$store.commit('setPropertys',Object.assign({},pro.properties));
               // this.$router.push('/monitor/fjsb');
               // console.log('Sbkz:'+pro.name);
               this.$router.push({ name: 'fjsb', params: { name: pro.name ,id: pro.id}});
           },
            getImg(num) {
               // num = +num> 8 ? 1: +num;
                const pics = this.$store.state.relations.filter(item => item.type===num);
                return pics.length>0?'http://'+pics[0].icon:this.img_1;
                // return this['img_'+num];
            },
            async getCtrls(pid,token) {
                 try {
                    const res = await getControllers(pid,token);
                    // console.log(res.data);
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
            },
            onSwipeRight() {
               this.$router.push({name:'main'});
            }
        }
    }
</script>
<style lang="scss">
    $kz-btn-color:#B2B2B2;
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
                color: darken($kz-btn-color, 40%);
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