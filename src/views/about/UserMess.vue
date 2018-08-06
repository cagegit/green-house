<template>
    <div class="content-warp">
        <div class="top-avater flex">
            <div class="name-mes">
                <div class="user-name flex">李宇航</div>
                <div class="user-id flex">
                    <img src="@/assets/img/my/user-id-ico.png">
                    <div>130***********2235</div>
                </div>
            </div>
            <div class="user-avater">
                <img src="@/assets/img/Bitmap.png">
            </div>
        </div>
        <div class="contact-way">
            <div class="contact-item flex">
                <div class="item-name flex">
                    <img src="@/assets/img/my/user-name.png" alt="">
                    <span>用户名</span>
                </div>
                <div class="item-value">
                    189****8721
                </div>
            </div>
            <div class="contact-item flex">
                <div class="item-name flex">
                    <img src="@/assets/img/my/tele-ico.png" alt="">
                    <span>其它联系方式</span>
                </div>
                <div class="item-value">
                    156****2557
                </div>
            </div>
            <div class="contact-item flex">
                <div class="item-name flex">
                    <img src="@/assets/img/my/add-ico.png" alt="">
                    <span>地址</span>
                </div>
                <div class="item-value flex">
                    辽宁省沈阳市皇姑屯
                    <img class="add-img" src="@/assets/img/ion-chevron.png" alt="">
                </div>
            </div>
        </div>
        <div class="contact-way">
            <div class="contact-item flex">
                <div class="item-name flex">
                    <img src="@/assets/img/my/planet.png" alt="">
                    <span>主要作物品类</span>
                </div>
                <div class="item-value flex">
                    西红柿、黄瓜……
                    <img class="add-img" src="@/assets/img/ion-chevron.png" alt="">
                </div>
            </div>
        </div>
        <div class="contact-way">
            <div class="contact-item flex">
                <div class="item-name flex">
                    <img src="@/assets/img/my/lock.png" alt="">
                    <span>修改密码</span>
                </div>
                <div class="item-value flex">
                    <img class="add-img" src="@/assets/img/ion-chevron.png" alt="">
                </div>
            </div>
        </div>
        <div class="contact-way">
            <div class="contact-item flex">
                <div class="item-name flex">
                    <img src="@/assets/img/my/about.png" alt="">
                    <span>关于</span>
                </div>
                <div class="item-value flex">
                    <img class="add-img" src="@/assets/img/ion-chevron.png" alt="">
                </div>
            </div>
        </div>
        <div class="return-btn flex">
            <span >退出</span>
            <img src="@/assets/img/return-press.png" alt="">
        </div>
        <van-actionsheet v-model="show" :actions="actions" cancel-text="取消"/>
            <van-area :area-list="areaList" />
        </van-actionsheet>
        <FootBar :active="3"></FootBar>
    </div>
</template>
<script>
    import { Area,Actionsheet } from 'vant'
    import FootBar from '@/components/FootBar'
    import areaList from '@/plugins/area.js'

    export default {
        name: "Findings",
        components: {
            [Area.name]: Area,
            [Actionsheet.name]: Actionsheet,
            FootBar
        },
        data() {
            return {
                areaLis:"",
                show:true,
                actions: [
                            {
                              name: '选项',
                              callback: this.onClick
                            },
                            {
                              name: '选项',
                              subname: '描述信息'
                            },
                            {
                              name: '选项',
                              loading: true
                            },
                            {
                              name: '禁用选项',
                              disabled: true
                            }
                        ]
            }
        },
        created: function () {
            this.areaList = areaList
        },
        methods:{
            onClick(item) {
                Toast(item.name);
            }
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
        height:1.6rem;
        justify-content:space-between;
        margin:0.4rem 0 0.6rem 0;
        .name-mes{
            width:4.666667rem;
            .user-name{
                color:#202323;
                font-size:0.64rem;
                margin-bottom:0.4rem;
                justify-content:flex-start;
            }
            .user-id{
                width:100%;
                height:0.56rem;
                justify-content:flex-start;
                img{
                    display:block;
                    width:0.56rem;
                    height:0.4rem;
                    margin-right:0.266667rem;
                }
            }
        }
        .user-avater{
            width:1.6rem;
            height:1.6rem;
            margin-right:0.8rem;
            img{
                width:1.6rem;
                height:1.6rem;
                border-radius:50%;
            }
        }
    }
    .contact-way{
        background:#fff;
        border-radius:0.266667rem;
        padding:0 0.533333rem 0 0.4rem;
        margin-bottom:0.4rem;
    }
    .contact-item{
        height:1.44rem;
        justify-content:space-between;
        font-size:0.4rem;
    }
    .item-name{
        color:#4B4A4A;
        img{
            width:0.533333rem;
            height:0.533333rem;
            margin-right:0.293333rem;
        }
    }
    .item-value{
        color:#B2B2B2;
    }
    .add-img{
        display:inline-block;
        width:0.426667rem;
        height:0.48rem;
        margin-left:0.2rem;
    }
    .return-btn{
        margin-top:1.6rem;
        position:relative;
        img{
            width:6.4rem;
            height:1.173333rem;
        }
        span{
            position:absolute;
            left:46%;
            top:0.266667rem;
            font-size:0.453333rem;
            color:#fff;
        }
    }

</style>