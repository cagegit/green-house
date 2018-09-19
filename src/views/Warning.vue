<template>
    <div>
        <HeadBar title="告警" :left="false" link=""></HeadBar>
        <div class="content-warp">
            <div class="dp-tab2" style="margin-top: 0">
                <button type="button"  v-for="tab in tabs"
                        :key="tab.id"
                        @click="switchBtn(tab.id)"
                        :class="{'active':currentTab===tab.id}">{{ tab.name }}</button>
            </div>
            <router-view></router-view>
        </div>
        <FootBar :active="3"></FootBar>
    </div>
</template>
<script>
    import FootBar from '../components/FootBar';
    import HeadBar from '../components/HeadBar';
    export default {
        name: "Warning",
         components: {
            FootBar,
            HeadBar
        },
        data() {
            return {
               currentTab: 0,
               tabs: [{id:0,name:'当前警告'}, {id:1,name:'历史警告'}]
            }
        },
        methods:{
            switchBtn(num) {
                this.currentTab = num;
                if(num ===1) {
                    this.$router.push({name:'historywarn'});
                } else {
                    this.$router.push({name:'currentwarn'});
                }
            }
        },
        beforeRouteUpdate  (to, from, next) {
            if(to.name==='historywarn') {
                this.currentTab = 1;
            } else {
                this.currentTab = 0;
            }
            next();
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
        padding: 0 10px;
        margin-bottom:1.733333rem;
    }
    
</style>