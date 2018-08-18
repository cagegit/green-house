<template>
    <van-tabbar v-model="activeNum" class="foot-bar">
        <van-tabbar-item icon="shop" @click.native="moveTo(0)">
            <span>监测</span>
            <img slot="icon" slot-scope="props" :src="props.active ? tab.jc_0 : tab.jc_1"/>
        </van-tabbar-item>
        <van-tabbar-item icon="chat" @click.native="moveTo(1)">
            <span>控制</span>
            <img slot="icon" slot-scope="props" :src="props.active ? tab.kz_0 : tab.kz_1"/>
        </van-tabbar-item>
        <van-tabbar-item icon="chat" dot @click.native="moveTo(2)">
            <span>告警</span>
            <img slot="icon" slot-scope="props" :src="props.active ? tab.gj_0 : tab.gj_1"/>
        </van-tabbar-item>
        <van-tabbar-item icon="chat" @click.native="moveTo(3)">
            <span>发现</span>
            <img slot="icon" slot-scope="props" :src="props.active ? tab.fx_0 : tab.fx_1"/>
        </van-tabbar-item>
        <van-tabbar-item icon="chat" @click.native="moveTo(4)">
            <span>我</span>
            <img slot="icon" slot-scope="props" :src="props.active ? tab.me_0 : tab.me_1"/>
        </van-tabbar-item>
    </van-tabbar>
</template>
<script>
    import { Tabbar, TabbarItem} from 'vant'
    import { mapActions} from 'vuex';
    export default {
        name: "FootBar",
        data(){
            return {
                active: this.$store.state.activeTab,
                tab: {
                    jc_0: require('@/assets/img/tab/nav1-press@2x.png'),
                    jc_1: require('@/assets/img/tab/nav1-normal@2x.png'),
                    kz_0: require('@/assets/img/tab/nav2-press@2x.png'),
                    kz_1: require('@/assets/img/tab/nav2-normal@2x.png'),
                    gj_0: require('@/assets/img/tab/nav3-press@2x.png'),
                    gj_1: require('@/assets/img/tab/nav3-normal@2x.png'),
                    fx_0: require('@/assets/img/tab/nav4-press@2x.png'),
                    fx_1: require('@/assets/img/tab/nav4-normal@2x.png'),
                    me_0: require('@/assets/img/tab/nav5-press@2x.png'),
                    me_1: require('@/assets/img/tab/nav5-normal@2x.png'),
                }
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