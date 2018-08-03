<template>
    <div class="dp-tab" >
        <button type="button" v-for="item in tabList"
                :class="{'active':item.active}" @click="toRedirect(item.url)">{{ item.name }}</button>
    </div>
</template>
<script>
 export default {
     name:'DpTab',
     props: {
         active: {
             default: 1
         }
     },
     data() {
         return {
             tabList: [
                 { name:'实时监测', url: '/monitor/ssjc', active: this.active===1 },
                 { name:'设备控制', url: '/monitor/sbkz', active: this.active===2 },
                 { name:'历史曲线', url: '/monitor/lsqx', active: this.active===3 },
                 { name:'设备信息', url: '/monitor/ssxx', active: this.active===4 }
             ]
         }
     },
     methods: {
         toRedirect(url) {
           this.$router.replace(url);
         }
     }
 }
</script>
<style lang="scss" scoped>
   .dp-tab {
      margin: 15px auto;
      display: flex;
      justify-content: space-around;
      flex: 1;
      button {
          border-radius: 100px;
          background-color: #fff;
          padding: 5px 10px;
          color: #4D5251;
          &.active {
              background-color: #44E3A8;
              color: #fff;
          }
      }
   }
</style>