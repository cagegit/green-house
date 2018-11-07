<template>
    <div>
        <HeadBar title="告警" :left="false" link=""></HeadBar>
        <div class="content-warp">
            <div style="position: relative;">
                <transition name="slide-left">
                    <router-view class="child-view"></router-view>
                </transition>
            </div>
        </div>
        <FootBar :active="3"></FootBar>
    </div>
</template>
<script>
    import FootBar from '../components/FootBar';
    import HeadBar from '../components/HeadBar';
    export default {
        name: "Warning",
         components: {
            FootBar,
            HeadBar
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
        padding: 0 10px;
        margin-bottom:1.733333rem;
    }
    
</style>