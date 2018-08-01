<template>
  <div id="app">
      <transition name="slide">
          <router-view/>
      </transition>
  </div>
</template>

<style lang="scss">
   @import "./sass/common";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
