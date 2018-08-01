<template>
    <van-tabbar v-model="active">
        <van-tabbar-item icon="shop">监测</van-tabbar-item>
        <van-tabbar-item icon="chat">控制</van-tabbar-item>
        <van-tabbar-item icon="records" dot>告警</van-tabbar-item>
        <van-tabbar-item icon="gold-coin">发现</van-tabbar-item>
        <van-tabbar-item icon="gold-coin">我</van-tabbar-item>
    </van-tabbar>
</template>
<script>
    import { Tabbar, TabbarItem} from 'vant'
    export default {
        name: "FootBar",
        props: {
            active: {
                required: true
            }
        },
        components: {
            [Tabbar.name]:Tabbar,
            [TabbarItem.name]:TabbarItem
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            }
        }
    };
</script>
<style>

</style>