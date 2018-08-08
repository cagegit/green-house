<template>
    <div class="content-warp">
       waring
        <FootBar></FootBar>
    </div>
</template>
<script>
    import FootBar from '@/components/FootBar'
    export default {
        name: "Warning",
        components: {
            FootBar
        },
        data() {
            return {
              
            }
        },
        methods:{
        }
    }
</script>
<style lang="scss" scoped>
    .flex{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .content-warp {
        padding: 0 0.533333rem;
        margin-bottom:1.733333rem;
    }

</style>