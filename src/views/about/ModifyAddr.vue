<template>
    <div class="content-warp">
        <van-nav-bar 
          class="top-nav-bar"
          title="修改地址"
          left-arrow
          @click-left="onClickLeft"
        />
        <div class="contact-way">
            <div class="contact-item flex">
                <van-field v-model="modifyAddr" clearable class="item-name flex" />
            </div>
        </div>
        <div class="flex opea-btn">
            <van-button type="warning" class="sure-btn" @click="sureModify">确定</van-button>
            <van-button type="danger" class="cancle-btn" @click="onClickLeft">取消</van-button> 
        </div>
    </div>
</template>
<script>
    import { NavBar, Field, Button } from 'vant'
    import FootBar from '@/components/FootBar'
    import { modifyAddrAndTel } from '@/service';

    export default {
        name: "ModifyAddr",
        props:['name'],
        components: {
            [NavBar.name]: NavBar,
            [Field.name]: Field,
            [Button.name]: Button,
            FootBar
        },
        data() {
            return {
                modifyAddr:"",
                userName:""
            }
        },
        mounted() {
            this.userName = this.$store.state.user.name;
            console.log(this.userName)
            this.modifyAddr = this.name;
        },
        created: function () {
            
        },
        methods:{
            onClickLeft(){
                this.$router.back();
            },
            sureModify(){
                var that = this;
                modifyAddrAndTel(this.$store.state.token,this.userName,this.modifyAddr,false).then((res)=>{
                    if(res.data.code==1){
                        that.$store.state.user.address=that.modifyAddr;
                        that.$router.back();
                    }
                })
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
    .opea-btn{
        width:100%;
        justify-content:space-between;
        padding:0 0.2rem;
        margin-top:1rem;

    }
    .sure-btn, .cancle-btn{
        width: 3.4rem;
        height: 1.173333rem;
        background: #44e3a8;
        border-radius: 0.586667rem;
        font-size: 0.453333rem;
        color: #FFFFFF;
        margin: 2.026667rem auto 0;
        border:none;
    }

</style>