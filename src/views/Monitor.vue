<template>
  <div class="monitor">
      <transition :name="transitionName" mode="out-in">
         <router-view class="child-view"></router-view>
      </transition>
  </div>
</template>
<script>
   export default {
       name: 'Monitor',
       data() {
           return {
               transitionName: 'slide-left'
           };
       },
       watch: {
           '$route' (to, from) {
               const toDepth = to.path.split('/').length;
               const fromDepth = from.path.split('/').length;
               this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
           }
       }
   }
</script>
<style lang="scss">
    .monitor{
        width: 100%;
        height: 100vh;
        text-align: left;
    }
</style>