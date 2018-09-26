<template>
  <div class="monitor">
      <transition name="slide-right">
         <router-view class="child-view"></router-view>
      </transition>
  </div>
</template>
<script>
   export default {
       name: 'Monitor'
   }
</script>
<style lang="scss">
    .monitor{
        width: 100%;
        height: 100vh;
        text-align: left;
    }
</style>