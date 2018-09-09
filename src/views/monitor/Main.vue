<template>
    <div class="monitor-main">
        <HeadBar :title="user.corpname" :left="false" link=""></HeadBar>
        <div class="main-body">
            <div class="banner">
                <img src="@/assets/img/topimg@2x.png" alt=""/>
            </div>
            <div class="select-box">
                <button @click="showDqPanel"><div class="in-box"><span>{{area}}</span> <img src="@/assets/img/Group 3.png"/></div></button>
                <button @click="showYqPanel"><div class="in-box"><span>{{yq}}</span> <img src="@/assets/img/Group 3.png"/></div></button>
            </div>
            <!--<div class="dp-box">-->
                <!--<img src="@/assets/img/dp@2x.png">-->
                <!--<span>1号西红柿大棚</span>-->
                <!--<div class="mark">-->
                    <!--<i class="mark-con"></i>-->
                    <!--<span>告警</span>-->
                <!--</div>-->
            <!--</div>-->
            <DapCell v-for="item in daList" :key="item.id" :title="item.name" :src="src" :isMark="true" @click.native="toNextPage(item.pid)"></DapCell>
            <!--<DapCell :title="'1号西红柿大棚'" :src="src" :isMark="true" @click.native="toNextPage()"></DapCell>-->
            <!--<DapCell :title="'1号西红柿大棚'" :src="src" :isMark="true" @click.native="toNextPage()"></DapCell>-->
            <!--<DapCell :title="'1号西红柿大棚'" :src="src" :isMark="true" @click.native="toNextPage()"></DapCell>-->
            <!--<DapCell :title="'1号西红柿大棚'" :src="src" :isMark="false" @click.native="toNextPage()"></DapCell>-->
            <!--<DapCell :title="'1号西红柿大棚'" :src="src" :isMark="false" @click.native="toNextPage()"></DapCell>-->
            <!--<DapCell :title="'1号西红柿大棚'" :src="src" :isMark="false" @click.native="toNextPage()"></DapCell>-->
            <!--<DapCell :title="'1号西红柿大棚'" :src="src" :isMark="false" @click.native="toNextPage()"></DapCell>-->
            <div style="margin-bottom: 60px;"></div>
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
    import { Cell, CellGroup,Row, Col,Popup,Picker } from 'vant';
    import HeadBar from '../../components/HeadBar'
    import FootBar from "../../components/FootBar";
    import DapCell from "../../components/DpCell";
    import { getLocates, loginIn,getUtilities,getSensors} from "@/service";

    export default {
        name: 'MonitorMain',
        data() {
            return {
                src: require('@/assets/img/dp@2x.png'),
                area:'',
                areaList: [],
                areaNameList:[],
                yq: '',
                yqList: [],
                yqNameList:[],
                daList: [],
                token: this.$store.state.token,
                dqShow: false,
                yqShow: false,
                user: {}
            }
        },
        components: {
            FootBar,
            HeadBar,
            DapCell,
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell,
            [Row.name]:Row,
            [Col.name]:Col,
            [Popup.name]:Popup,
            [Picker.name]:Picker
        },
        mounted() {
            if(JSON.stringify(this.$store.state.user)!=='{}') {
                this.user = Object.assign({},this.$store.state.user);
            }
            this.locates(this.token);
        },
        methods: {
            toNextPage(pid) {
                console.log('pid:'+pid);
                pid = 176;
                getSensors(176,this.token).then(res => {
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                });
                this.$store.commit('setPid',176);
                this.$router.push("/monitor/ssjc");
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
                    // console.log(res.data);
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
            async login() {
                const res = await loginIn('wq','123456');
                console.log(res.data.token);
                this.locates(res.data.token);
            },
            async getDp(pid) {
                const res = await getUtilities(pid,this.token);
                console.log('da:');
                console.log('pid:'+pid);
                console.log(res.data);
                this.daList = Object.assign([],res.data.results) || [];
            }
        }
    }
</script>
<style lang="scss">
    @import "../../sass/variable";
    .monitor-main {
       .body{
           padding-left: $page-padding;
           padding-right: $page-padding;
       }
        .banner {
            margin: 10px auto;
            img {
                width: 100%;
            }
        }
        .van-cell-group{
            margin-top: 5px;
            text-align: left;
            background: transparent ;
        }
        .van-cell {
            background: #FFFFFF;
            box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
            border-radius: 5PX;
        }
        .select-box {
            display: flex;
           justify-content: space-between;
            flex: 1;
            padding: 0 10px;
            margin-bottom: 10px;
            button,select {
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
                }
                img {
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                    padding-top: 6px;
                    padding-left: 5px;
                }
            }
        }
    }
</style>