<template>
    <v-touch v-on:swiperight="onSwipeRight" tag="div">
        <div>
            <HeadBar :title="titName" link="/control"></HeadBar>
            <div class="main-body">
                <div class="fj-cell" style="margin-top: 10px" v-for="item in itemList" :key="item.id" @click="toSetPage(item)">
                    <div class="sb-c-left">
                        <img :src="getImg(item.properties.type)">
                        <span>{{item.name}}</span>
                    </div>
                    <div class="sb-c-right">
                        <span v-if="item.properties.ctrl==='1' || item.properties.ctrl==='2'">{{item.status?'开启':'关闭'}}</span>
                        <span v-if="item.properties.ctrl==='3'">
                            <i v-if="item.status===0">停止</i>
                            <i v-if="item.status===-1">左转</i>
                            <i v-if="item.status===1">右转</i>
                        </span>
                        <span v-if="item.properties.ctrl==='4'">{{item.status+'档'}}</span>
                        <i class="van-icon van-icon-arrow"></i>
                    </div>
                </div>
            </div>
        </div>
    </v-touch>
</template>
<script>
    import HeadBar from '../../components/HeadBar';
    import {getControllerStatus} from '../../service';
    export default {
        name:'Fjs',
        components:{
            HeadBar
        },
        created() {
             const {list,name,pid} = this.$store.state.deviceInfo;
             this.itemList = list;
             this.titName = name;
             this.itemList.forEach(v => {
                 if(v.status === undefined) {
                     v.status = 0;
                 }
             });
            if(this.itemList) {
                this.getStatusRepeat(pid);
            }
        },
        data(){
            return {
                titName:"",
                intervalId:0,
                itemList: [],
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
        destroyed() {
            clearInterval(this.intervalId);
        },
        methods: {
            toSetPage(pro) {
                this.$store.commit('setPropertys',Object.assign({},pro.properties));
               this.$router.push({ name: 'fjsb', params: { name: pro.name,id:pro.id}});
            },
            getImg(num) {
                const arr = [1,2,3,4,5,6,7,8,9];
                num = arr.indexOf(+num)>=0 ? +num: 1;
                return this['img_'+num];
            },
            onSwipeRight() {
                this.$router.push({name:'control'});
            },
            getCtrlStatus(pid) {
                getControllerStatus(pid).then(res => {
                    if(res.data && res.data.results && Array.isArray(res.data.results)) {
                        const arr = res.data.results;
                        const newArr = [];
                        this.itemList.forEach(item => {
                            const ob = arr.find(val => val._id === item.id);
                            if(ob) {
                                item.status = ob.status || 0;
                            }
                            newArr.push(item);
                        });
                        this.itemList = Object.assign([],newArr);
                    }
                }, err => {
                    console.log(err);
                });
            },
            getStatusRepeat(pid) {
                this.getCtrlStatus(pid);
                this.intervalId = setInterval(() => {
                    this.getCtrlStatus(pid);
                },10000);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .fj-cell {
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
            font-size: 16px;
            color: #202323;
            padding-left: 10px;
        }
    }
</style>