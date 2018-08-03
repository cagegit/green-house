<template>
    <div class="monitor">
        <HeadBar title="历史曲线" link="/monitor/main"></HeadBar>
        <DpTab :active="3"></DpTab>
    </div>
</template>
<script>
    import HeadBar from '../../components/HeadBar'
    import DpTab from '../../components/DpTab'
    export default {
        name: 'Lsqx',
        components: {
            HeadBar,
            DpTab
        }

    }
</script>
<style lang="scss">
</style>