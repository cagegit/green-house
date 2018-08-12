<template>
    <div class="wrap flex">
    	<!-- <van-cell-group>
		  <van-field
		    v-model="username"
		    label="用户名"
		    placeholder="请输入用户名"
		  />

		  <van-field
		    v-model="password"
		    type="password"
		    label="密码"
		    placeholder="请输入密码"
		  />
		</van-cell-group> -->
		<div class="welcom-top">
			WELCOME
		</div>
		<div class="welcom">
			欢迎来到紫藤农业
		</div>
		<div class="login-area">
			<div class="user-name">
				<div>
					账户
				</div>
				<van-cell-group>
					<van-field
		    v-model="username"
		    placeholder="请输入用户名"
		  />
				</van-cell-group>
				
			</div>
		</div>
    </div>
</template>

<script>
	import { Field,CellGroup } from 'vant';
    export default {
        name: "Login",
        data(){
        	return{
        		username:"",
        		password:""
        	}
        },
        components: {
            Field,
            [CellGroup.name]:CellGroup,
            [Field.name]:Field,
        },
    }
</script>

<style scoped>
.flex{
	display:flex;
	justify-content:flex-start;
	align-items:center;
	flex-wrap:wrap;
}
.wrap{
	padding:0 0.8rem;
}
.welcom-top{
	margin-top:1.48rem;
	font-size: 0.32rem;
	line-height:0.44rem;
	color: #202323;
	width:100%;
	text-align:left;
}
.welcom{
	font-size: 0.64rem;
	line-height:0.893333rem;
	color: #202323;
	margin:0.106667rem 0 0.933333rem 0;
	width:100%;
	text-align:left;
}
.login-area{
	height:5.653333rem;
	background: #FFFFFF;
	box-shadow: 0 0.16rem 0.32rem 0 rgba(84,160,156,0.09);
	border-radius: 0.213333rem;
	padding:0.746667rem 0.72rem 0;
	width:100%;
	text-align:left;
}
.user-name{
	font-size: 0.373333rem;
	margin-bottom:0.213333rem;
}
</style>