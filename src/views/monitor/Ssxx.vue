<template>
    <div class="monitor">
        <HeadBar title="设施信息" link="/monitor/main"></HeadBar>
        <DpTab :active="4"></DpTab>
        <div class="main-body">
            <div class="sb-cell">
                <div class="sb-c-left">
                    <span>图像</span>
                </div>
                <div class="sb-c-right">
                    <img src="@/assets/img/dp@2x.png">
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="sb-cell">
                <div class="sb-c-left">
                    <span>大棚名称</span>
                </div>
                <div class="sb-c-right" @click="editSbxx(1)">
                    <span>{{sbInfo.name}}</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="sb-cell">
                <div class="sb-c-left">
                    <span>作物种类</span>
                </div>
                <div class="sb-c-right" @click="editSbxx(2)">
                    <span>{{sbInfo.type}}</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="sb-cell">
                <div class="sb-c-left">
                    <span>大棚尺寸</span>
                </div>
                <div class="sb-c-right" @click="editSbxx(3)">
                    <span>{{sbInfo.size}}</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="sb-cell">
                <div class="sb-c-left">
                    <span>所在地</span>
                </div>
                <div class="sb-c-right" @click="showTimePanel=true">
                    <span>{{sbInfo.area}}</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="sb-button">
                <button type="button" :disabled="isSaving" @click="modifyDpInfo()">保存</button>
            </div>
            <van-actionsheet v-model="showTimePanel">
                <van-area :area-list="addressList" @confirm="getArea" @cancel="showTimePanel=false;" />
            </van-actionsheet>
        </div>
    </div>
</template>
<script>
    import HeadBar from '../../components/HeadBar'
    import DpTab from '../../components/DpTab'
    import AreaList from 'vant/packages/area/demo/area';
    import {Actionsheet,Area,Toast } from 'vant';
    import {editDaPeng} from '../../service'
    export default {
        name: 'Ssxx',
        components: {
            HeadBar,
            DpTab,
            [Actionsheet.name]:Actionsheet,
            [Area.name]:Area,
            [Toast.name]:Toast
        },
        data() {
           return {
               sbInfo: this.$store.state.sbInfo,
               showTimePanel:false,
               addressList:AreaList,
               isSaving: false
           }
        },
        methods: {
            editSbxx(num) {
                if(num===1) {
                    this.$router.push({name:'dp-name'});
                } else if(num===2) {
                    this.$router.push({name:'dp-type'});
                } else {
                    this.$router.push({name:'dp-size'});
                }
            },
            getArea(data) {
                this.showTimePanel = false;
                // console.log(data);
                if(data.length>=3) {
                    this.sbInfo.area = data[0].name +data[1].name + data[2].name;
                    this.$store.commit('sbinfo',this.sbInfo);
                }
            },
            modifyDpInfo() {
                // dpId,name,foodtype,w,h,len,address
                const {pid,token,sbInfo} = this.$store.state;
                if(!pid) {
                    return;
                }
                const [w,h,l] = sbInfo.size.split('*');
                this.isSaving = true;
                editDaPeng(pid,token,sbInfo.name,sbInfo.type,w,h,l,sbInfo.area)
                    .then(res => {
                        // console.log(res);
                        if(res && res.data && res.data.code ===1) {
                            Toast('保存成功！');
                        } else {
                            Toast('保存失败！');
                        }
                        this.isSaving = false;
                    }).catch(err => {
                        console.log(err);
                        this.isSaving = false;
                        Toast('保存失败！');
                    });
            }
        }
    }
</script>
<style lang="scss" scoped>
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
            color: #202323;
        }
        .sb-c-right {
            display: flex;
            align-items: center;
            i,span {
                color: #B2B2B2;
                font-size: 14px;
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