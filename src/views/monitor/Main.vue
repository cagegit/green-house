<template>
    <div class="monitor-main">
        <HeadBar title="监测" :left="false" link=""></HeadBar>
        <div class="main-body">
            <div class="banner">
                <img src="@/assets/img/topimg@2x.png" alt=""/>
            </div>
            <div class="select-box">
                <div class="select">
                    <select v-model="area" @change="changeArea()">
                        <option v-for="item in areaList" :key="item.id" :value="item.name" >{{ item.name }}</option>
                    </select>
                </div>
                <div class="select">
                    <select v-model="yq" @change="chagneYq()">
                        <option v-for="item in yqList" :key="item.id" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
                <!--<select><div class="in-box"><span>地区1</span> <img src="@/assets/img/Group 3.png"/></div></select>-->
                <!--<select><div class="in-box"><span>园区1</span> <img src="@/assets/img/Group 3.png"/></div></select>-->
            </div>
            <!--<div class="dp-box">-->
                <!--<img src="@/assets/img/dp@2x.png">-->
                <!--<span>1号西红柿大棚</span>-->
                <!--<div class="mark">-->
                    <!--<i class="mark-con"></i>-->
                    <!--<span>告警</span>-->
                <!--</div>-->
            <!--</div>-->
            <DapCell v-for="item in daList" :title="item.name" :src="src" :isMark="true" @click.native="toNextPage(item.pid)"></DapCell>
            <!--<DapCell :title="'1号西红柿大棚'" :src="src" :isMark="true" @click.native="toNextPage()"></DapCell>-->
            <!--<DapCell :title="'1号西红柿大棚'" :src="src" :isMark="true" @click.native="toNextPage()"></DapCell>-->
            <!--<DapCell :title="'1号西红柿大棚'" :src="src" :isMark="true" @click.native="toNextPage()"></DapCell>-->
            <!--<DapCell :title="'1号西红柿大棚'" :src="src" :isMark="false" @click.native="toNextPage()"></DapCell>-->
            <!--<DapCell :title="'1号西红柿大棚'" :src="src" :isMark="false" @click.native="toNextPage()"></DapCell>-->
            <!--<DapCell :title="'1号西红柿大棚'" :src="src" :isMark="false" @click.native="toNextPage()"></DapCell>-->
            <!--<DapCell :title="'1号西红柿大棚'" :src="src" :isMark="false" @click.native="toNextPage()"></DapCell>-->
            <div style="margin-bottom: 60px;"></div>
        </div>
        <FootBar></FootBar>
    </div>
</template>
<script>
    import { Cell, CellGroup,Row, Col } from 'vant';
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
                yq: '',
                yqList: [],
                daList: [],
                token: this.$store.state.token
            }
        },
        components: {
            FootBar,
            HeadBar,
            DapCell,
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell,
            [Row.name]:Row,
            [Col.name]:Col
        },
        mounted() {
            // this.login(this.token);
            this.token = this.token || localStorage.getItem('token');
            console.log(this.token);
            this.locates(this.token);
        },
        methods: {
            toNextPage(pid) {
                console.log('pid:'+pid);
                getSensors(176,this.token).then(res => {
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                });
                this.$router.push("/monitor/ssjc");
            },
            async locates(token) {
                try {
                    const res = await getLocates(token);
                    console.log(res.data);
                    this.areaList = Object.assign([],res.data.results) || [];
                    if(this.areaList.length>0) {
                        this.area = this.areaList[0].name;
                        this.yqList = this.areaList[0].children;
                        if(this.yqList.length>0) {
                            this.yq = this.yqList[0].id;
                            this.getDp(this.yq);
                        }
                    }
                }catch (err) {
                    console.log(err);
                }
            },
            changeArea() {
                let area = '';
                this.areaList.forEach((val) => {
                    if(this.area === val.name) {
                        area = Object.assign({},val);
                    }
                });
                if(area && area.children) {
                    console.log(area.children);
                    if(area.children.length>0) {
                        this.yqList = Object.assign([],area.children);
                        this.yq = this.yqList[0].id;
                        this.daList = this.getDp(this.yqList[0].pid);
                    } else {
                        this.daList = [];
                        this.yqList = [];
                    }
                } else {
                    this.daList = [];
                }
            },
            chagneYq() {
                this.yqList.forEach(val => {
                    if(val.id === this.yq) {
                        this.getDp(this.yq);
                    }
                })
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
            }
            img {
                width: 16px;
                height: 16px;
                display: inline-block;
                padding-top: 6px;
            }
        }
        .select{
            //用div的样式代替select的样式
            /*padding: 0 5px;*/
            border-radius: 5px;
            position: relative;
            background: transparent;
            select{
                //清除select的边框样式
                border: none;
                //清除select聚焦时候的边框颜色
                outline: none;
                //将select的宽高等于div的宽高
                border-radius: 100px;
                width: 150px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                cursor:pointer;
                background-color: #fff;
                //隐藏select的下拉图标
                appearance: none;
                -webkit-appearance: none;
                -moz-appearance: none;
                //通过padding-left的值让文字居中
                padding-left: 15px;
            }
            option {
                background-color: #fff;
            }
            //使用伪类给select添加自己想用的图标
            &:after{
                content: "";
                width: 16px;
                height: 16px;
                background: url('../../assets/img/Group 3.png') no-repeat center;
                background-size: contain;
                //通过定位将图标放在合适的位置
                position: absolute;
                border-radius: 100%;
                right: 15px;
                top: 7px;
                //给自定义的图标实现点击下来功能
                pointer-events: none;
            }
        }

    }
</style>