<template>
    <v-touch v-on:swiperight="onSwipeRight" tag="div">
        <div>
            <van-nav-bar
                    class="top-nav-bar"
                    title="关于"
                    left-arrow
                    @click-left="onClickLeft"/>
            <div class="content-warp">
                <div class="logo-box flex">
                    <img src="@/assets/img/logo-ico.png" alt="" class="logo-ico">
                    <div class="logo-txt">康吉物联 V1.1.0</div>
                </div>
                <div class="qrcode flex">
                    <img class="codeImg" :src="qrcodeUrl" alt=""/>
                </div>
                <div class="contact-way">
                    <div class="contact-item flex">
                        <div class="item-value" @click="openWeb()">
                            {{companyWebUrl}}
                        </div>
                        <div class="copyright">
                            Copyright©北京康吉讯通科技有限公司
                        </div>
                    </div>
                </div>
                <div class="return-btn flex" @click="logOut()">
                    <span >退出</span>
                    <img src="@/assets/img/return-press.png" alt="">
                </div>
            </div>
        </div>
    </v-touch>
</template>
<script>
    import { NavBar } from 'vant'

    export default {
        name: "AboutMe",
        components: {
            [NavBar.name]: NavBar,
        },
        props:['qrcode'],
        data() {
            return {
                areaLis:"",
                show:false,
                userAddr:"辽宁省沈阳市皇姑屯",
                companyWebUrl:'',
                qrcodeUrl:""
            }
        },
        created: function () {
            this.companyWebUrl = this.$store.state.aboutMes.websate;
            this.qrcodeUrl = this.qrcode
        },
        methods:{
            onClickLeft(){
                this.$router.back();
            },
            openWeb() {
                window.open('http://'+this.companyWebUrl,'_blank', 'location=yes');
            },
            logOut() {
                localStorage.clear();
               this.$router.replace('/login');
            },
            onSwipeRight() {
                this.$router.go(-1);
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
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
        border-radius: 0.266667rem;
        padding: 20px 5px;
    }
    .contact-item{
        height:1.653333rem;
        flex-direction: column;
        font-size:0.4rem;
    }
    .item-name{
        color:#4B4A4A;
        line-height: 1.5;
    }
    .item-value{
        color:#B2B2B2;
        line-height: 1.5;
    }
    .copyright{
        color: #999999;
        line-height: 3;
    }
    .codeImg{
        width: 150px;
        height: 150px;
        margin-bottom:10px;
    }
    .return-btn{
        margin-top:1.6rem;
        margin-bottom: 100px;
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