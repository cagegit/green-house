<template>
    <div class="content-warp">
        <div class="top-avater flex">
            <div class="name-mes">
                <div class="user-name">李宇航</div>
                <div class="user-id flex">
                    <img src="@/assets/img/my/user-id-ico.png">
                    <div>130***********2235</div>
                </div>
            </div>
            <div class="user-avater">
                <img src="@/assets/img/my/user-id-ico.png">
            </div>
        </div>
        <FootBar :active="3"></FootBar>
    </div>
</template>
<script>
    import { Tab, Tabs } from 'vant'
    import FootBar from '@/components/FootBar'

    export default {
        name: "Findings",
        components: {
            [Tabs.name]: Tabs,
            [Tab.name]: Tab,
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

    .top-avater{
        width:100%;
        height:1.6rem;
        justify-content:space-between;
        .name-mes{
            width:4.666667rem;
            display:flex;
            justify-content:flex-start;
            .user-name{
                color:#202323;
                font-size:0.64rem;
                margin-bottom:0.4rem;
            }
            .user-id{
                width:100%;
                height:0.56rem;
                img{
                    display:block;
                    width:0.56rem;
                    height:0.4rem;
                }
            }
        }
        .user-avater{
            width:1.6rem;
            height:1.6rem;
            img{
                width:1.6rem;
                height:1.6rem;
                border-radius:50%;
            }
        }
    }

</style>