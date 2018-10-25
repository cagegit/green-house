<template>
    <v-touch v-on:swiperight="onSwipeRight" tag="div">
        <div>
            <HeadBar :title="name+'设备'" link="/monitor/main"></HeadBar>
            <div class="main-body">
                <div class="sb-com-cell" style="margin-top: 10px" v-if="pro.ctrl==='1' || pro.ctrl==='2'">
                    <div class="fj-flex">
                        <div class="sb-c-left">
                            <span>手动</span>
                        </div>
                        <div class="sb-c-right">
                            <van-switch :value="handCheck" @input="changeDanlu"/>
                        </div>
                    </div>
                </div>
                <!--三路控制-->
                <div class="sb-com-cell" style="margin-top: 10px" v-if="pro.ctrl==='3'">
                    <div class="fj-flex">
                        <div class="sb-c-left">
                            <span>手动</span>
                        </div>
                        <div class="sb-c-right">
                            <van-switch :value="handCheck" @input="changeDanlu" />
                        </div>
                    </div>
                    <div class="fj-content">
                        <div class="fj-zx">
                            <div class="zx-item" @click="setZx(-1)">
                                <img :src="currentZx===-1?zxMap.leftPress:zxMap.leftNormal">
                                <span :class="{'active':currentZx===-1}">左转</span>
                            </div>
                            <div class="zx-item" @click="setZx(0)">
                                <img :src="currentZx===0?zxMap.stopPress:zxMap.stopNormal">
                                <span :class="{'active':currentZx===0}">停止</span>
                            </div>
                            <div class="zx-item" @click="setZx(1)">
                                <img :src="currentZx===1?zxMap.rightPress:zxMap.rightNormal">
                                <span :class="{'active':currentZx===1}">右转</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!--阶段控制-->
                <div class="sb-com-cell" style="margin-top: 10px" v-if="pro.ctrl==='4'">
                    <div class="fj-flex">
                        <div class="sb-c-left">
                            <span>手动</span>
                        </div>
                        <div class="sb-c-right">
                            <van-switch :value="handCheck" @input="changeDanlu" />
                        </div>
                    </div>
                    <div class="fj-content">
                        <div class="fj-slider">
                            <van-slider v-model="current" :step="25" bar-height="8px" />
                            <div class="slider-kd">
                                <span>关闭</span>
                                <span>25%</span>
                                <span>50%</span>
                                <span>75%</span>
                                <span>100%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="sb-com-cell"  v-if="pro.ctrl==='1' || pro.ctrl==='2' || pro.ctrl==='3'">
                    <div class="fj-flex">
                        <div class="sb-c-left">
                            <span>自动</span>
                        </div>
                        <div class="sb-c-right">
                            <van-switch :value="autoCheck" @input="onAutoInput"/>
                        </div>
                    </div>
                    <div v-if="autoCheck">
                        <div class="fj-in-flex fj-head" @click="chongFu()">
                            <div class="sb-c-left">
                                <span>重复</span>
                            </div>
                            <div class="sb-c-right">
                                <input type="text" class="cf-input" placeholder="请选择" :value="chongfu" readonly/>
                                <i class="van-icon van-icon-arrow"></i>
                            </div>
                        </div>
                        <div class="fj-content" v-for="(item, index) in taskList" :key="index">
                            <div class="fj-in-flex" @click="setStartTime(item)">
                                <div class="sb-c-left">
                                    <span>开启时间</span>
                                </div>
                                <div class="sb-c-right">
                                    <input type="text" placeholder="请选择" :value="item.stTime" readonly/>
                                    <i class="van-icon van-icon-arrow"></i>
                                </div>
                            </div>
                            <div class="fj-in-flex" @click="setEndTime(item)">
                                <div class="sb-c-left">
                                    <span>关闭时间</span>
                                </div>
                                <div class="sb-c-right">
                                    <input type="text" placeholder="请选择" :value="item.enTime" readonly/>
                                    <i class="van-icon van-icon-arrow"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="add-button-area" v-if="autoCheck" @click="addTask">
                    <van-icon name="add-o" />
                </div>
            </div>
            <van-actionsheet v-model="startTimePanel">
                <van-datetime-picker
                        v-model="stTime"
                        type="time"
                        :min-hour="starthour"
                        :max-hour="stMaxHour"
                        @confirm="startConfirm"
                        @cancel="startCancel"
                />
            </van-actionsheet>
            <van-actionsheet v-model="endTimePanel">
                <van-datetime-picker
                        v-model="enTime"
                        type="time"
                        :min-hour="endhour"
                        :max-hour="enMaxHour"
                        @confirm="endConfirm"
                        @cancel="endCancel"
                />
            </van-actionsheet>
        </div>
    </v-touch>
</template>
<script>
    import { Switch,Slider,DatetimePicker,Actionsheet,Dialog,Toast } from 'vant'
    import HeadBar from '../../components/HeadBar';
    import {setController,getAutoTask,addAutoTasks,modifyAutoTask} from '../../service';
    import { mapActions} from 'vuex';
    import { Icon } from 'vant';
    export default {
        name: 'Fjsb',
        props: {
            name:{
                type: String,
                default: ''
            },
            id: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                handCheck:false,
                autoCheck: false,
                timeoutId: 0,
                current: 0,
                currentZx: 0, // -1:左转 0：停止 1:右转
                zxMap: {
                    leftNormal: require('@/assets/img/left-normal@2x.png'),
                    leftPress: require('@/assets/img/left-press@2x.png'),
                    stopNormal: require('@/assets/img/stop-normal@2x.png'),
                    stopPress: require('@/assets/img/stop-press@2x.png'),
                    rightNormal: require('@/assets/img/right-normal@2x.png'),
                    rightPress: require('@/assets/img/right-press@2x.png'),
                },
                pro:{
                    ctrl:'1'
                },
                startTimePanel: false,
                endTimePanel: false,
                starthour: 0,
                stMaxHour: 23,
                startminute: 0,
                stTime:'00:00',
                endhour: 0,
                enMaxHour: 23,
                endminute: 0,
                enTime:'14:00',
                chongfu: '每天',
                taskList: [],
                firstList: [],// 原始列表
                looptype: 'day',
                days:[],
                currentItem: null,
                isEdit: false,
                oldArrStr:'',
                newArrStr:''
            }
        },
        components: {
            [Switch.name]:Switch,
            [Slider.name]:Slider,
            [DatetimePicker.name]:DatetimePicker,
            [Actionsheet.name]:Actionsheet,
            [Dialog.name]: Dialog,
            [Icon.name]: Icon,
            HeadBar
        },
        created() {
            if(this.id) {
                this.$store.commit('setCtrlId',this.id);
            }
            const {propertys,controlHand,controlAuto,fxType,fxWeek,fxMonth,tasks,ctrlId,token} = this.$store.state;
            this.getAutoTasks(ctrlId,token);
            // console.log('taskId:'+taskItemId);
            console.log(ctrlId);
            if(!propertys) {
                this.$router.replace('/monitor/sbkz');
                return;
            }
            this.handCheck = controlHand;
            this.autoCheck = controlAuto;
            this.looptype = fxType;
            this.setChongFu(fxType,fxWeek,fxMonth);
            this.taskList = tasks;
            this.pro = propertys;
            this.currentZx = this.pro.value || 0;
            this.current = this.pro.value || 0;
            if(this.currentZx ==='3') {
                this.firstList = localStorage.getItem('firstList') || [];
            }
        },
        methods: {
            ...mapActions([
                'fxAction'
            ]),
            chongFu() {
                this.$router.push('/monitor/fuxuan');
            },
            setChongFu(fxType,fxWeek,fxMonth) {
                if(fxType==='week') {
                    this.days = fxWeek;
                    const wk ={1:'周一',2:'周二',3:'周三',4:'周四',5:'周五',6:'周六',7:'周日'};
                    this.chongfu = fxWeek.map(v => wk[v]).join(',');
                } else if(fxType==='month') {
                    this.days = fxMonth;
                    this.chongfu = '每月 '+fxMonth.slice(0,5).join(',');
                } else {
                    this.days = [];
                    this.chongfu = '每天';
                }
            },
            setZx(num) {
                Dialog.confirm({
                    message: `确认要更改设置吗？`
                }).then(() => {
                    this.currentZx = num;
                    this.pro.value = num;
                    this.taskList = this.firstList.filter(v => v.startvalue === this.currentZx);
                    this.setCtrl();
                }).catch(err => {
                    console.log(err);
                });
            },
            setCtrl() {
                clearTimeout(this.timeoutId);
                this.timeoutId = setTimeout(() => {
                    const ctrlId = this.$store.state.ctrlId;
                    const {deviceId,Channel,value,gatewayId} = this.pro;
                    setController(deviceId,Channel,value,gatewayId,ctrlId)
                        .then(res => {
                        })
                        .catch(err => {
                            console.log(err);
                        })
                },200)
            },
            setStartTime(item) {
                // this.stTime = item.stTime;
                this.currentItem = item;
                this.startTimePanel = true;
            },
            setEndTime(item) {
                // this.enTime = item.enTime;
                this.currentItem = item;
                this.endTimePanel = true;
            },
            startConfirm(currentVal) {
                this.stTime = currentVal;
                this.currentItem.stTime = currentVal;
                this.startTimePanel = false;
            },
            startCancel() {
                this.startTimePanel = false;
            },
            endConfirm(currentVal) {
                this.enTime = currentVal;
                this.currentItem.enTime = currentVal;
                this.endTimePanel = false;
            },
            endCancel() {
                this.endTimePanel = false;
            },
            getAutoTasks(ctrlId,token) {
                // console.log(this.id);
                getAutoTask(ctrlId,token).then(res => {
                   // console.log(res);
                    if(res && res.data && res.data.results && Array.isArray(res.data.results)) {
                        this.isEdit = true; // 是否编辑
                        if(res.data.results.length>0) {
                            const data = res.data.results[0];
                            if(data.content === '{}') {
                                this.isEdit = false;
                                this.autoCheck = false;
                            } else {
                                const content = JSON.parse(data.content);
                                const strType = content.looptype;// 周期类型
                                // this.days = content.days;
                                this.looptype = strType;
                                let fxWeek = [];
                                let fxMonth = [];
                                if(strType ==='week') {
                                    fxWeek = content.days;
                                } else {
                                    fxMonth = content.days;
                                }
                                const arr = [];
                                const metaInfo = {};
                                if(content.tims && Array.isArray(content.tims)) {
                                    content.tims.forEach(v => {
                                        let st = '';
                                        let et = '';
                                        st += v.starthour.length>1?v.starthour:'0'+v.starthour;
                                        st += ':';
                                        st += v.startminute.length>1?v.startminute:'0'+v.startminute;

                                        et += v.endhour.length>1?v.endhour:'0'+v.endhour;
                                        et += ':';
                                        et += v.endminute.length>1?v.endminute:'0'+v.endminute;
                                        arr.push({
                                            id: this.createUUID(),
                                            stTime: st,
                                            enTime: et,
                                            startvalue: v.startvalue || 0
                                        });
                                    });
                                    metaInfo.tims = content.tims;
                                    metaInfo.type = strType;
                                    this.firstList = arr;
                                    if(this.pro.ctrl ==='3') {
                                        this.taskList = arr.filter(v => v.startvalue === this.currentZx);
                                    } else {
                                        this.taskList = arr;
                                    }
                                    this.$store.commit('setTaskList',this.taskList);
                                }
                                metaInfo.days = content.days;
                                metaInfo.status = data.status;
                                this.oldArrStr = JSON.stringify(metaInfo);
                                this.autoCheck = data.status ===1;
                                this.setChongFu(strType,fxWeek,fxMonth);
                                this.fxAction({type: strType,value:content.days});
                                this.$store.commit('setControlAuto',this.autoCheck);
                            }
                        }
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            addAutoTask(content) {
                const token = this.$store.state.token;
                content.controllerid= this.id;
                let type = 1;
                if(this.pro.ctrl === '4') {
                    type = 3;
                } else if(this.pro.ctrl === '3'){
                    type = 2;
                } else  {
                    type = 1;
                }
                addAutoTask(this.id,token,content,this.autoCheck,type)
                    .then(res => {
                        //console.log(res);
                    }).catch(err => {
                     console.log(err);
                    });
            },
            editAutoTask(taskId,content) {
                const token = this.$store.state.token;
                modifyAutoTask(taskId,this.id,content,token)
                    .then(res => {
                        //console.log(res);
                    }).catch(err => {
                       console.log(err);
                    });
            },
            saveAutoInfo() {
                const sk = {};
                if(this.autoCheck) {
                    const {fxType,token,ctrlId} = this.$store.state;
                    sk.token = token;
                    sk.controllerid = ctrlId;
                    sk.type = 1;
                    if(this.pro.ctrl == '4') {
                        sk.type = 3;
                    } else if(this.pro.ctrl == '3'){
                        sk.type = 2;
                    } else  {
                        sk.type = 1;
                    }
                    sk.status =1;
                    sk.content = {};
                    sk.content.looptype = fxType;
                    sk.content.tims = [];
                    sk.content.days = this.days;
                    sk.content.controllerid = this.id;
                    if(sk.type===2) {
                       this.taskList = this.firstList.slice(0);
                    }
                    this.taskList.forEach(v => {
                        let fw = {
                            starthour: "",
                            startminute: "",
                            endhour: "",
                            endminute: ""
                        };
                        if(v.stTime) {
                            let [a,b] = v.stTime.split(':');
                            fw.starthour = a && a.replace(/^0/,'');
                            fw.startminute = b && b.replace(/^0/,'');
                        }
                        if(v.enTime) {
                            let [a,b] = v.enTime.split(':');
                            fw.endhour = a && a.replace(/^0/,'');
                            fw.endminute = b && b.replace(/^0/,'');
                        }
                        if(sk.type===2) {
                            fw.startvalue = v.startvalue;
                        }
                        sk.content.tims.push(fw);
                        this.newArrStr = JSON.stringify({tims:sk.content.tims,type:fxType,days:sk.content.days,status:1});
                    });
                } else {
                    const {token,ctrlId} = this.$store.state;
                    // let sk ={};
                    sk.controllerid = ctrlId;
                    sk.token = token;
                    sk.type = 1;
                    if(this.pro.ctrl == '4') {
                        sk.type = 3;
                    } else if(this.pro.ctrl == '3'){
                        sk.type = 2;
                    } else  {
                        sk.type = 1;
                    }
                    sk.status = 0;
                    sk.content = {};
                }
                if(this.isEdit) {
                    const isMatch = this.oldArrStr === this.newArrStr;
                    if(!isMatch) {
                        modifyAutoTask(sk.controllerid,sk.token,sk.content,sk.status,sk.type).then(res => {
                            if(res.data && res.data.code ===1 && res.data.msg==='ok') {
                                Toast.success('修改成功');
                            } else {
                                Toast.fail('修改失败');
                            }
                        }).catch(err => {
                            console.log(err);
                            Toast.fail('网络错误');
                        });
                    }
                } else {
                    console.log(sk);
                    if(!sk.content || JSON.stringify(sk.content)==='{}') {
                        return;
                    }
                    addAutoTasks(sk.controllerid,sk.token,sk.content,sk.status,sk.type).then(res => {
                        if(res.data && res.data.code ===1 && res.data.msg==='ok') {
                            Toast.success('保存成功');
                        } else {
                            Toast.fail('保存失败');
                        }
                    }).catch(err => {
                        console.log(err);
                        Toast.fail('网络错误');
                    });
                }
            },
            changeDanlu(check) {
                let txt = check?'开启':'关闭';
                Dialog.confirm({
                    message: `确认要${txt}吗？`
                }).then(() => {
                    this.handCheck = check;
                    this.$store.commit('setControlHand',check);
                    this.pro.value = check?1:0;
                    this.setCtrl();
                }).catch(err => {
                    console.log(err);
                });
            },
            onAutoInput(check) {
                let txt = check?'确认要开启自动任务吗？':'确认要关闭自动任务吗？';
                Dialog.confirm({
                    message: txt
                }).then(() => {
                    if(check) {
                        const obj = {
                            id: this.createUUID(),
                            stTime: '00:00',
                            enTime: '23:59',
                            startvalue: this.currentZx
                        };
                        this.taskList.push(obj);
                        if(this.pro.ctrl ==='3') {
                            this.firstList.push(obj);
                            localStorage.setItem('firstList',this.firstList);
                        }
                    }
                    this.autoCheck = check;
                    this.$store.commit('setControlAuto',check);
                    this.$store.commit('setTaskList',this.taskList);
                }).catch(err => {
                    console.log(err);
                });
            },
            addTask() {
                const obj ={
                    id: this.createUUID(),
                    stTime: '00:00',
                    enTime: '23:59',
                    startvalue: this.currentZx
                };
                this.taskList.push(obj);
                if(this.pro.ctrl ==='3') {
                    this.firstList.push(obj);
                    localStorage.setItem('firstList',this.firstList);
                }
                this.$store.commit('setTaskList',this.taskList);
            },
            onSwipeRight() {
                this.$router.go(-1);
            },
            createUUID() {
                const uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                function (c) {
                    let r = Math.random() * 16 | 0,
                    v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                }).toUpperCase();
                return uuid;
            }
        },
        beforeRouteLeave (to, from , next) {
            if(to.path.indexOf('sbkz')>=0) {
                this.saveAutoInfo();
                this.$store.commit('setTaskList',[]);
            }
            next();
        },
        watch: {
            'current': function (val) {
                this.pro.value = val;
            }
        }
    }
</script>
<style lang="scss">
    .sb-com-cell {
        background: #FFFFFF;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
        border-radius: 5PX;
        text-align: left;
        position: relative;
        margin-bottom: 10px;
        /*overflow: hidden;*/
        .fj-flex{
            display: flex;
            flex: 1;
            justify-content: space-between;
            align-items: center;
            padding: 5px 10px;
            height: 60px;
            line-height: 60px;
            overflow: hidden;
            .van-switch--on {
                background-color:#44E3A8;
            }
        }
        .fj-in-flex {
            display: flex;
            flex: 1;
            justify-content: space-between;
            align-items: center;
            padding: 5px 10px;
            height: 50px;
            line-height: 50px;
            overflow: hidden;
            .sb-c-left span{
                color: #4B4A4A
            }
            .sb-c-right span {
                color: #B2B2B2;
            }
            input{
                width: 50px;
                font-size: 14px;
                text-align: right;
                padding-right: 5px;
                color:#B2B2B2;
            }
        }
        .cf-input {
            width: 120px !important;
        }
        .fj-head {
            border-top: 1px solid #ddd;
            padding: 15px;
        }
        .fj-content{
            border-top: 1px solid #ddd;
            padding: 5px;
        }
        .fj-slider {
            margin-top: 10px;
            padding: 15px;
            .van-slider__button,.van-slider__bar {
               background-color: #44E3A8;
            }
        }
        .slider-kd {
            display: flex;
            flex: 1;
            justify-content: space-between;
            padding: 15px 0;
            span {
                color: #B2B2B2;
            }
        }
        .fj-zx {
            margin-top: 10px;
            padding: 15px;
            display: flex;
            flex: 1;
            justify-content: space-between;

        }
        .zx-item {
            text-align: center;
            img {
                width: 40px;
                height: 40px;
            }
            span {
                display: block;
                padding-top: 5px;
                color: #B2B2B2;
            }
            .active {
               color:  #16CF9D;
            }
        }
        .sb-c-left {
            display: flex;
            align-items: center;
            span {
                font-size: 16px;
                color: #202323;
                padding-left: 10px;
            }
        }
        .sb-c-right {
            display: flex;
            align-items: center;
            i,span {
                color: #B2B2B2;
            }
        }
        > img {
            width: 40px;
            height: 40px;
            display: inline-block;
            border: 0;
        }

    }
    .add-button-area {
        position: fixed;
        z-index: 1000;
        bottom: 10px;
        right: 10px;
        cursor: pointer;
        font-size: 24px;
    }
</style>