<template>
    <div>
        <transition name="fadeIn">
            <div class="logo-box" >
                <img src="@/assets/ad.jpg" alt="">
            </div>
        </transition>
    </div>
</template>
<script>
    export  default {
        name: 'Ad',
        data() {
            return {
            };
        },
        mounted() {
            setTimeout(() => {
                this.$router.push("/monitor/main");
            }, 3000);
        }
    }
</script>
<style lang="scss">
   /*.logo-box {*/
       /*width: 100vw;*/
       /*height: 100vh;*/
   /*}*/
   .logo-box {
       width: 100%;
       height: 100%;
       img {
           width: 100%;
           height: 100%;
       }
   }
</style>