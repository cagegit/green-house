<template>
        <div>
            <HeadBar title="实时监测" link="/monitor/main"></HeadBar>
            <DpTab :active="1"></DpTab>
                <div class="main-body">
                    <!--\天气-->
                     <Weather></Weather>
                    <!--天气\-->
                    <div class="ss-tip" v-if="warings>0">
                        <button type="button" class="btn" @click="toWarPage()">您有{{warings}}个报警，请查看></button>
                    </div>

                    <div class="ss-card" v-for="item in devices" :key="item.id">
                        <div class="ss-line">
                            <div class="ss-title">
                                <span>{{item.name}}</span>
                            </div>
                            <div @click="getLimitRequest(item.id)">
                                <img class="ss-xq" src="@/assets/img/xq@2x.png"/>
                            </div>
                        </div>
                        <div class="ss-line-no-icon">
                            <div class="sb-pre">
                                <img :src="toImg(item.name)"/> <span>{{toLiang(item)}}</span>
                            </div>
                            <div class="sb-next">
                                <p style="color:#D3D1CF">更新时间</p>
                                <p>{{item.time}}</p>
                            </div>
                        </div>
                    </div>

                    <van-collapse class="ss-card" v-if="videoList.length>0" v-model="activeNames"  accordion>
                        <div class="video-item-wrap" v-for="(item,index) in videoList" :key="index">
                            <img class="video-logo" style=" display: block !important;" src="@/assets/img/视频copy@3x.png" alt="">
                            <van-collapse-item :name="index" :title="item.name"  class="call-item">
                                <video  class="video-content" id="'myPlayer'index" poster="" controls playsInline webkit-playsinline autoplay>
                                    <source :src="item.properties.url_rtmp" type="" />
                                    <source :src="item.properties.url_hls" type="application/x-mpegURL" />
                                </video>
                            </van-collapse-item>
                        </div>
                    </van-collapse>
                    <div style="height: 100px;"></div>
                </div>
            <van-dialog class="dialog-wrap" :closeOnClickOverlay="true"	 :before-close="beforeClose" v-model="show" :show-cancel-button="true">
                <div v-if="sendLimitArr.length == 0" class="dia-content no-limite">无极限值设置</div>
                <div  v-else class="dia-content" v-for="(item,index) in sendLimitArr" :key="index">
                    <div class="title">{{item.name}}值设置</div>
                    <div class="gj-box">
                        <div class="flex-st">
                            <div class="st-left">上限</div>
                            <van-stepper
                                    class="gj-set"
                                    v-model="item.max"
                                    integer
                                    :min="item.min"
                                    :max="item.static_max"
                                    :step="1"
                            />
                            <!--<div class="gj-set">-->
                                <!--<button type="button">-</button>-->
                                <!--<div class="sb"><input type="text" :value="limit_high"/></div>-->
                                <!--<button type="button">+</button>-->
                            <!--</div>-->
                        </div>
                        <div class="flex-st">
                            <div class="st-left">下限</div>
                            <van-stepper
                                    class="gj-set"
                                    v-model="item.min"
                                    integer
                                    :min="item.static_min"
                                    :max="item.max"
                                    :step="1"
                            />
                            <!--<div class="gj-set">-->
                                <!--<button type="button">-</button>-->
                                <!--<div class="sb"><input type="text" :value="limit_low"/></div>-->
                                <!--<button type="button">+</button>-->
                            <!--</div>-->
                        </div>
                    </div>
                </div>
            </van-dialog>
        </div>
</template>
<script>
    import { Tabbar, TabbarItem, Icon, Dialog, Stepper, Collapse, CollapseItem,Toast } from 'vant'
    import Vue from 'vue'
    import HeadBar from '../../components/HeadBar'
    import DpTab from '../../components/DpTab'
    import Weather from '../../components/Weather'
    import {getWarings,getSensors,getLatestSensorData,getLimitValue,setLimitValue,getVideoListServe} from '../../service'
    Date.prototype.dateFormat = function(fmt) { //author: meizz
        let o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(let k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    };
    Vue.use(Dialog);
    Vue.use(Collapse);
    Vue.use(CollapseItem);
    export default {
        name: 'Ssjc',
        components: {
            Weather,
            [Tabbar.name]:Tabbar,
            [TabbarItem.name]:TabbarItem,
            [Icon.name]:Icon,
            [Stepper.name]:Stepper,
            [Toast.name]:Toast,
            HeadBar,
            DpTab
        },
        data() {
            return {
                active: 0,
                show: false,
                air: {},
                weather: [],
                warings: 0,
                devices: [],
                sfImg: require("@/assets/tr@3x.png"),
                phImg: require("@/assets/ph@3x.png"),
                wdImg: require("@/assets/wd@3x.png"),
                limit_low:0,
                limit_high:0,
                limitValue:[],
                sendLimitArr:[],
                activeNames: ['1'],
                videoList:[],
                pid:null,
                intervalId:null
            }
        },
        created(){
           // this.getLocationAndWeather();
            const {pid,token} = this.$store.state;
            // console.log(pid);
            if(!pid) {
                this.$router.back();
                return;
            }
            this.pid = pid;
            this.getConcatData(pid,token);
            this.countWarings();
            this.getVideoListData(pid,token);
            this.clearJsq();
            this.intervalId = setInterval(() => {
                this.getConcatData(pid,token);
                this.countWarings();
                setTimeout(() => {
                    this.getVideoListData(pid,token);
                },5000);
            },(10*1000));
        },
        mounted() {
            let videoLength = this.videoList.length;
            let playArr = [];
            for(let i;i<videoLength;i++){
                // console.log("lllllllllll")
                // console.log(item)
                playArr[i] = new EZUIPlayer('myPlayer'+i);
                playArr[i].on('error', function(){
                    console.log('error');
                });
                playArr[i].on('play', function(){
                    console.log('play');
                });
                playArr[i].on('pause', function(){
                    console.log('pause');
                });
            }

        },
        destroyed() {
            this.clearJsq();
        },
        methods: {
            changeWaring({limit_low,limit_high,readout_unit}){
                readout_unit = readout_unit? readout_unit.replace(/RH/g,'') : '';
                this.limit_low = limit_low+readout_unit;
                this.limit_high = limit_high+readout_unit;
                this.show = true;
            },
            clearJsq() {
                if(this.intervalId != null) {
                    clearInterval(this.intervalId);
                }
            },
            beforeClose(action, done) {
                if (action === 'confirm') {
                    this.sendLimitRequest(this.sendLimitArr);
                    setTimeout(done, 500);
                } else {
                    done();
                }
            },
            getLimitRequest(sensorld){
                getLimitValue(this.pid,sensorld).then(res=>{
                    if(res && res.data && Array.isArray(res.data.results)) {
                        let arr = [];
                        res.data.results.forEach(item => {
                            arr.push({...item,static_max:item.max,static_min:item.min});
                        });
                        this.sendLimitArr = arr;
                        this.show = true;
                    }
                })
            },
            sendLimitRequest(limitArr){
                let sendItemArr = this.sendLimitArr.map(item => {
                     delete item.static_max;
                     delete item.static_min;
                    return item;
                });
                setLimitValue(sendItemArr).then(res=>{
                    // console.log(res)
                    if(res && res.data && res.data.status ==1) {
                        Toast.success('设置成功！');
                    } else {
                        Toast.fail('设置失败！');
                    }
                })
            },
            coppyArray(arr){
                return arr.map((e)=>{
                    if(typeof e==='object'){
                        return Object.assign({},e);
                    }else{
                        return e;
                    }
                })
            },
            countWarings() {
                // type=3 //1：按级别 2：按日期 3：按大棚 &corp_id=1// 客户id&status=1 // 1:报警中 0：历史报警
                const fromTime = "2018-09-01";
                const toTime = new Date().dateFormat("yyyy-MM-dd");
                const id = this.$store.state.user.id;
                getWarings(2,id,1,fromTime,toTime).then(res => {
                    if(res.data && Array.isArray(res.data.results)) {
                       let num = 0;
                       res.data.results.forEach(item => {
                           num = num + item.count;
                       });
                        this.warings = num;
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            getConcatData(pid,token) {
                const quest1 = getSensors(pid,token);
                const quest2 = getLatestSensorData(pid);
                Promise.all([quest1,quest2]).then(res => {
                    const results = res.map(item => (item.data && item.data.results) || [] );
                    // console.log(results);
                    results[0].forEach(val => {
                        results[1].forEach(v => {
                            if(val.id === v._id) {
                                val['data'] =v.data ;
                                val['time'] =new Date(v.utime).dateFormat("yyyy-MM-dd hh:mm:ss");
                                val['properties'] = (val.properties && JSON.parse(val.properties)) || {};
                            }
                        });
                        if(results[1].length===0) {
                            val['data'] = 0;
                            val['time'] = new Date().dateFormat("yyyy-MM-dd hh:mm:ss");
                            val['properties'] = {};
                        }
                    });
                    this.$store.commit('setSensorList',results[0]); // 保存传感器列表
                    this.devices = results[0];
                }).catch(err => {
                    console.log(err);
                })
            },
            toWarPage(){
                this.$router.push('/warning');
            },
            toImg(txt) {
                if(/温度|光照/g.test(txt)) {
                    return this.wdImg;
                } else if(/湿度/g.test(txt)) {
                    return this.sfImg;
                } else {
                    return this.phImg;
                }
            },
            toLiang(item) {
                let dw = item.properties.readout_unit;
                dw = dw ? dw.replace(/RH/g,''): '';
                return item.data + dw;
            },
            getVideoListData(pid,token){
                getVideoListServe(pid,token).then(res=>{
                    this.videoList = res.data.results;
                    for(let item in this.videoList){
                        this.videoList[item].properties = JSON.parse(this.videoList[item].properties);
                    }
                }).catch(err => {
                   console.log(err);
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../sass/variable";
    .video-content{
        width:100%;
        height:300px;
        background: #ccc;
    }
    .ss-tip {
        margin: 10px auto;
        button {
            color: #FD2B49;
            border-radius: 44px;
        }
    }
    .ss-card {
        background: #FFFFFF;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
        border-radius: 10px;
        margin: 15px auto;
        padding: 10px 15px;
        line-height: 24px;
        .ss-line {
            display: flex;
            justify-content: space-between;
            flex: 1;
            .ss-title {
                color: #191919 !important;
                font-size: 14px;
                img {
                    width: 18px;
                    height: 18px;
                    vertical-align: text-bottom;
                }
                span {
                    padding-left: 5px;
                }
            }
            .ss-xq {
                width: 14px;
                height: 14px;
            }
        }
        .ss-line-no-icon {
            display: flex;
            justify-content: space-between;
            flex: 1;
            color: #777777 !important;
            span:first-child {
                padding-left: 24px;
                margin-right: 5px;
            }
        }
        .video-item-wrap{
            position: relative;
            .video-logo{
                position: absolute;
                width:22px;
                height:18px;
                top:14px;
                left:2px;
                display: block !important;
            }
            .call-item{
                margin-left:24px;
            }
        }
    }
    .sb-pre{
        img {
            padding: 10px 5px;
            vertical-align: bottom;
            width: 30px;
            height: 30px;
        }
        span {
            font-size: 24px;
            line-height: 2.1;
        }
    }
    .sb-next{
        &>p {
            text-align: right;
            color: #777777
        }
    }
    .sb-pink{
        color: $sbjc-pink;
        border: 1px solid $sbjc-pink;
        padding: 0 3px !important;
    }
    .sb-orange{
        color: $sbjc-orange;
        border: 1px solid $sbjc-orange;
        padding: 0 3px !important;
    }
    .sb-yellow{
        color: $sbjc-yellow;
        border: 1px solid $sbjc-yellow;
        padding: 0 3px !important;
    }
    .sb-blue{
        color: $sbjc-blue;
        border: 1px solid $sbjc-blue;
        padding: 0 3px !important;
    }
    .sb-green{
        color: $sbjc-green;
        border: 1px solid $sbjc-green;
        padding: 0 3px !important;
    }
    .dialog-wrap{
        overflow: scroll;
        .dia-content {
            padding: 15px;
            border-bottom:1px solid #eee;
            .title{
                font-size: 16px;
                /*font-weight: bold;*/
                color: #4D4C4C;
                letter-spacing: 1.7px;
            }
            .gj-box{
                padding: 10px 20px 0;
            }
            .flex-st{
                display: flex;
                flex: 1;
                justify-content: space-between;
                margin-bottom: 2px;
                line-height: 40px;
                .st-left{
                    padding-right: 20px;
                    width: 30%;
                    color: #4D4C4C;
                }
            }
            .gj-set {
                display: flex;
                flex: 1;
                justify-content: space-between;
                width: 100%;
                .sb {
                    text-align: center;
                }
                button {
                    border: 1px solid #191A1D;
                    width: 39px;
                    /* height: 35px; */
                    text-align: center;
                    color: #191A1D;
                    background-color: #fff;
                    line-height: 20px;
                    height: 20px;
                    margin-top: 10px;
                }
            }

        }
        .no-limite{
            width:100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

</style>
<style>
    .van-stepper__input{
        width: 45% !important;
        border-radius: 4px;
        text-align: center;
    }
</style>