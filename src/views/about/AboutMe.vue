<template>
    <div class="content-warp">
        <van-nav-bar 
          class="top-nav-bar"
          title="关于"
          left-arrow
          @click-left="onClickLeft"
        />
        <div class="logo-box flex">
            <img src="@/assets/img/logo-ico.png" alt="" class="logo-ico">
            <div class="logo-txt">康吉物联 V1.1.0</div>
        </div>
        <div class="contact-way">
            <div class="contact-item flex">
                <div class="item-name flex">
                    <span>关于</span>
                </div>
                <div class="item-value flex">
                    http://zitengnongye.com/
                </div>
            </div>
        </div>
        <div class="contact-way">
            <div class="contact-item flex">
                <div class="item-name flex">
                    <span>热线</span>
                </div>
                <div class="item-value flex">
                    400-960-0727
                </div>
            </div>
        </div>
        <div class="flex">
            <div class="copyright">
                版权所有copyright(c)北京康吉讯通科技有限公司
            </div>
        </div>
    </div>
</template>
<script>
    import { NavBar } from 'vant'

    export default {
        name: "AboutMe",
        components: {
            [NavBar.name]: NavBar,
        },
        data() {
            return {
                areaLis:"",
                show:false,
                userAddr:"辽宁省沈阳市皇姑屯",
            }
        },
        created: function () {
            
        },
        methods:{
            onClickLeft(){
                this.$router.back();
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
    .top-nav-bar{
        background:#F5F7F9;
        margin-bottom:0.666667rem;

    }
    .van-nav-bar .van-icon{
        color:#4B4A4A !important;
        font-size:0.533333rem !important;
        font-weight:600 !important;
    }
    .van-nav-bar__title{
        font-size: 34px;
        color: #202323;
        font-weight:800;
    }
    .logo-box{
        margin:0.8rem auto;
        flex-wrap:wrap;
        .logo-ico{
            width:2.453333rem;
            height:2.453333rem;
            margin-bottom:0.4rem;
        }
        .logo-txt{
            color:#999999;
            font-size:0.426667rem;
            height:0.6rem;
            width:100%
        }
    }
    .contact-way{
        background:#fff;
        padding:0 0.533333rem 0 0.4rem;
        margin-bottom:0.4rem;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
        border-radius: 0.266667rem;
    }
    .contact-item{
        height:1.653333rem;
        justify-content:space-between;
        font-size:0.4rem;
    }
    .item-name{
        color:#4B4A4A;
    }
    .item-value{
        color:#B2B2B2;
        height: 1.44rem;
    }
    .copyright{
        position:absolute;
        bottom:0.64rem;
        font-size: 0.346667rem;
        color: #999999;
        letter-spacing: 1.0.017333rem;
        padding: 0 !important;
    }
</style>