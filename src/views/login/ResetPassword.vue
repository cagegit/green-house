<template>
    <div class="">
        <HeadBar title="重置密码" link=""></HeadBar>
        <div class=" wrap">
            <van-cell-group>
                <van-field class="input-sty" v-model="password" type="password" placeholder="请输入新密码" />
                <van-field class="input-sty" v-model="surePassword" type="password" placeholder="请确认新密码" />
            </van-cell-group>
            <van-button class="next-step" @click="resetForgetPass">完成</van-button>
        </div>
    </div>
</template>
<script>
import { Field, CellGroup, Button, NavBar, Toast } from 'vant';
import HeadBar from '../../components/HeadBar';
import {forgetPassword} from '@/service';
import MD5 from 'js-md5';
export default {
    name: "ResetPassword",
    props:['phoneNumber','phoneCode'],
    components: {
        [CellGroup.name]: CellGroup,
        [Field.name]: Field,
        [Button.name]: Button,
        [NavBar.name]: NavBar,
        [Toast.name]: Toast,
        HeadBar
    },
    data() {
        return {
            password: "",
            surePassword: "",
        }
    },
    created: function() {

    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
        resetForgetPass(){
            var that = this;
            if(this.surePassword === this.password && this.password!="" && this.password){
                forgetPassword(this.phoneNumber,MD5(this.surePassword),this.phoneCode).then(res=>{
                    console.log("res:")
                    console.log(res)
                    if(res.data.code==1){
                        Toast.success(res.data.msg);
                        setTimeout(function () {
                            that.$router.push("/login")
                        },2000)
                    }else{
                        Toast.fail(res.data.msg);
                        setTimeout(function () {
                            that.$router.push("/login")
                        },2000)
                    }
                })
            }else if(this.password=="" || this.surePassword==""){

                Toast.fail('密码不能为空');
            }else{
                Toast.fail('密码不一致');
            }

        }
    },
    filters: {
        changePass(value) {
            if (!value) return ''
            let replace = "";
            for (let i = 0; i < value.length; i++) {
                replace += "*"
            }
            return replace;
        }
    }
}
</script>
<style lang="scss" scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrap {
    padding: 0 0.8rem;
    margin-top: 0.266667rem;
}

.input-sty {
    height: 1.653333rem;
    background: #FFFFFF;
    box-shadow: 0 0.08rem 0.133333rem 0 rgba(190, 190, 190, 0.20);
    border-radius: 0.266667rem;
    margin-bottom: 0.32rem;
    line-height: 1.253333rem;
}

.van-cell-group {
    background: none;
}

.next-step {
    background: rgba(68, 227, 168, 0.50);
    border-radius: 1.333333rem;
    width: 6.4rem;
    height: 1.173333rem;
    color: #ffffff;
    margin-top: 1.333333rem;
}
</style>