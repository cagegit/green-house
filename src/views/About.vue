<template>
    <transition name="slide-left">
        <router-view class="child-view"></router-view>
    </transition>
</template>
<script>

    export default {
        name: "About",
        components: {

        },
        data() {
            return {
              
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

</style>