<template>
    <van-nav-bar
            :title="title"
            :right-text="rightTxt"
            :left-arrow="left"
            @click-left="onClickLeft"
            @click-right="onClickRight"
    />
</template>
<script>
    import { NavBar } from 'vant';
    export default {
        name: "backHeader",
         props: {  //["title","right","link",'isLeft']
             title: {  // 必须提供字段
                required: true
             },
             link: {   // 可选字段，有默认值
                 required: true
             },
             left: {   // 可选字段，有默认值
                default: true
             },
             rightTxt: {   // 可选字段，有默认值
                 default: ''
             }
        },
        components: {
            [NavBar.name]: NavBar
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            onClickRight(){
                this.$router.push(this.link);
            }
        }
    };
</script>
<style>

</style>