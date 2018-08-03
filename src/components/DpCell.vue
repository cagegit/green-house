<template>
    <div class="dp-box">
        <img :src="src">
        <span>{{title}}</span>
        <div class="mark" v-if="isMark">
            <i class="mark-con"></i>
            <span>告警</span>
        </div>
    </div>
</template>
<script>
    export default  {
        props: ['title','src','isMark']
    }
</script>
<style lang="scss" scoped>
    .dp-box {
        background: #FFFFFF;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
        border-radius: 5PX;
        height: 60px;
        line-height: 60px;
        text-align: left;
        padding: 5px 10px;
        display: flex;
        flex: 1;
        align-items: center;
        position: relative;
        margin-bottom: 10px;
        overflow: hidden;
        img {
            width: 40px;
            height: 40px;
            display: inline-block;
            border: 0;
        }
        span {
            font-size: 16px;
            color: #202323;
            padding-left: 10px;
        }
    }
    .mark {
        position: absolute;
        right: -35px;
        top: -35px;
        transform: rotateZ(45deg);
        .mark-con {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 30px 30px 30px;
            border-color: transparent transparent #FD5973 transparent;
        }
        span {
            position: absolute;
            top: 28px;
            right:18px;
            font-size: 12px;
            display: inline-block;
            color: #FFF;
        }
    }
</style>