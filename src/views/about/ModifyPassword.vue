<template>
    <div class="content-warp">
        <van-nav-bar 
          class="top-nav-bar"
          title="修改密码"
          left-arrow
          @click-left="onClickLeft"
        />
        <div class="contact-way">
            <div class="contact-item flex">
                <input type="" name="" v-model="oldPassword" placeholder="请输入原密码" class="item-name flex">
                <div class="item-value flex">
                    <img class="add-img" src="@/assets/img/ion-chevron.png" alt="">
                </div>
            </div>
        </div>
        <div class="contact-way">
            <div class="contact-item flex">
                <input type="" name="" v-model="surePassword" placeholder="请输入新密码" class="item-name flex">
                <div class="item-value flex">
                    <img class="add-img" src="@/assets/img/ion-chevron.png" alt="">
                </div>
            </div>
        </div>
        <div class="contact-way">
            <div class="contact-item flex">
                <input type="" name="" v-model="reSurePassword"  placeholder="请确认新密码" class="item-name flex">
                <div class="item-value flex">
                    <img class="add-img" src="@/assets/img/ion-chevron.png" alt="">
                </div>
            </div>
        </div>
        <div class="sure-btn flex" @click="onClickLeft">确定</div>
        <FootBar :active="3"></FootBar>
    </div>
</template>
<script>
    import { NavBar } from 'vant'
    import FootBar from '@/components/FootBar'

    export default {
        name: "ModifyPassword",
        components: {
            [NavBar.name]: NavBar,
            FootBar
        },
        data() {
            return {
                oldPassword:"",
                surePassword:"",
                reSurePassword:""
            }
        },
        created: function () {
            
        },
        methods:{
            onClickLeft(){
                this.$router.back();
            }
        },
        filters: {
          changePass(value) {
            if (!value) return ''
            let replace="";
            for(let i=0;i<value.length;i++){
                replace +="*" 
            }
            return replace;
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
    .contact-way{
        background:#fff;
        border-radius:0.266667rem;
        padding:0 0.533333rem 0 0.4rem;
        margin-bottom:0.4rem;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
    }
    .contact-item{
        height:1.44rem;
        justify-content:space-between;
        font-size:0.4rem;
        color: #B2B2B2 !important;
    }
    .item-name{
        font-size: 0.426667rem;
        color: #B2B2B2 !important;
    }
    .item-value{
        color:#B2B2B2;
        height: 1.44rem;
    }
    .add-img{
        display:inline-block;
        width:0.426667rem;
        height:0.48rem;
        margin-left:0.2rem;
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
    .sure-btn{
        width:6.4rem;
        height:1.173333rem;
        background:#44e3a8;
        border-radius:0.586667rem;
        font-size: 0.453333rem;
        color: #FFFFFF;
        margin:2.026667rem auto 0;
    }
</style>