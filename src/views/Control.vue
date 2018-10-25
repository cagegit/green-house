<template>
    <div class="control-main">
        <HeadBar title="控制" :left="false" link=""></HeadBar>
        <div class="main-body">
            <div class="banner">
                <img src="@/assets/img/topimg@2x.png" alt=""/>
            </div>
            <div class="select-box">
                <button @click="showDqPanel"><div class="in-box"><span>{{area}}</span> <img src="@/assets/img/Group 3.png"/></div></button>
                <button @click="showYqPanel"><div class="in-box"><span>{{yq}}</span> <img src="@/assets/img/Group 3.png"/></div></button>
            </div>
            <div class="control-panel" v-if="controlList && controlList.length>0">
                <div class="flex-row">
                    <div class="sb-box" v-for="item in controlList" :key="item.info.id" @click="toSbList(item)">
                        <img :src="getImg(item.info.value)"/>
                        <div class="sb-name">{{item.info.name}}</div>
                    </div>
                </div>
            </div>
            <van-popup v-model="dqShow" position="bottom">
                <van-picker show-toolbar :columns="areaNameList" @cancel="dqShow=false" @confirm="dpConfirm"/>
            </van-popup>
            <van-popup v-model="yqShow" position="bottom">
                <van-picker show-toolbar :columns="yqNameList" @cancel="yqShow=false" @confirm="yqConfirm"/>
            </van-popup>
        </div>
        <FootBar></FootBar>
    </div>
</template>
<script>
    import {Popup,Picker} from 'vant';
    import HeadBar from '../components/HeadBar'
    import FootBar from "../components/FootBar";
    import { getLocates,getUtilities, getControList} from "@/service";
    export default  {
        name:'Control',
        components: {
            HeadBar,
            FootBar,
            [Popup.name]:Popup,
            [Picker.name]:Picker
        },
        data() {
            return {
                area:'无',
                areaList: [],
                areaNameList:[],
                yq: '无',
                yqList: [],
                yqNameList:[],
                daList: [],
                token: this.$store.state.token,
                dqShow: false,
                yqShow: false,
                pid:0,
                img_1: require("@/assets/img_1.png"),
                img_2: require("@/assets/img_2.png"),
                img_3: require("@/assets/img_3.png"),
                img_4: require("@/assets/img_4.png"),
                img_5: require("@/assets/img_5.png"),
                img_6: require("@/assets/img_6.png"),
                img_7: require("@/assets/img_7.png"),
                img_8: require("@/assets/img_8.png"),
                img_9: require("@/assets/img_9.png"),
                controlList:[]
            }
        },
        created() {
            this.locates(this.token);
        },
        methods: {
            toSbList(item) {
                this.$store.commit('setDeviceInfo',{list:item.items,name:item.info.name,pid:this.pid});
                this.$router.push({ name: 'fjs'});
            },
            showDqPanel(){
                if(this.areaNameList.length>0){
                    this.dqShow = true;
                }
            },
            showYqPanel(){
                if(this.yqNameList.length>0){
                    this.yqShow = true;
                }
            },
            async locates(token) {
                try {
                    const res = await getLocates(token);
                    if(res.data && res.data.results) {
                        this.areaList = Object.assign([],res.data.results) || [];
                        if(this.areaList.length>0) {
                            this.areaNameList = this.areaList.map(v => v.name);
                            this.area = this.areaList[0].name;
                            this.yqList = this.areaList[0].children;
                            if(this.yqList.length>0) {
                                this.yqNameList = this.yqList.map(v => v.name);
                                this.yq = this.yqList[0].name;
                                this.getDp(this.yqList[0].id);
                                this.getControList(this.yqList[0].id);
                            }
                        }
                    }
                }catch (err) {
                    console.log(err);
                }
            },
            dpConfirm(value) {
                this.dqShow = false;
                this.area = value;
                let area = '';
                this.areaList.forEach((val) => {
                    if(this.area === val.name) {
                        area = Object.assign({},val);
                    }
                });
                if(area && area.children) {
                    if(area.children.length>0) {
                        this.yqList = Object.assign([],area.children) || [];
                        this.yqNameList = this.yqList.map(v => v.name);
                        if(this.yqList.length>0){
                            this.yq = this.yqList[0].name;
                            this.getDp(this.yqList[0].id);
                        }
                    } else {
                        this.daList = [];
                        this.yqList = [];
                        this.yqNameList = [];
                        this.yq = '无';
                    }
                } else {
                    this.daList = [];
                    this.yqList = [];
                    this.yqNameList = [];
                    this.yq = '无';
                }
            },
            yqConfirm(value) {
                this.yq = value;
                this.yqShow = false;
                this.yqList.forEach(val => {
                    if(val.name === this.yq) {
                        this.getDp(val.id);
                        this.getControList(val.id);
                    }
                });
            },
            async getDp(pid) {
                const res = await getUtilities(pid,this.token);
                this.daList = Object.assign([],res.data.results) || [];
            },
            getControList(pid){
                this.pid = pid;
                getControList(this.token,pid).then(res =>{
                    if(res.data && Array.isArray(res.data.results)){
                        this.controlList = Object.assign([],res.data.results);
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            getImg(num) {
                // const pics = this.$store.state.relations.filter(item => item.type===num);
                // return pics.length > 0 ? 'http://'+pics[0].icon : this.img_1;
                const arr = [1,2,3,4,5,6,7,8,9];
                num = arr.indexOf(+num)>=0 ? +num: 1;
                return this['img_'+num];
            },
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
                span{
                    overflow: hidden;
                    font-size: 14px;
                }
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
        justify-content: flex-start;
        flex-wrap:wrap;
    }
    .sb-box{
        text-align: center;
        padding: 5px;
        margin:0 0.266667rem 10px;
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