<template>
  <div class="home">
    <div class="start-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  watch:{
      $route(to,from){
          console.log(to.path);
      }
  }
}
</script>
