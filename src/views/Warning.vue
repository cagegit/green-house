<template>
    <div class="content-warp">
        <!-- <div class="switch-tab flex">
            <div class="mess"
             v-for="tab in tabs"
             :key="tab" 
             v-bind:class="{ 'active-tab':currentTab==tab }"
             v-on:click="switchBtn(tab)"
            >{{tab}}</div>
        </div> -->
        <router-view></router-view>
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
    
</style>