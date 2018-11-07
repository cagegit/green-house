<template>
  <div class="monitor">
      <transition name="slide-left">
             <router-view class="child-view"></router-view>
      </transition>
  </div>
</template>
<script>
   export default {
       name: 'Monitor'
   }
</script>
<style lang="scss"></style>