<template>
  <div class="monitor">
      <router-view></router-view>
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
        height: 100%;
        text-align: left;
    }
</style>