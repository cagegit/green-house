<template>
  <div class="monitor">
      <transition name="slide-left">
             <router-view class="child-view"></router-view>
      </transition>
  </div>
</template>
<script>
   export default {
       name: 'Monitor',
       methods: {
           onSwipeRight() {
               console.log(this.$route.path);
               this.$router.push({name:'main'});
           }
       }
   }
</script>
<style lang="scss"></style>