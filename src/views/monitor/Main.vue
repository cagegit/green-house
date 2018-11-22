<template>
    <div class="monitor-main">
        <HeadBar :title="user.corpname" :left="false" link=""></HeadBar>
        <div class="main-body box-bottom">
            <div class="banner">
                <img src="@/assets/img/topimg@2x.png" alt=""/>
            </div>
            <div class="select-box">
                <button @click="showDqPanel"><div class="in-box"><span>{{area}}</span> <img src="@/assets/img/Group 3.png"/></div></button>
                <button @click="showYqPanel"><div class="in-box"><span>{{yq}}</span> <img src="@/assets/img/Group 3.png"/></div></button>
            </div>
            <DapCell v-for="item in daList" :key="item.id" :title="item.name" :src="src" :isMark="item.status" @click.native="toNextPage(item)"></DapCell>
            <!--<div style="margin-bottom: 60px;"></div>-->
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
    import { getLocates, loginIn,getUtilities,getWaringList} from "@/service";
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
                user: {},
                currentPengInfo: '' // 当前园区信息
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
        created() {
            if(JSON.stringify(this.$store.state.user)!=='{}') {
                this.user = Object.assign({},this.$store.state.user);
            }
            this.locates(this.token);
        },
        methods: {
            toNextPage(item) {
                //console.log('pid:'+pid);
                // pid = 176;
                let pro = null;
                try{
                   pro =JSON.parse(this.currentPengInfo);
                } catch(e) {
                   console.log(e);
                   pro = {};
                }
                this.$store.commit('setPid',item.id);
                this.$store.commit('setPengProperty',pro);
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
                    if(res.data && res.data.results) {
                        this.areaList = Object.assign([],res.data.results) || [];
                        if(this.areaList.length>0) {
                            this.areaNameList = this.areaList.map(v => v.name);
                            this.area = this.areaList[0].name;
                            this.currentPengInfo = this.areaList[0].properties;
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
                        this.currentPengInfo = area.properties;
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
                try {
                    const res = await loginIn('wq','123456');
                    this.locates(res.data.token);
                } catch (err) {
                    console.log(err);
                }
            },
            async getDp(pid) {
                try {
                    let war = await getWaringList(this.$store.state.user.id,1,0);
                    const res = await getUtilities(pid,this.token);
                    if(res.data && Array.isArray(res.data.results)) {
                        let arr  = Object.assign([],res.data.results);
                        if (war.data && Array.isArray(war.data.results)) {
                            const list = war.data.results.map(item => item.pengId);
                            arr.forEach((item) => {
                                if(list.indexOf(item.id)>=0) {
                                    item.status = true;
                                } else {
                                    item.status = false;
                                }
                            });
                        }
                        this.daList = arr;
                    }
                }catch (err) {
                    console.log(err);
                    this.getDpList(pid);
                }
            },
            getDpList(pid) {
                getUtilities(pid,this.token).then(res => {
                    if(res.data && Array.isArray(res.data.results)) {
                        let arr  = Object.assign([],res.data.results);
                        arr.forEach(item => {
                            item.status =false;
                        });
                        this.daList = arr;
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../sass/variable";
    .monitor-main {

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
                    font-size: 14px;
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
        .box-bottom {
            padding-bottom: 2rem;
        }
    }
</style>