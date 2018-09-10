<template>
    <div class="err-page" @click="toMain()">
        <img src="@/assets/img/404.png"/>
        <span>暂无数据</span>
    </div>
</template>
<script>
    export default {
         name:'Err404',
         methods: {
             toMain() {
                 this.$router.replace('/monitor/main')
             }
         }
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