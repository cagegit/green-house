<template>
    <div class="monitor">
        <HeadBar title="实时监测" link="/monitor/main"></HeadBar>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="shop">实时监测</van-tabbar-item>
            <van-tabbar-item icon="chat" dot>设备控制</van-tabbar-item>
            <van-tabbar-item icon="records" info="5">历史曲线</van-tabbar-item>
            <van-tabbar-item icon="gold-coin" info="20">设施信息</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
    import { Tabbar, TabbarItem} from 'vant'
    import HeadBar from '../../components/HeadBar'
    export default {
        name: 'Ssjc',
        components: {
            [Tabbar.name]:Tabbar,
            [TabbarItem.name]:TabbarItem,
            HeadBar
        },
        data() {
            return {
                active: 0
            }
        }
    }
</script>
<style lang="scss">
</style>