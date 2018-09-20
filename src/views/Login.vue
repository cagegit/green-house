<template>
    <transition name="slide-left">
        <router-view class="child-view"></router-view>
    </transition>
</template>
<script>
import { Field, CellGroup,Button } from 'vant';
export default {
    name: "Login",
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
    },
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