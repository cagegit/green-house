<template>
    <div class="content-warp">
        <div class="top-avater flex">
            <div class="name-mes">
                <div class="user-name flex">{{user.name}}</div>
                <!-- <div class="user-id flex">
                    <img src="@/assets/img/my/user-id-ico.png">
                    <div>{{user.phone}}</div>
                </div> -->
            </div>
            <div class="user-avater">
                <img src="@/assets/img/Bitmap.png">
            </div>
        </div>
        <div class="contact-way">
            <div class="contact-item flex">
                <div class="item-name flex">
                    <img src="@/assets/img/my/user-name.png" alt="">
                    <span>用户名</span>
                </div>
                <div class="item-value flex">
                    {{user.name}}
                </div>
            </div>
            <div class="contact-item flex">
                <div class="item-name flex">
                    <img src="@/assets/img/my/tele-ico.png" alt="">
                    <span>其它联系方式</span>
                </div>
                <div class="item-value flex">
                    {{user.phone}}
                </div>
            </div>
            <div class="contact-item flex">
                <div class="item-name flex">
                    <img src="@/assets/img/my/add-ico.png" alt="">
                    <span>地址</span>
                </div>
                <div class="item-value flex" @click="chooseAddr">
                    {{userAddr}}
                    <img class="add-img" src="@/assets/img/ion-chevron.png" alt="">
                </div>
            </div>
        </div>
        <!--<div class="contact-way">-->
            <!--<div class="contact-item flex">-->
                <!--<div class="item-name flex">-->
                    <!--<img src="@/assets/img/my/planet.png" alt="">-->
                    <!--<span>主要作物品类</span>-->
                <!--</div>-->
                <!--<div class="item-value flex">-->
                    <!--西红柿、黄瓜……-->
                    <!--<img class="add-img" src="@/assets/img/ion-chevron.png" alt="">-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <div class="contact-way">
            <router-link to="/about/modifypassword">
                <div class="contact-item flex">
                    <div class="item-name flex">
                        <img src="@/assets/img/my/lock.png" alt="">
                        <span>修改密码</span>
                    </div>
                    <div class="item-value flex">
                        <img class="add-img" src="@/assets/img/ion-chevron.png" alt="">
                    </div>
                </div>
            </router-link>
            
        </div>
        <div class="contact-way">
            <div class="contact-item flex">
                <div class="item-name flex">
                    <img src="@/assets/img/my/tele-ico.png" alt="">
                    <span>客服电话</span>
                </div>
                <div class="item-value flex">
                    400-960-0727
                </div>
            </div>
        </div>
        <div class="contact-way">
            <router-link to="/about/aboutme">
                <div class="contact-item flex">
                    <div class="item-name flex">
                        <img src="@/assets/img/my/about.png" alt="">
                        <span>关于</span>
                    </div>
                    <div class="item-value flex">
                        <img class="add-img" src="@/assets/img/ion-chevron.png" alt="">
                    </div>
                </div>
            </router-link>
        </div>
        <div class="return-btn flex" @click="logOut()">
            <span >退出</span>
            <img src="@/assets/img/return-press.png" alt="">
        </div>
        <van-popup v-model="show" position="bottom">
            <van-area :area-list="areaList" @confirm="addrSure" @cancel="addrCancle"/>
        </van-popup>
        <FootBar :active="3"></FootBar>
    </div>
</template>
<script>
    import { Area,Popup } from 'vant'
    import FootBar from '@/components/FootBar'
    import areaList from '@/plugins/area.js'

    export default {
        name: "Findings",
        components: {
            [Area.name]: Area,
            [Popup.name]: Popup,
            FootBar
        },
        data() {
            return {
                user: {
                    name: '李宇航',
                    phone: '156****2557'
                },
                areaLis:"",
                show:false,
                userAddr:"",
            }
        },
        created: function () {
            this.areaList = areaList;
        },
        mounted() {
            console.log(this.$store.state.user);
            if(JSON.stringify(this.$store.state.user)!=='{}') {
                this.user = Object.assign({},this.$store.state.user);
                if(typeof(this.$store.state.user.address)!="undefined" && typeof(this.$store.state.user.address)!="null"){
                    this.userAddr = this.$store.state.user.address

                }
            }
        },
        methods:{
           chooseAddr(){
                this.show = true;
           },
           addrSure(content){
                console.log("content:");
                console.log(content);
                this.userAddr = "";
                for(let i=0;i<content.length;i++){
                    this.userAddr =this.userAddr + content[i].name + " ";
                }
                this.show = false;
           },
           addrCancle(){
                this.show = false;
           },
            logOut() {
               this.$router.replace('/login')
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
    .top-avater{
        height:1.6rem;
        justify-content:space-between;
        margin:0.4rem 0 0.6rem 0;
        .name-mes{
            width:4.666667rem;
            .user-name{
                color:#202323;
                font-size:0.64rem;
                margin-bottom:0.4rem;
                justify-content:flex-start;
            }
            .user-id{
                width:100%;
                height:0.56rem;
                justify-content:flex-start;
                img{
                    display:block;
                    width:0.56rem;
                    height:0.4rem;
                    margin-right:0.266667rem;
                }
            }
        }
        .user-avater{
            width:1.6rem;
            height:1.6rem;
            margin-right:0.8rem;
            img{
                width:1.6rem;
                height:1.6rem;
                border-radius:50%;
            }
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
        img{
            width:0.533333rem;
            height:0.533333rem;
            margin-right:0.293333rem;
        }
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
    .return-btn{
        margin-top:1.6rem;
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