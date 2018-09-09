<template>
    <div class="wrap flex">
        <div class="welcom-top">
            WELCOME
        </div>
        <div class="welcom">
            欢迎来到康吉物联
        </div>
        <div class="login-area">
            <div>
                账户
            </div>
            <van-field v-model="username" placeholder="请输入用户名" />
            <div class="pass-txt">
                密码
            </div>
            <van-field v-model="password" class="pass-input" type="password" placeholder="请输入密码" />
        </div>

            <router-link to="/login/findPassword" class="forget flex"><div>忘记密码？</div></router-link>

        <div class="flex login-btn-bottom">
            <!--<router-link to="/monitor/main"></router-link>-->
            <van-button type="primary" class="login-btn"  @click="login()">登录</van-button>
        </div>
    </div>
</template>
<script>
import { Field, CellGroup,Button,Toast } from 'vant';
import {loginIn} from '@/service';
import MD5 from 'js-md5';
export default {
    name: "LoginPage",
    data() {
        return {
            username: "",
            password: ""
        }
    },
    components: {
        Field,
        [CellGroup.name]: CellGroup,
        [Field.name]: Field,
        [Button.name]: Button,
        [Toast.name]: Toast
    },
    methods: {
        async login() {
            try {
                
                const res = await loginIn(this.username, this.toMd5(this.password));
                if(res.data.code===1) {
                    Toast.success({
                        message: '登录成功',
                        duration: 500
                    });
                    this.$store.commit('setToken', res.data.token);
                    if(res.data.user && res.data.user.length>0) {
                        this.$store.commit('setUser',res.data.user[0]);
                    }
                    localStorage.setItem('token',res.data.token);
                    this.$router.push('/monitor/main');
                } else {
                    Toast.success('登录失败');
                }
            }catch (err) {
                console.log(err);
                Toast.success('网络错误');
            }
        },
        toMd5(str) {
            return MD5(str);
        }
    }
}
</script>
<style scoped>
.flex {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
}

.wrap {
    padding: 0 0.8rem;
}

.welcom-top {
    margin-top: 1.48rem;
    font-size: 0.32rem;
    line-height: 0.44rem;
    color: #202323;
    width: 100%;
    text-align: left;
}

.welcom {
    font-size: 0.64rem;
    line-height: 0.893333rem;
    color: #202323;
    margin: 0.106667rem 0 0.933333rem 0;
    width: 100%;
    text-align: left;
}

.login-area {
    height: 5.653333rem;
    background: #FFFFFF;
    box-shadow: 0 0.16rem 0.32rem 0 rgba(84, 160, 156, 0.09);
    border-radius: 0.213333rem;
    padding: 0.746667rem 0.72rem 0;
    width: 100%;
    text-align: left;
    font-size: 0.373333rem;
	color: #777777;
}

.pass-txt{
	margin-top:0.986667rem;
}
.van-cell::after {
    border-bottom-width: 0.026667rem !important;
    left: 0.4rem;
    right: 0;
    width: auto;
    -webkit-transform: scale(1,.5);
    transform: scale(1,.5);
}
.forget{
	font-size: 0.426667rem;
	color: #B7C1CB;
	justify-content:flex-end;
	width:100%;
	margin-top:0.373333rem;
    float:right;
}
.login-btn-bottom{
	width:100%;
	justify-content:center;
	margin-top:1.466667rem;
}
.login-btn{
	width:6.4rem;
	height:1.173333rem;
	border-radius:1.173333rem;
	background:#44e3a8;
	font-size: 0.426667rem;
	border:none;
}
</style>