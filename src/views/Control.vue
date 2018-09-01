<template>
    <div class="control-main">
        <HeadBar title="控制" :left="false" link=""></HeadBar>
        <div class="main-body">
            <div class="banner">
                <img src="@/assets/img/topimg@2x.png" alt=""/>
            </div>
            <div class="select-box">
                <button @click="dqShow = true"><div class="in-box"><span>{{area}}</span> <img src="@/assets/img/Group 3.png"/></div></button>
                <button @click="yqShow = true"><div class="in-box"><span>{{yq}}</span> <img src="@/assets/img/Group 3.png"/></div></button>
            </div>
            <div class="control-panel">
                <div class="flex-row">
                    <div class="sb-box" @click="toSbList(1)">
                        <img src="@/assets/img/fengj@2x.png"/>
                        <div class="sb-name">风机</div>
                    </div>
                    <div class="sb-box" @click="toSbList(1)">
                        <img src="@/assets/img/zidc@2x.png"/>
                        <div class="sb-name">自动窗</div>
                    </div>
                    <div class="sb-box" @click="toSbList(1)">
                        <img src="@/assets/img/juanlj@2x.png"/>
                        <div class="sb-name">卷帘机</div>
                    </div>
                    <div class="sb-box" @click="toSbList(1)">
                        <img src="@/assets/img/guang@2x.png"/>
                        <div class="sb-name">灌溉1型</div>
                    </div>
                </div>
                <div class="flex-row">
                    <div class="sb-box" @click="toSbList(1)">
                        <img src="@/assets/img/guang@2x.png"/>
                        <div class="sb-name">灌溉2型</div>
                    </div>
                    <div class="sb-box" @click="toSbList(1)">
                        <img src="@/assets/img/jiawl@2x.png"/>
                        <div class="sb-name">加温炉</div>
                    </div>
                    <div class="sb-box" @click="toSbList(1)">
                        <img src="@/assets/img/zheyz@2x.png"/>
                        <div class="sb-name">遮阳罩</div>
                    </div>
                    <div class="sb-box" @click="toSbList(1)">
                        <img src="@/assets/img/ship@2x.png"/>
                        <div class="sb-name">视频</div>
                    </div>
                </div>
                <div class="flex-row">
                    <div class="sb-box" @click="toSbList(1)">
                        <img src="@/assets/img/co2@2x.png"/>
                        <div class="sb-name">CO2发生器</div>
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
    import { getLocates,getUtilities} from "@/service";
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
                yqShow: false
            }
        },
        mounted() {
            if(!this.token) {
                this.$router.replace('/login');
            }
            this.locates(this.token);
        },
        methods: {
            toSbList(num) {
                this.$router.push('/monitor/fjs');
            },
            async locates(token) {
                try {
                    const res = await getLocates(token);
                    console.log(res.data);
                    if(res.data && res.data.results) {
                        this.areaList = Object.assign([],res.data.results) || [];
                        if(this.areaList.length>0) {
                            this.areaNameList = this.areaList.map(v => v.name);
                            this.area = this.areaList[0].name;
                            this.yqList = this.areaList[0].children;
                            if(this.yqList.length>0) {
                                this.yqNameList = this.areaList.map(v => v.name);
                                this.yq = this.yqList[0].name;
                                this.getDp(this.yqList[0].id);
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
                    }
                });
            },
            async getDp(pid) {
                const res = await getUtilities(pid,this.token);
                this.daList = Object.assign([],res.data.results) || [];
            }
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