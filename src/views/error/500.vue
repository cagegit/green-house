<template>
    <div class="err-page">
        <img src="@/assets/img/500.png"/>
        <span>网络连接错误，请刷新重试</span>
    </div>
</template>
<script>
    export default {
        name:"Err500",
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .err-page{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        position:fixed;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: all 2s ease-in;
    }
</style>