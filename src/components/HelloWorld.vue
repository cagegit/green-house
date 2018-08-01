<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p class="ms">
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank">vue-cli documentation</a>.
    </p>
      <!--<van-cell-group>-->
          <!--<van-field v-model="value" placeholder="Username" />-->
      <!--</van-cell-group>-->
    <Ad></Ad>

  </div>
</template>

<script>
    import Ad from '../views/Ad';
    export default {
        name: 'HelloWorld',
        data() {
            return  {
                value:90
            }
        },
        props: {
          msg: String
        },
        components: {
            Ad
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $ofo : red;
  .ms {
    background-color: $ofo;
  }
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

</style>
