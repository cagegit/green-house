<template>
    <div class="content-warp">
        <div class="switch-tab flex">
            <div class="mess"
             v-for="tab in tabs"
             :key="tab" 
             v-bind:class="{ 'active-tab':currentTab==tab }"
             v-on:click="switchBtn(tab)"
            >{{tab}}</div>
        </div>
        <router-view></router-view>
        <FootBar :active="3"></FootBar>
    </div>
</template>
<script>
    import FootBar from '@/components/FootBar'
    export default {
        name: "Warning",
         components: {
            FootBar
        },
        data() {
            return {
               currentTab: '当前警告',
               tabs: ['当前警告', '历史警告']
            }
        },
        methods:{
            switchBtn(el){
                this.currentTab=el;
                console.log(this.$data.currentTab)
                if(el=="当前警告"){
                    this.$router.push("/warning/currentwarn");
                }else{
                     this.$router.push("/warning/historywarn");
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
    .switch-tab{
        margin-bottom:0.733333rem;
        flex-wrap:nowrap;
        justify-content:flex-start;
        margin-top:0.293333rem;
    }
    .mess {
        width: 3.2rem;
        font-family: PingFangSC-Regular;
        height: 1.013333rem;     
        border-radius:0.4rem;
        text-align:center;
        line-height:0.8rem;
        border:1px solid #eee;
        margin-right:0.306667rem;
        font-size:0.453333rem;
        font-weight:500;
        color: #A1ABB7;
        line-height: 0.933333rem;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
    }
    
    .active-tab{
        background: #44E3A8;
        font-size: 0.64rem;
        color: #202323;
    }
</style>