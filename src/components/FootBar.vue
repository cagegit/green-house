<template>
    <van-tabbar v-model="activeNum" class="foot-bar">
        <van-tabbar-item icon="shop" @click.native="moveTo(0)">监测</van-tabbar-item>
        <van-tabbar-item icon="chat" @click.native="moveTo(1)">控制</van-tabbar-item>
        <van-tabbar-item icon="records" @click.native="moveTo(2)" dot>告警</van-tabbar-item>
        <van-tabbar-item icon="gold-coin" @click.native="moveTo(3)">发现</van-tabbar-item>
        <van-tabbar-item icon="gold-coin" @click.native="moveTo(4)">我</van-tabbar-item>
    </van-tabbar>
</template>
<script>
    import { Tabbar, TabbarItem} from 'vant'
    import { mapActions} from 'vuex';
    export default {
        name: "FootBar",
        data(){
            return {
                active: this.$store.state.activeTab
            }
        },
        components: {
            [Tabbar.name]:Tabbar,
            [TabbarItem.name]:TabbarItem
        },
        computed: {
            activeNum: {
                get: function () {
                    return this.$store.state.activeTab;
                },
                set: function () {
                }
            }
        },
        methods: {
            ...mapActions([
                'changeTab'
            ]),
            onClickLeft() {
                this.$router.back();
            },
            moveTo(num) {
               switch (num){
                   case 0 : {
                       this.$router.push('/monitor/main');
                       break;
                   }
                   case 1 :{
                       this.$router.push('/control');
                       break;
                   }
                   case 2 :{
                       this.$router.push('/warning');
                       break;
                   }
                   case 3 :{
                       this.$router.push('/findings');
                       break;
                   }
                   case 4 :{
                       this.$router.push('/about');
                       break;
                   }
                   default: {
                       this.$router.push('/monitor/main');
                   }
               }
            }
        },watch: {
            active(val) {
                console.log('Foot bar:'+val);
                // return this.$store.state.activeTab;

            }
        }
    };
</script>
<style lang="scss">
   @import "../sass/variable";
  .foot-bar {
      .van-tabbar-item--active {
          color: $main-border-color;
      }
  }
</style>