<template>
  <div id="app">
      <transition name="slide">
          <router-view/>
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
</style>
