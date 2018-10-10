<template>
  <div id="app">
      <transition :name="transitionName">
          <router-view class="child-view"/>
      </transition>
  </div>
</template>
<script>
    export default {
        name:'App',
        data() {
            return {
                transitionName: 'slide-left'
            }
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                if(from.path.indexOf('monitor')>=0 && to.path.indexOf('main')>=0) {
                    this.transitionName = 'slide-right';
                    return;
                }
                if(from.path.indexOf('current')>=0 || from.path.indexOf('main')>=0) {
                    this.transitionName = 'slide-left';
                    return;
                }
                this.transitionName = fromDepth > toDepth? 'slide-right' : 'slide-left';
            }
        }
    }
</script>
<style lang="scss">
   @import "./sass/common";
   @import "./sass/variable";
   /*html,body{
       width: 100%;
       height: 100%;
       background-color: $main-bg;
   }*/
   html {
       width: 100%;
       height: 100%;
       -webkit-text-size-adjust: 100%;
       -moz-text-size-adjust: 100%;
       -ms-text-size-adjust: 100%;
       text-size-adjust: 100%;
   }

   body {
       background-color: $main-bg;
       margin: 0;
       padding: 0;
       /*position: fixed;*/
       /*overflow: hidden;*/
       width: 100%;
       max-width: 100%;
       height: 100%;
       max-height: 100%;
       -webkit-font-smoothing: antialiased;
       font-smoothing: antialiased;
       text-rendering: optimizeLegibility;
       -webkit-user-drag: none;
       -ms-content-zooming: none;
       -ms-touch-action: manipulation;
       touch-action: manipulation;
       word-wrap: break-word;
       -webkit-text-size-adjust: none;
       -moz-text-size-adjust: none;
       -ms-text-size-adjust: none;
       text-size-adjust: none;
       -webkit-user-select: none;
       -moz-user-select: none;
       -ms-user-select: none;
       user-select: none;
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
   .monitor{
       width: 100%;
       height: 100vh;
       text-align: left;
       overflow-y: auto;
   }
    .main-body {
        padding: 0 10px;
        min-height: 100%;
    }
   .van-dialog__confirm, .van-dialog__confirm:active {
       color: $btn-color !important;
   }
   .van-picker__cancel, .van-picker__confirm {
       color: $btn-color !important;
       font-size: 16px;
   }
</style>
