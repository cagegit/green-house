<template>
        <div>
            <van-nav-bar
              class="top-nav-bar"
              title="修改密码"
              left-arrow
              @click-left="onClickLeft"/>
            <van-cell-group class="cell-group">
                <van-field class="input-sty" v-model="oldPassword" type="password" placeholder="请输入原密码" />
                <van-field class="input-sty" v-model="newPassword" type="password" placeholder="请输入新密码" />
                <van-field class="input-sty" v-model="sureNewPassword" type="password" placeholder="请确认新密码" />
                <van-field class="input-sty" v-model="sendMes" center clearable placeholder="请输入短信验证码">
                    <van-button slot="button" size="small" @click="sendPhoneMes()" type="primary">发送验证码</van-button>
                </van-field>
            </van-cell-group>
            <div class="sure-btn flex" @click="resetPass">确定</div>
            <FootBar :active="3"></FootBar>
        </div>
</template>
<script>
    import { NavBar, Field, CellGroup, Toast, Button } from 'vant'
    import FootBar from '@/components/FootBar'
    import { resetPassword, getPhoneCode } from '@/service';
    import MD5 from 'js-md5';
    export default {
        name: "ModifyPassword",
        components: {
            [NavBar.name]: NavBar,
            [Field.name]: Field,
            [CellGroup.name]: CellGroup,
            [Toast.name]: Toast,
            [Button.name]: Button,
            FootBar
        },
        data() {
            return {
                oldPassword:"",
                newPassword:"",
                sureNewPassword:"",
                sendMes:""
            }
        },
        methods:{
            onClickLeft(){
                this.$router.back();
            },
            resetPass(){
                const that = this;
                if(this.newPassword === this.sureNewPassword && this.sureNewPassword!=="" && this.sureNewPassword && this.sendMes){
                    resetPassword(MD5(this.oldPassword),MD5(this.newPassword),this.sendMes,this.$store.state.token).then(res=>{

                        if(res.data && res.data.code==1){
                            let userSave = localStorage.getItem("userAccount");
                            if(userSave != null){
                                localStorage.removeItem("userAccount")
                            }
                            Toast.success("修改成功");
                            setTimeout(function () {
                                that.$router.push("/login")
                            },2000)
                        }else{
                            Toast.fail("密码修改失败！");
                            setTimeout(function () {
                                that.$router.push("/login")
                            },2000)
                        }
                    })
                }else if(this.newPassword=="" || this.sureNewPassword==""){
                    Toast.fail('密码不能为空');
                }else if(this.sendMes==""){
                    Toast.fail('请输入验证码');
                }
                else{
                    Toast.fail('密码不一致');
                }
            },
            sendPhoneMes(){
                getPhoneCode(this.$store.state.user.phone).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
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
    .input-sty {
        line-height: 1.253333rem;
        font-size:0.4rem;
        color: #B2B2B2 !important;
        border-radius:0.266667rem;
        padding:0 0.533333rem 0 0.4rem;
        margin-bottom:0.6rem;
        height: 1.44rem;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
    }
    .cell-group{
        border-radius: 0.266667rem;
        padding: 0 0.8rem;
    }
    .van-cell-group{
        background: none;
    }
</style>