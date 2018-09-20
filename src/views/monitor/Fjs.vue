<template>
    <div class="monitor">
        <HeadBar :title="titName" link="/control"></HeadBar>
        <div class="main-body">
            <div class="fj-cell" style="margin-top: 10px" v-for="item in controList" :key="item.id">
                <div class="sb-c-left">
                    <img :src="getImg(item.properties.type)">
                    <span>{{item.name}}</span>
                </div>
                <div class="sb-c-right" @click="toSetPage(item)">
                    <span v-if="item.properties.ctrl==='1' || item.properties.ctrl==='2'">{{item.properties.value?'开启':'关闭'}}</span>
                    <span v-else-if="item.properties.ctrl==='3'">
                        <i v-if="item.properties.value===0">停止</i>
                        <i v-if="item.properties.value===-1">左转</i>
                        <i v-if="item.properties.value===1">右转</i>
                    </span>
                    <span v-else="item.properties.ctrl==='4'">{{item.properties.value+'档'}}</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import HeadBar from '../../components/HeadBar'
    export default {
        name:'Fjs',
        components:{
            HeadBar
        },
        props: {
            itemList:Object
        },
        mounted() {
            //console.log("ffffffffff:")
            //console.log(this.itemList)
            
            try{
                if(this.itemList){
                    //console.log("gg:")
                    localStorage.setItem('controList',JSON.stringify(this.itemList));
                    this.controList = this.itemList.items;
                    this.titName = this.itemList.info.name;
                }
                else{
                    if(localStorage.controList){
                        this.controList = JSON.parse(localStorage.getItem("controList")).items;
                        this.titName = JSON.parse(localStorage.getItem("controList")).info.name;
                    }
                }
            }catch(e){

            }
        },
        data(){
            return {
                controList:[],
                titName:"",
                img_1: require("@/assets/img/fengj@2x.png"),
                img_2: require("@/assets/img/zidc@2x.png"),
                img_3: require("@/assets/img/juanlj@2x.png"),
                img_4: require("@/assets/img/guang@2x.png"),
                img_5: require("@/assets/img/jiawl@2x.png"),
                img_6: require("@/assets/img/zheyz@2x.png"),
                img_7: require("@/assets/img/ship@2x.png"),
                img_8: require("@/assets/img/co2@2x.png"),
            }
        },
        methods: {
            toSetPage(pro) {
                this.$store.commit('setPropertys',Object.assign({},pro.properties));
               this.$router.push({ name: 'fjsb', params: { name: pro.name }});
            },
            getImg(num) {
                return this['img_'+num];
            },
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