<template>
  <div id="app">
      <transition name="slide-left">
          <router-view class="child-view"/>
      </transition>
  </div>
</template>
<style lang="scss">
   @import "./sass/common";
   @import "./sass/variable";
   html,body{
       background-color: $main-bg;
   }
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
       color: #2c3e50;
    }
    .btn {
        padding: 5px 10px;
        border-radius: 100px;
        background-color: #fff;
    }
    .main-body {
        padding: 0 10px;
    }
   .van-dialog__confirm, .van-dialog__confirm:active {
       color: $btn-color !important;
   }
   .van-picker__cancel, .van-picker__confirm {
       color: $btn-color !important;
       font-size: 16px;
   }
</style>
