<template>
    <div class="login-main">
        <div class="wrap flex">
            <div class="welcom-top">
                WELCOME
            </div>
            <div class="welcom">
                欢迎来到G物联
            </div>
            <div class="login-area">
                <van-field class="login-field" label="账户" v-model="username" placeholder="请输入用户名" />
                <van-field label="密码" v-model="password" class="login-field pass-input" type="password" placeholder="请输入密码" />
            </div>
            <div class="forget flex" @click="toFindPass()">忘记密码？</div>
            <div class="flex login-btn-bottom">
                <!--<router-link to="/monitor/main"></router-link>-->
                <van-button type="primary" class="login-btn"  @click="login()">登录</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Field, CellGroup,Button,Toast } from 'vant';
import {loginIn,getWarings,getRepeateWaringList,getPicRelations} from '@/service';
import MD5 from 'js-md5';
let observe$;
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
    created(){
        let userSave = localStorage.getItem("userAccount");
        if(userSave) {
            let user = JSON.parse(userSave);
            this.username = user.username;
            this.password = user.password;
            this.login()
        }
    },
    methods: {
        async login() {
            try {
                const res = await loginIn(this.username, this.toMd5(this.password));
                if(res && res.data && res.data.code===1) {
                    Toast.success({
                        message: '登录成功',
                        duration: 500
                    });
                    this.$store.commit('setToken', res.data.token);
                    if(res.data.user && res.data.user.length>0) {
                        this.$store.commit('setUser',res.data.user[0]);
                    }
                    this.getWaringCount();
                    this.getPicRelations(res.data.token);
                    let userAccount = {
                        "username":this.username,
                        "password":this.password
                    };
                    const ua=JSON.stringify(userAccount);
                    localStorage.setItem("userAccount",ua);
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
        },
        async toFindPass(){
            // console.log("gggggggggggg");
            this.$router.push('/login/findPassword');
        },
        getWaringCount() {
            const {user} = this.$store.state;
            if(user.corp_id === undefined) {
               return;
            }
            getWarings('1',user.corp_id,'1','2018-09-01','').then(({data}) => {
                // console.log(data);
                if(data && data.status ===1) {
                    if(data.results && data.results.length>0) {
                        let warnings = 0;
                        data.results.forEach(val => {
                            if(val && val.count) {
                                warnings = warnings+ val.count;
                            }
                        });
                        this.$store.commit('setWarning',warnings);
                    }
                }
            }).catch(err => {
                console.log(err);
            });
            if(observe$) {
                observe$.unsubscribe();
            }
            observe$ = getRepeateWaringList(user.corp_id).subscribe(res => {
                // console.log(res);
                if(res && res.status ===1) {
                    if(res.results && res.results.length>0) {
                        let warnings = 0;
                        res.results.forEach(val => {
                            if(val && val.count) {
                                warnings = warnings+ val.count;
                            }
                        });
                        this.$store.commit('setWarning',warnings);
                    }
                }
            },err => {
                console.log(err);
            });
        },
        getPicRelations(token) {
           getPicRelations(token).then(res => {
               if(res && res.data && Array.isArray(res.data.result)) {
                   // console.log(res.data);
                   this.$store.commit('setRelations',res.data.result);
                   // console.log(this.$store.state.relations);
               }
           },err => {
               console.log(err);
           });
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
.login-main {
    height: 100%;
    background: url("../../assets/logo_bg.png") no-repeat center bottom;
    background-size: contain;
}
.wrap {
    padding: 0 0.8rem;
    height: auto;
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
    font-weight:700;
}
.login-area {
    font-size: 0.4rem;
	color: #777777;
    text-align:right;
    width: 100%;
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
.login-field{
    background: #FFFFFF;
    box-shadow: 0 0.16rem 0.32rem 0 rgba(84,160,156,0.09);
    border-radius: 0.213333rem;
    margin-bottom:0.48rem;
    padding: 16px 0;
    text-align:center;
}
.van-cell__title{
    width:0.533333rem !important;
    flex:auto;
}
.van-cell__value input{
    color:#D7D7D7;
}
</style>