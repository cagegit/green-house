<template>
    <div class="monitor">
        <HeadBar title="风机设备" link="/monitor/main"></HeadBar>
        <div class="main-body">
            <div class="sb-com-cell" style="margin-top: 10px">
                <div class="fj-flex">
                    <div class="sb-c-left">
                        <span>手动</span>
                    </div>
                    <div class="sb-c-right">
                        <van-switch v-model="handCheck" />
                    </div>
                </div>
            </div>

            <div class="sb-com-cell">
                <div class="fj-flex">
                    <div class="sb-c-left">
                        <span>自动</span>
                    </div>
                    <div class="sb-c-right">
                        <van-switch v-model="autoCheck" />
                    </div>
                </div>
                <div class="fj-content" v-if="autoCheck">
                    <div class="fj-in-flex">
                        <div class="sb-c-left">
                            <span>开启时间</span>
                        </div>
                        <div class="sb-c-right">
                            <input type="text" placeholder="请选择" readonly/>
                            <i class="van-icon van-icon-arrow"></i>
                        </div>
                    </div>
                    <div class="fj-in-flex">
                        <div class="sb-c-left">
                            <span>关闭时间</span>
                        </div>
                        <div class="sb-c-right">
                            <input type="text" placeholder="请选择" readonly/>
                            <i class="van-icon van-icon-arrow"></i>
                        </div>
                    </div>
                    <div class="fj-in-flex">
                        <div class="sb-c-left">
                            <span>重置</span>
                        </div>
                        <div class="sb-c-right">
                            <input type="text" placeholder="请选择" readonly/>
                            <i class="van-icon van-icon-arrow"></i>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import { Switch } from 'vant'
    import HeadBar from '../../components/HeadBar'
    export default {
        name: 'Fjsb',
        data() {
            return {
                handCheck:true,
                autoCheck: false
            }
        },
        components: {
            [Switch.name]:Switch,
            HeadBar
        },
        watch: {
            'handCheck':function (isCheck) {
                this.autoCheck = !isCheck;
            },
            'autoCheck':function (isCheck) {
                this.handCheck = !isCheck;
            }
        }
    }
</script>
<style lang="scss" scoped>
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
        .fj-content{
            border-top: 1px solid #ddd;
            padding: 5px;
        }
        .sb-c-left {
            display: flex;
            align-items: center;
        }
        .sb-c-right {
            display: flex;
            align-items: center;
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