<template>
    <div class="monitor">
        <HeadBar title="风机" link="/control"></HeadBar>
        <div class="main-body">
            <div class="fj-cell">
                <div class="sb-c-left">
                    <img src="@/assets/img/fengj@2x.png">
                    <span>风机设备</span>
                </div>
                <div class="sb-c-right" @click="toSetPage(1)">
                    <span>开启</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="fj-cell">
                <div class="sb-c-left">
                    <img src="@/assets/img/fengj@2x.png">
                    <span>风机设备1</span>
                </div>
                <div class="sb-c-right" @click="toSetPage(1)">
                    <span>开启</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="fj-cell">
                <div class="sb-c-left">
                    <img src="@/assets/img/fengj@2x.png">
                    <span>风机设备2</span>
                </div>
                <div class="sb-c-right" @click="toSetPage(1)">
                    <span>开启</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="fj-cell">
                <div class="sb-c-left">
                    <img src="@/assets/img/fengj@2x.png">
                    <span>风机设备3</span>
                </div>
                <div class="sb-c-right" @click="toSetPage(1)">
                    <span>关闭</span>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
            </div>
            <div class="fj-cell">
                <div class="sb-c-left">
                    <img src="@/assets/img/fengj@2x.png">
                    <span>风机设备4</span>
                </div>
                <div class="sb-c-right" @click="toSetPage(1)">
                    <span>关闭</span>
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
        data(){
            return {

            }
        },
        methods: {
            toSetPage(num) {
                this.$router.push('/monitor/fjsb');
            }
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