<template>
    <div class="content-warp">
        <div class="find-txt">发现</div>
        <div class="switch-tab flex">
            <div class="mess"
             v-for="tab in tabs"
             :key="tab" 
             v-bind:class="{ 'active-tab':currentTab==tab }"
             v-on:click="switchBtn(tab)"
            >{{tab}}</div>
            <!-- <div class="mess">培训</div> -->
        </div>
        <router-view></router-view>
        <FootBar :active="3"></FootBar>
    </div>
</template>
<script>
    import { Tab, Tabs } from 'vant'
    import FootBar from '@/components/FootBar'

    export default {
        name: "Findings",
        components: {
            [Tabs.name]: Tabs,
            [Tab.name]: Tab,
            FootBar
        },
        data() {
            return {
               currentTab: '消息',
               tabs: ['消息', '培训']
            }
        },
        methods:{
            switchBtn(el){
                this.currentTab=el;
                console.log(this.$data.currentTab)
                if(el=="消息"){
                    this.$router.push("/findings/message");
                }else{
                     this.$router.push("/findings/training");
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .flex{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .content-warp {
        padding: 0 0.533333rem;
        margin-bottom:1.733333rem;
    }

    .find-txt {
        font-size: 0.64rem;
        font-wieght: 600;
        margin: 0.293333rem auto;
        text-align:left;
    }

    .mess {
        width: 2.0rem;
        height: 0.8rem;     
        border-radius:0.4rem;
        text-align:center;
        line-height:0.8rem;
        border:1px solid #eee;
        margin-right:0.306667rem;
    }
    .switch-tab{
        margin-bottom:0.533333rem;
        flex-wrap:nowrap;
        justify-content:flex-start;
    }
    .active-tab{
        background: #44E3A8;
        color:#ffffff;
    }
</style>