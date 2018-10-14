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
                            <span v-if="kz.properties.ctrl==='1' || kz.properties.ctrl==='2'">{{kz.status?'开启':'关闭'}}</span>
                            <span v-if="kz.properties.ctrl==='3'">
                                <i v-if="kz.status===0">停止</i>
                                <i v-if="kz.status===-1">左转</i>
                                <i v-if="kz.status===1">右转</i>
                            </span>
                            <span v-if="kz.properties.ctrl==='4'">{{kz.status+'档'}}</span>
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
    import {getControllers,getControllerStatus} from '../../service'
    export default {
        name: 'Sbkz',
        data() {
           return {
               kzList: [],
               intervalId:0,
               img_1: require("@/assets/img_1.png"),
               img_2: require("@/assets/img_2.png"),
               img_3: require("@/assets/img_3.png"),
               img_4: require("@/assets/img_4.png"),
               img_5: require("@/assets/img_5.png"),
               img_6: require("@/assets/img_6.png"),
               img_7: require("@/assets/img_7.png"),
               img_8: require("@/assets/img_8.png"),
               img_9: require("@/assets/img_9.png")
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
        destroyed() {
            clearInterval(this.intervalId);
        },
        methods: {
           toSetPage(pro) {
               this.$store.commit('setPropertys',Object.assign({},pro.properties));
               this.$store.commit('setControlHand',pro.status===1);
               this.$router.push({ name: 'fjsb', params: { name: pro.name ,id: pro.id}});
           },
            getImg(num) {
               const arr = [1,2,3,4,5,6,7,8,9];
               num = arr.indexOf(+num)>=0 ? +num: 1;
                return this['img_'+num];
            },
            async getCtrls(pid,token) {
                 try {
                    const res = await getControllers(pid,token);
                    // console.log(res.data);
                    if(res.data && res.data.results && Array.isArray(res.data.results)) {
                        res.data.results.forEach(val => {
                            if(val.properties) {
                                val.properties = JSON.parse(val.properties);
                            }
                            val.status = 0;
                        });
                        this.getStatusRepeat(pid);
                        this.kzList = Object.assign([], res.data.results);
                    }
                 }catch (err) {
                     console.log(err);
                 }
            },
            getCtrlStatus(pid) {
                getControllerStatus(pid).then(res => {
                    if(res.data && res.data.results && Array.isArray(res.data.results)) {
                        const arr = res.data.results;
                        this.kzList.forEach(item => {
                            const ob = arr.find(val => val._id === item.id);
                            if(ob) {
                                item.status = ob.status || 0;
                            }
                        });
                        this.kzList = Object.assign([],this.kzList);
                    }
                }, err => {
                    console.log(err);
                });
            },
            getStatusRepeat(pid) {
               this.getCtrlStatus(pid);
               this.intervalId = setInterval(() => {
                   this.getCtrlStatus(pid);
               },5000);
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